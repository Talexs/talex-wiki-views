import http from 'http'
import Ws from 'ws'
import { config, jwt } from 'lin-mizar'
import { URLSearchParams } from 'url'
import { set, get } from 'lodash'
import { UserGroupModel } from '../../model/user-group'

const USER_KEY = Symbol('user')
const INTERCEPTORS = Symbol('WebSocket#interceptors')
const HANDLE_CLOSE = Symbol('WebSocket#close')
const HANDLE_ERROR = Symbol('WebSocket#error')
const HANDLE_MESSAGE = Symbol('WebSocket#message')

export const LIFE_HANDLER_CONNECTION = Symbol('LifeHandler#Connection')
export const LIFE_HANDLER_DISCONNECTION = Symbol('LifeHandler#DisConnection')

const lifeHandlers = {}
function emitsLife(type, ...data) {
  // console.log("emits@" + type, ...data, lifeHandlers)
  lifeHandlers[type]?.forEach(handler => handler(...data))
}
export function registerLifeHandler(type, handler) {
  const handlers = lifeHandlers[type] || []
  handlers.push(handler)
  lifeHandlers[type] = handlers
}

class WebSocket {
  constructor () {
    this.wss = null
    this.sessions = new Set()
  }

  /**
   * 初始化，挂载 socket
   */
  init () {
    const server = http.createServer(this.app.callback())
    this.wss = new Ws.Server({
      path: config.getItem('socket.path', '/'),
      noServer: true
    })

    server.on('upgrade', this[INTERCEPTORS].bind(this))

    this.wss.on('connection', socket => {
      socket.on('close', this[HANDLE_CLOSE].bind(this))
      socket.on('error', this[HANDLE_ERROR].bind(this))
      socket.on('message', (res) => this.messageFunc(socket, res))
    })

    return server
  }

  onMessage(func) {
    this.messageFunc = func
  }

  [INTERCEPTORS] (request, socket, head) {

    this.wss.handleUpgrade(request, socket, head, ws => {

      this.sessions.add(ws)
      this.wss.emit('connection', ws, request)

      socket.ws = ws
      ws.socket = socket

      emitsLife(LIFE_HANDLER_CONNECTION, ws)
      console.log("[WebSocket] 来自 " + socket._host + " 的请求连接成功!")
    })

  }

  [HANDLE_CLOSE] () {
    for (const session of this.sessions) {
      if (session.readyState === Ws.CLOSED) {
        emitsLife(LIFE_HANDLER_DISCONNECTION, session)
        this.sessions.delete(session)
      }
    }
  }

  [HANDLE_ERROR] (session, error) {
    console.log(error)
  }

  /**
   * 发送消息
   *
   * @param {number} userId  用户id
   * @param {string} message 消息
   */
  sendMessage (userId, message) {
    for (const session of this.sessions) {
      if (session.readyState === Ws.OPEN) {
        continue
      }
      if (get(session, USER_KEY) === userId) {
        session.send(message)
        break
      }
    }
  }

  /**
   * 发送消息
   *
   * @param {WebSocket} session 当前会话
   * @param {string} message 消息
   */
  sendMessageToSession (session, message) {
    session.send(message)
  }

  /**
   * 广播
   *
   * @param {string} message 消息
   */
  broadCast (message) {
    this.sessions.forEach(session => {
      if (session.readyState === Ws.OPEN) {
        session.send(message)
      }
    })
  }

  /**
   * 对某个分组广播
   *
   * @param {number} 分组id
   * @param {string} 消息
   */
  async broadCastToGroup (groupId, message) {
    const userGroup = await UserGroupModel.findAll({
      where: {
        group_id: groupId
      }
    })
    const userIds = userGroup.map(v => v.getDataValue('user_id'))
    for (const session of this.sessions) {
      if (session.readyState !== Ws.OPEN) {
        continue
      }
      const userId = get(session, USER_KEY)
      if (!userId) {
        continue
      }
      if (userIds.includes(userId)) {
        session.send(message)
      }
    }
  }

  /**
   * 获取所有会话
   */
  getSessions () {
    return this.sessions
  }

  /**
   * 获得当前连接数
   */
  getConnectionCount () {
    return this.sessions.size
  }

  initApp (app) {
    this.app = app
    this.app.context.websocket = this

    return this.init()
  }
}

const webSocket = new WebSocket()
const protocolHandlers = {}

export function registerProtocol(protocol, opts) {
  if( protocolHandlers[protocol] ) {
    throw new Error('Already exist.')
  }
  protocolHandlers[protocol] = opts
  console.log("[WebSocket] [Protocol] Register: " + protocol)
}

class WebSocketChannel {
  constructor(websocket) {
    this.websocket = websocket
  }

  initApp (app) {
    this.app = app

    this.websocket.onMessage(this.messageProcess)

    registerProtocol('t-ws', {
      async invoke( { socket, info }) {
        this.channelProgress(socket, info)
      }
    })

    registerLifeHandler(LIFE_HANDLER_CONNECTION, (socket) => {

      socket.sendChannelMsg = (channel, data) => {

        socket.send(JSON.stringify({
          protocol: 't-ws',
          version: 1,
          channel, data
        }))

      }

    })

    return this.websocket.initApp(app)
  }

  messageProcess(socket, info) {
    try {
      const data = JSON.parse(String(info))
      if( !data.protocol || !data.channel || !data.version || !data.data ) {
        return socket.sendChannelMsg('error', 'invalid data format')
      }

      console.log("[WebSocket] ReqComing # " + data.protocol + "@" + data.version + " -> " + data.channel)
      const protocolHandler = protocolHandlers[data.protocol]

      if( protocolHandler )
        protocolHandler.invoke({ socket, info: data })
      else {

        socket.sendChannelMsg('error', 'cannot find resolver for protocol: ' + data.protocol)

      }
      // socket.sendChannelMsg('join-room', 'Let you join room: default')
    } catch(e) {
      return socket.sendChannelMsg('error', 'invalid data: '+ e.message)
    }

  }

  channelProgress(ws, info) {

    Object.keys(this.channels).forEach(channel => {

      if( String(info.channel).startsWith(channel + '/') ) {

        this.channels[channel].invoke({ ws, info })

      }

    })

  }

  channels = {}

  registerChannel(channel, handler) {
    if( this.channels[channel + '/'] ) {
      throw new Error('Already exist.')
    }
    this.channels[channel + '/'] = handler

  }

}

const channel = new WebSocketChannel(webSocket)

export default channel
