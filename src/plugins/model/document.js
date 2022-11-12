import _axios, { _delete, get, put, post } from '~/plugins/api/axios'

class Document {
  async createDocument(data) {
    return post('wiki/doc/create', data)
  }

  async getDocument(bookID) {
    return get(`wiki/doc/list/${bookID}`)
  }

  async getTargetDocument(bookID, wikiID) {
    return get(`v1/doc/${bookID}/${wikiID}`)
  }

  async editDocument(id, info) {
    return post(`wiki/doc/modify/${ id }`, info)
  }

  async viewDocument(id) {
    return get(`wiki/doc/view/${ id }`)
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

  async getLeftDocs(bookID) {
    return get('wiki/doc/list_left/' + bookID)
  }
}

export default new Document()
