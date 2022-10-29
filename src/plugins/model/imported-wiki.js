import _axios, { _delete, get, put, post } from '~/plugins/api/axios'
import './../channel/imported-wiki'

class ImportedWiki {
  tryConnect(data) {
    return post('v1/wiki_imported/connect', data)
  }

  mergeImports(data) {
    return post('v1/wiki_imported/merge', data)
  }
}

export default new ImportedWiki()
