import ws, {
  LIFE_HANDLER_CONNECTION,
  LIFE_HANDLER_DISCONNECTION,
  registerLifeHandler,
  registerProtocol
} from './connection'

export function sendRoomMsg(roomName: string, data: any) {

  ws.sendAny({
    protocol: 't-room',
    version: 1,
    channel: roomName, data
  })

}

type RoomActionType = string | ['join', 'exit', 'get']
export function sendActionMsg(action: RoomActionType, room: string, apply: any) {

  ws.sendAny({
    protocol: 't-room-action',
    version: 1,
    channel: action, data: {
      room, apply
    }
  })

}

registerProtocol('t-room', {
  async invoke(info) {
    const { channel: roomName, data } = info

    const preRooms: any[] = []

    Object.keys(rooms).forEach(room => {
      if( room.startsWith(roomName + '/') ) {
        preRooms.push(Promise.resolve(rooms[room].handler.call({
          reply(data: any) {
            sendRoomMsg(roomName, data)
          }
        }, data)))
      }
    })

    await Promise.all(preRooms)

  }
})

registerProtocol('t-room-action', {
  async invoke(info) {
    const { channel, data } = info

    const replyAction = (action: RoomActionType, data: any) => {
      sendActionMsg(action, channel, data)
    }

    if( !data.room || !data.apply ) return replyAction(channel as RoomActionType, 'error data format')
    const roomName = data.room
    const room = rooms[roomName]
    const apply = data.apply

    if( channel.toLowerCase() === 'join' ) {

      if( !data.status ) room.onJoinFailed(apply)
      else room.onJoined()

    } else if( channel.toLowerCase() === 'exit' ) {

      room.onExited(data.status, apply)

    }

  }
})

const rooms: RoomHandlers = {}

export abstract class BaseRoom implements RoomOptions {

  abstract name: string

  abstract handler(data: object): void | Promise<any>

  reply(data: any): void | Promise<void> {
    return sendRoomMsg(this.name, data)
  }

  register(): boolean {

    try {
      registerRoom(this.name, this)
      return true;
    } catch ( e ) {
      console.error(e)
      return false;
    }

  }

  joinRoom(roomName: string, apply: object) {

    sendActionMsg('join', roomName, apply)

  }

  onBeforeExit(): void | Promise<any> {
    return undefined
  }

  onExited(status: boolean, apply: object): void | Promise<any> {
    return undefined
  }

  onJoinFailed(apply: object): void | Promise<void> {
  }

  onJoined(): void | Promise<any> {
    return undefined
  }

}
export interface RoomHandlers {
  [propName: string]: RoomOptions
}
export interface RoomOptions {
  name?: string,
  reply(data: object): void | Promise<void>,
  register(): boolean,
  onJoinFailed(apply: object): void | Promise<void>,
  onJoined(): void | Promise<any>,
  onBeforeExit(): void | Promise<any>,
  onExited(status: boolean, apply: object): void | Promise<any>,
  handler(data: object): void | Promise<any>
}
export function registerRoom(name: string, opts: RoomOptions) {
  if( rooms[name] ) throw new Error('Already exist.')

  rooms[name] = opts

}

// room searcher
;(() => {
  const globs = import.meta.glob('./room/*.ts')

  Object.values(globs).forEach(async room => {

    // @ts-ignore
    (await room()).default.register()

  })
})()
