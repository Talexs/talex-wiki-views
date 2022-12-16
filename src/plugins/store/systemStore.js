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

import { defineStore } from 'pinia'
import { userModel } from '~/plugins/model/base/user'

// FETCH DATA ASYNC

const store = defineStore( 'system', {
    state: () => {
        return {
            global: {
                dialog: {
                    login: false,
                    notification: false
                }
            },
            user: {
                notifications: {}
            }
        }
    }
} )

// SYSTEM CONFIG (CLIENT ONLY) (NOT PERSISTED)
let asyncInit = false
export default () => {

    const tStore = store()

    ! asyncInit && setTimeout( async () => {

        tStore.user.notifications = await userModel.msg( 1 )

    } )

    asyncInit = true

    return tStore

}

