import { defineStore } from 'pinia'

export default defineStore('system', {
    state: () => {
        return {
            currentRoute: {
                config: null,
                treePath: []
            },
            stageMap: {}
        }
    },
    actions: {
        setUser(user) {
            this.user = user
        },
        setUserPermissions(permissions) {
            this.permissions = permissions
        },
        setStageMap() {

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
