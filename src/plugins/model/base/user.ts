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

import RefreshConfig from '~/config/RefreshConfig.js'
import md5 from 'md5'
import { useStore } from '~/plugins/store'
import { BaseModel } from '~/plugins/model/BaseModel'
import _axios from '~/plugins/api/axios'

class UserModel extends BaseModel {

  constructor() {
    super("user")
  }

  /**
   * 分配用户
   * @param verify_token 行为验证码
   * @param {object} code 注册验证码
   * @param {object} hex 注册hex
   */
  async register(verify_token: string, code: number, hex: string) {
    const res = await _axios.post(this.base_prefix + '/register/verify', {
      code, hex
    }, {
      headers: {
        captcha: verify_token
      }
    })
    // @ts-ignore
    const { token } = res
    localStorage.setItem(RefreshConfig.storage.accessToken, `${ RefreshConfig.storage.bearer } ${ token.access_token }`)
    localStorage.setItem(RefreshConfig.storage.refreshToken, `${ RefreshConfig.storage.bearer } ${ token.refresh_token }`)
    return res
  }

  /**
   * 登陆获取tokens
   * @param { String } verify_token 验证码
   * @param { String } username 用户名
   * @param { String } password 密码
   */
  async getToken(verify_token: string, username: string, password: string) {
    const res = await _axios.post(this.base_prefix + '/login', {
      username,
      password: md5(password),
    }, {
      headers: {
        captcha: verify_token
      }
    })
    // @ts-ignore
    const { token } = res
    localStorage.setItem(RefreshConfig.storage.accessToken, `${ RefreshConfig.storage.bearer } ${ token.access_token }`)
    localStorage.setItem(RefreshConfig.storage.refreshToken, `${ RefreshConfig.storage.bearer } ${ token.refresh_token }`)
    return res
  }

  /**
   * 获取用户登录历史
   */
  async getUserLoginHistories() {
    return this._get('login_histories')
  }

  /**
   * 获取用户头像 返回头像地址
   */
  async getUserAvatar(id: number) {
    return this._get(`avatar/${ id }`)
  }

  /**
   * 获取当前用户信息，并返回User实例
   */
  async getInformation() {
    const info = await this._get('information')
    const store = useStore()
    const storeUser = store.local.user ? store.local.user : {}
    return Object.assign({ ...storeUser }, info)
  }

  /**
   * 用户修改密码
   * @param {string} newPassword 新密码
   * @param {string} confirmPassword 确认新密码
   * @param {string} oldPassword 旧密码
   */
  // eslint-disable-next-line camelcase
  updatePassword({ old_password, new_password }: { old_password: string, new_password: string }) {
    return this._post('change_password', {
      changed_password: md5(new_password),
      original_password: md5(old_password),
    })
  }

  updateUserInfo(avatar: string) {
    return this._post('update_info', {
      cover: avatar
    })
  }

  getUserOption(key: string) {
    return this._get('options/' + key)
  }

  updateThemeOption(value: object) {
    return this._put('options/theme', value)
  }

  /**
   *
   */
  hasIdentifier(identifier: string) {
    return this._get('has_user/' + identifier, {
      hideError: true
    })
  }

  registerCode(email: string, user: string, pass: string) {
    return this._post('register/email', {
      email,
      username: user,
      password: md5(pass)
    })
  }

  search(keyword: string) {
    return this._post('search', {
      keyword
    })
  }

  msg(page: number, allowRead: boolean = false) {
    return this._post('msg', {
      page,
      allowRead
    })
  }
}

export const userModel = new UserModel()
