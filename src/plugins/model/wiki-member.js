import _axios, { _delete, get, put } from '~/plugins/api/axios'

class WikiMember {
  async createWikiMember(data) {
    return _axios({
      method: 'post',
      url: 'v1/wiki_member',
      data,
    })
  }

  async getWikiMember(bookID, id) {
    return get(`v1/wiki_member/get/${bookID}/${id}`)
  }

  async editWikiMember(id, info) {
    return put(`v1/wiki_member/${ id }`, info)
  }

  async deleteWikiMember(id) {
    return _delete(`v1/wiki_member/${ id }`)
  }

  async getMembers(book) {
    return _axios({
      method: 'get',
      url: `v1/wiki_member/${book}`,
      handleError: true,
    })
  }
}

export default new WikiMember()
