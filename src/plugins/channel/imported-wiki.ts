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
import ws  from '~/plugins/channel/connection'
import { useStore } from '~/plugins/store'

const store = useStore()

ws.tChannel?.registerChannel('imported-wiki',(info: any) => {

    // Object.keys(info).forEach(key => {
        // @ts-ignore
        // store.importWiki.progress[key] = info[key]
    // })

    store.importWiki.progress.indexedObjects = info.indexedObjects
    store.importWiki.progress.receivedBytes = info.receivedBytes
    store.importWiki.progress.receivedObjects = info.receivedObjects
    store.importWiki.progress.totalObjects = info.totalObjects

    store.importWiki.tip = `已下载: ${(info.receivedBytes / 1024 / 1024).toFixed(2)}MB (${String((info.percentage - 1) * 2).padStart(2, '0')}%)`
    store.importWiki.p = info.percentage * 2
    store.importWiki.p1 = info.receivedObjects * 2 / info.totalObjects
    store.importWiki.p2 = info.indexedObjects * 2 / info.totalObjects

    if( store.importWiki.p >= 100 ) {

        // @ts-ignore
        store.importWiki.doneFunc()

    }

})
