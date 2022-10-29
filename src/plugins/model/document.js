import _axios, { _delete, get, put } from '~/plugins/api/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Document {
  async createDocument(data) {
    return _axios({
      method: 'post',
      url: 'v1/doc',
      data,
    })
  }

  async getDocument(bookID) {
    return get(`wiki/view/doc/${bookID}`)
  }

  async getTargetDocument(bookID, wikiID) {
    return get(`v1/doc/${bookID}/${wikiID}`)
  }

  async editDocument(id, info) {
    return put(`v1/doc/${ id }`, info)
  }

  async deleteDocument(id) {
    return _delete(`v1/doc/${ id }`)
  }

  async getDocuments() {
    return _axios({
      method: 'get',
      url: 'v1/doc/',
      handleError: true,
    })
  }
}

export default new Document()
