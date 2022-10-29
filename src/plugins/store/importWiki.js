import { defineStore } from 'pinia'

export default defineStore('importWiki', {
    state: () => {
        return {
            now: "",
            tip: "正在准备导入...",
            progress: {
                receivedBytes: 0,
                receivedObjects: 0,
                totalDeltas: 0,
                totalObjects: 0,
                indexedDeltas: 0,
                indexedObjects: 0,
                localObjects: 0
            },
            p: 0,
            p1: 0,
            p2: 0,
            doneFunc: null
        }
    },
    persist: {
        enabled: true,
        strategies: {
            key: 'pinia-system',
            storage: localStorage
        }
    }
})
