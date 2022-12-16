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
import { get, post, put } from './../api/axios'

export class BaseModel {
    readonly #base_prefix: string

    get base_prefix() {
        return this.#base_prefix
    }

    constructor(base_prefix: string) {
        this.#base_prefix = base_prefix
    }

    public async _get(url: string, params = {}) {
        return get(`${this.base_prefix}/${url}`, params)
    }

    public async _post(url: string, data = {}, params = {}) {
        return post(`${this.base_prefix}/${url}`, data, params)
    }

    public async _put(url: string, data = {}, params = {}) {
        return put(`${this.base_prefix}/${url}`, data, params)
    }

}
