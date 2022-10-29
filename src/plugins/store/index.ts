import { createPinia } from 'pinia'

import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()

pinia.use(piniaPersist)

import useLocalStore from './userStore'
import useSystemStore from './systemStore.js'
import useImportWikiStore from './importWiki.js'

export const useStore = () => {
    return {
        local: useLocalStore(),
        system: useSystemStore(),
        importWiki: useImportWikiStore()
    }
}

export default pinia
