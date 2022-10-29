import _axios, { _delete, get, put } from '~/plugins/api/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Chapter {
  async createChapter(data) {
    return _axios({
      method: 'post',
      url: 'v1/chapter',
      data,
    })
  }

  async getChapter(bookID, id) {
    return get(`v1/chapter/${bookID}/${ id }`)
  }

  async editChapter(id, info) {
    return put(`v1/chapter/${ id }`, info)
  }

  async deleteChapter(id) {
    return _delete(`v1/chapter/${ id }`)
  }

  async getChapters(bookID) {
    return _axios({
      method: 'get',
      url: `v1/chapter/${bookID}`,
      handleError: true,
    })
  }
}

export default new Chapter()
