import _axios, { get, post, put } from '~/plugins/api/axios'
import RefreshConfig from '~/config/RefreshConfig.js'
import md5 from 'md5'
import { useStore } from '~/plugins/store/index'

export default class User {

  /**
   * 分配用户
   * @param {object} user 注册信息
   */
  static register(user) {
    return _axios({
      method: 'post',
      url: 'user/register',
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        group_ids: user.groupIds,
        confirm_password: user.confirmPassword,
      },
      handleError: true,
    })
  }

  /**
   * 登陆获取tokens
   * @param { String } verify_token 验证码
   * @param { String } username 用户名
   * @param { String } password 密码
   */
  static async getToken(verify_token, username, password) {
    const res = await _axios.post('user/login',{
      username,
      password: md5(password),
    }, {
      headers: {
        captcha: verify_token
      }
    })
    const { token } = res
    localStorage.setItem(RefreshConfig.storage.accessToken, `${RefreshConfig.storage.bearer} ${token.access_token}`)
    localStorage.setItem(RefreshConfig.storage.refreshToken, `${RefreshConfig.storage.bearer} ${token.refresh_token}`)
    return res
  }

  /**
   * 获取用户登录历史
   */
  static async getUserLoginHistories() {
    return get( 'user/login_histories' )
  }

  /**
   * 获取用户头像 返回头像地址
   */
  static async getUserAvatar(id) {
    return get( `user/avatar/${ id }` )
  }

  /**
   * 获取当前用户信息，并返回User实例
   */
  static async getInformation() {
    const info = await get('user/information')
    const store = useStore()
    const storeUser = store.local.user ? store.local.user : {}
    return Object.assign({ ...storeUser }, info)
  }

  /**
   * 获取当前用户信息和所拥有的权限
   */
  static async getPermissions() {
    const info = await get('cms/user/permissions')
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
  static updatePassword({ old_password, new_password }) {
    return post('user/change_password', {
      changed_password: md5(new_password),
      original_password: md5(old_password),
    })
  }
}
