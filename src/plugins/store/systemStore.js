import { defineStore } from 'pinia'

// SYSTEM CONFIG (CLIENT ONLY)
export default defineStore('system', {
    state: () => {
        return {
            currentRoute: {
                config: null,
                treePath: []
            },
            stageMap: {},
            global: {
              login: {
                  dialog: false
              }
            }
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

