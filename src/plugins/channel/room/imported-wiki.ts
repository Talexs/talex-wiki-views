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

import { BaseRoom } from '~/plugins/channel/room-channel'
import { forWikiTip, TipType } from '~/plugins/Common'

export class DefaultRoom extends BaseRoom {
    name: string = 'imported-wiki'

    async handler(data: object): Promise<any> {



    }

    override async onJoinFailed(apply: object) {

        this.joinRoom('imported-wiki', {

        })

        await forWikiTip("与 导入维基系统 丢失连接，进度可能会不同步！", 3200, TipType.ERROR)

    }

    async onJoined() {

        await forWikiTip("正在与 导入维基系统 进行对接 ...", 3200, TipType.INFO, true)

    }

}

export default new DefaultRoom()
