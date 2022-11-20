import { defineStore } from 'pinia'
import { forMentionTip, TipType } from '~/plugins/Common.ts'
import { MentionTip } from '~/plugins/addon/MentionerManager.ts'
import { ViewerLayout } from '~/plugins/addon/enums.ts'

const store = defineStore('user', {
    state: () => {
        return {
            loggedIn: false,
            user: {},
            permissions: [],
            theme: 'light',
            viewer: {
                animation: 0,
                layout: ViewerLayout.FULL
            },
            admin: false
        }
    },
    actions: {
        setUser(user) {
            this.$state.user = user
        },
        setUserPermissions(permissions) {
            this.$state.permissions = permissions
        },
        setLoggedIn(value) {
            this.$state.loggedIn = value
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'pinia-user',
                storage: localStorage
            }
        ]
    }
})

function changeTheme(theme) {
    if( theme === 'dark' ) {
        document.documentElement.className = 'dark'
    } else {
        document.documentElement.className = ''
    }
}

export default () => {

    let tStore = store()

    changeTheme(tStore.theme)

    tStore.$subscribe((mutation, state) => {
        if( mutation.storeId !== 'user' ) return
        if( mutation.events.key !== 'theme' ) return

        changeTheme(state.theme)

    })

    return tStore

}
