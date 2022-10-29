import _axios, { _delete, get, put, post } from '~/plugins/api/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Wiki {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async createBook(data) {
    return post('wiki/create', data)
  }

  async getBook(id) {
    return get(`wiki/view/${id}`)
  }

  async editBook(id, info) {
    return put(`v1/wiki/${ id }`, info)
  }

  async deleteBook(id) {
    return _delete(`v1/wiki/${ id }`)
  }

  async getBooks(page = 0) {
    return get('wiki/list/' + page)
  }
}

export default new Wiki()
