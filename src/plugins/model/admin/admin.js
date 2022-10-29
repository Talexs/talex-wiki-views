/* eslint-disable class-methods-use-this */
import { _delete, get, post, put } from '~/plugins/api/axios.ts'

export default class Admin {
  constructor(uPage = 0, uCount = 10, gPage = 0, gCount = 5) {
    this.uPage = uPage
    this.uCount = uCount
    this.lPage = gPage
    this.gCount = gCount
  }

  async increaseUPage() {
    this.uPage += 1
  }

  async increaseGPage() {
    this.lPage += 1
  }

  async decreaseUPage() {
    this.uPage -= 1
    if (this.uPage < 0) {
      this.uPage = 0
    }
  }

  async decreaseGPage() {
    this.lPage -= 1
    if (this.lPage < 0) {
      this.lPage = 0
    }
  }

  static getAllPermissions() {
    return get('eller/permissions')
  }

  static async getAdminUsers({ role, page = 1 }) {
    return await post( 'admin/users', {
      page,
      role,
    } )
  }

  async nextUsersPage() {
    await this.increaseUPage()
    return this.getAdminUsers({})
  }

  async preUsersPage() {
    await this.decreaseUPage()
    return this.getAdminUsers({})
  }

  async getGroupsWithPermissions({ count = this.uCount, page = this.uPage }) {
    const res = await get('cms/admin/groups', {
      count,
      page,
    })
    return res
  }

  async nextGroupsPage() {
    await this.increaseGPage()
    return this.getGroupsWithPermissions({})
  }

  async preGroupsPage() {
    await this.decreaseGPage()
    return this.getGroupsWithPermissions({})
  }

  static async getAllGroups() {
    return get( 'eller/roles' )
  }

  static async getOneGroup(id) {
    const group = await get(`cms/admin/group/${id}`)
    return group
  }

  // eslint-disable-next-line camelcase
  static async createOneGroup(name, info, permission_ids) {
    const res = await post('cms/admin/group', {
      name,
      info,
      permission_ids,
    })
    return res
  }

  static async updateOneGroup(id, name, desc) {
    return put( `eller/role/${ id }`, {
      name,
      desc,
    } )
  }

  static async deleteOneGroup(id) {
    return _delete( `eller/role/${ id }` )
  }

  static async deleteOneUser(id) {
    const res = await _delete(`cms/admin/user/${id}`)
    return res
  }

  // eslint-disable-next-line camelcase
  static async updateOneUser(email, group_ids, id) {
    const res = await put(`cms/admin/user/${id}`, {
      email,
      group_ids,
    })
    return res
  }

  // eslint-disable-next-line camelcase
  static async dispatchPermissions(group_id, permission_ids) {
    const res = await post('cms/admin/permission/dispatch/batch', {
      group_id,
      permission_ids,
    })
    return res
  }

  // eslint-disable-next-line camelcase
  static async changePassword(new_password, confirm_password, id) {
    const res = await put(`cms/admin/user/${id}/password`, {
      new_password,
      confirm_password,
    })
    return res
  }

  // eslint-disable-next-line camelcase
  static async removePermissions(group_id, permission_ids) {
    const res = await post('cms/admin/permission/remove', {
      group_id,
      permission_ids,
    })
    return res
  }
}
