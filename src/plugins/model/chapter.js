import _axios, { _delete, get, put, post } from '~/plugins/api/axios.ts'

class Chapter {
  async createChapter(data) {
    return post('wiki/chapter/create', data)
  }

  async getChapter(bookID, id) {
    return get(`v1/chapter/${bookID}/${ id }`)
  }

  async editChapter(id, info) {
    return post(`wiki/chapter/modify/${ id }`, info)
  }

  async deleteChapter(id) {
    return _delete(`wiki/chapter/delete/${ id }`)
  }

  async viewChapter(id) {
    return get('wiki/chapter/view/' + id)
  }

  async getChapters(bookID) {
    return _axios({
      method: 'get',
      url: `wiki/chapter/list/${bookID}`,
      handleError: true,
    })
  }

  async treeChapter(bookID, rootID = -1) {
    return post('wiki/chapter/tree/' + bookID, {
      root: rootID
    })
  }
}

export default new Chapter()
