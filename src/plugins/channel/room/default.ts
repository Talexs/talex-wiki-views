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

import { BaseRoom, sendActionMsg } from '~/plugins/channel/room-channel'
import ws, { LIFE_HANDLER_CONNECTION, registerLifeHandler } from '~/plugins/channel/connection'
import RefreshConfig from '~/config/RefreshConfig'
import { forWikiTip, TipType } from '~/plugins/addon/Tipper'

export class DefaultRoom extends BaseRoom {
    name: string = 'default'

    async handler(data: object): Promise<any> {
        this.reply('Hello: ' + data)

    }

    override async onJoinFailed(apply: object) {

        ws.disconnect()

        await forWikiTip("无法与远程服务器建立连接!", 3200, TipType.ERROR)

    }

    async onJoined() {

        await forWikiTip("已与远程服务器建立加密通讯!", 3200, TipType.INFO)

    }

}

const refreshToken = localStorage.getItem(RefreshConfig.storage.refreshToken)

registerLifeHandler(LIFE_HANDLER_CONNECTION, () => {

    sendActionMsg('join', 'default', {
        token: String(refreshToken).replace('Bearer ', '')
    })

})

export default new DefaultRoom()
