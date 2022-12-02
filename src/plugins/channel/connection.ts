/*
 * Copyright (c) 2022. TalexDreamSoul
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import GlobalConfig from '~/config/GlobalConfig.js'
import { TipType } from '~/plugins/addon/Tipper'
import { sleep } from '~/plugins/Common'

const lifeHandlers: LifeHandler = {}
function emitsLife(type: string, ...data: any) {
    // console.log( lifeHandlers[type] )
    lifeHandlers[type]?.forEach(handler => handler.apply(window, data))
}
export function registerLifeHandler(type: any, handler: Function) {
    const handlers = lifeHandlers[type] || []
    handlers.push(handler)
    lifeHandlers[type] = handlers
}

export interface LifeHandler {
    [propName: string]: Function[]
}
export const LIFE_HANDLER_CONNECTION = 'LifeHandler#Connection'
export const LIFE_HANDLER_DISCONNECTION = 'LifeHandler#DisConnection'

const protocolHandlers: ProtocolHandler = {}

export function registerProtocol(protocol: string, opts: ProtocolOptions) {
    if( protocolHandlers[protocol] ) {
        throw new Error('Already exist.')
    }
    protocolHandlers[protocol] = opts
}
export interface ProtocolHandler {
    [propName: string]: ProtocolOptions
}
export interface ProtocolOptions {
    invoke(info: ReceiverDataFormat): void
}

// export interface ChannelOption {
//     [propName: string]: Function
// }
export class TChannel {
    private channels: Map<string, Function> = new Map()

    constructor() {

        registerProtocol('t-ws', {
            invoke: this.WSProtocolHandler.bind(this)
        })

    }

    registerChannel(channel: string, handler: Function) {
        if( this.channels.has(channel + '/') ) {
            throw new Error('Already exist.')
        }
        this.channels.set(channel + '/', handler)
        return {
            prototype: this
        }
    }

    WSProtocolHandler(info: ReceiverDataFormat) {
        this.channels.forEach((value, key) => {

            if( (key + '/').startsWith(info.channel) ) {

                value(info.data)

            }

        })
    }

    sendChannelMsg(channel: string, data: any) {

        ws.sendAny({
            protocol: 't-ws',
            version: 1,
            channel, data
        })

    }

}

export interface ReceiverDataFormat {
    protocol: string,
    version: number | string,
    channel: string,
    data: any,
    [propName: string]: any
}
export class TWebSocket {
    #webSocket: WebSocket | null = null
    tChannel: TChannel | null = null

    connect(callback: Function = () => false) {
        if( this.#webSocket ) return callback(false)
        this.#webSocket = new WebSocket(`ws:${GlobalConfig.hostName}:${GlobalConfig.endsPort}`)

        this.#webSocket.addEventListener('open', () => {
            this.#onOpen.bind(this)
            callback(true)
        })
        this.#webSocket.addEventListener('error', () => {
            this.#onError.bind(this)
            callback(false)
        })
        this.#webSocket.addEventListener('close', this.#onClose.bind(this))
        this.#webSocket.addEventListener('message', this.#onMessage.bind(this))

    }

    disconnect() {
        if( !this.#webSocket ) return
        this.#webSocket.removeEventListener('close', this.#onClose)
        this.#webSocket.onclose = async() => {
            window.$tipper.tip("已关闭远程服务器连接!", {
                stay: 3800,
                type: TipType.WARNING
            })
        }

        emitsLife(LIFE_HANDLER_DISCONNECTION, ws)
        this.#webSocket.close(1000, 'initiative')

        this.#webSocket = null
        this.tChannel = null
    }

    async #onMessage(event: MessageEvent) {
        const { data: info } = event
        // console.log(info, event)

        try {
            const data: ReceiverDataFormat = JSON.parse(info)
            if( !data.protocol || !data.channel || !data.version || !data.data ) {
                return this.tChannel?.sendChannelMsg('error', 'invalid data format')
            }

            const protocolHandler = protocolHandlers[data.protocol]

            if( protocolHandler )
                protocolHandler.invoke.call(this, data)
            else {

                this.tChannel?.sendChannelMsg('error', 'cannot find resolver for protocol: ' + data.protocol)

            }

        } catch(e: any) {

            console.log("解析远程服务器消息错误: ", e, event, info)
            // return this.tChannel?.sendChannelMsg('error', 'invalid data: '+ e.message)
        }

    }

    async #onOpen(event: Event) {
        window.$tipper.tip("已连接至远程服务器!", {
            stay: 3800,
            type: TipType.SUCCESS
        })

        this.tChannel = new TChannel()

        emitsLife(LIFE_HANDLER_CONNECTION, ws)
    }

    async #onError(event: Event) {
        console.error(event)
        window.$tipper.tip("与远程服务器连接发生错误!", {
            stay: 3800,
            type: TipType.ERROR
        })
    }

    async #onClose(event: CloseEvent) {
        window.$tipper.tip("已从远程服务器丢失连接, 正在尝试重连...", {
            stay: -1,
            type: TipType.ERROR,
            loading: async (func: Function) => {

                this.#webSocket = null

                setTimeout(() => this.connect(async (state: boolean) => {

                    const res = func(`连接${state ? '成功' : '失败'}!`, state ? TipType.SUCCESS : TipType.ERROR)

                    await sleep(state ? 2000 : 4600)

                }), 5000)

                emitsLife(LIFE_HANDLER_DISCONNECTION, ws)

            }
        })

    }

    send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        this.#webSocket?.send(data)
    }

    sendAny(data: object) {
        this.send(JSON.stringify(data))
    }

}

const ws = new TWebSocket()
export default ws

Object.defineProperty(window, 'ws', {
    value: ws
})

