import { defineStore } from 'pinia'
import { ThemeAdapt, ViewerLayout } from '~/plugins/addon/enums.ts'
import { TipType } from '~/plugins/addon/Tipper'
import { sleep } from '~/plugins/Common'
import { userModel } from '~/plugins/model/base/user'

const store = defineStore('user', {
    state: () => {
        return {
            loggedIn: false,
            user: {},
            permissions: [],
            theme: {
                name: 'light',
                adapt: ThemeAdapt.NONE
            },
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

let lastTheme
function changeTheme(theme) {
    if( lastTheme === theme ) return
    lastTheme = theme

    if( theme === 'dark' ) {
        document.documentElement.className = 'dark'
    } else {
        document.documentElement.className = ''
    }
}

let init = false
function asyncTheme(tStore) {
    if( init ) return
    init = true

    if( tStore.theme.adapt === ThemeAdapt.SYSTEM ) {

        const media = window.matchMedia('(prefers-color-scheme: dark)')

        function handler() {

            if ( tStore.theme.adapt === ThemeAdapt.SYSTEM ) {

                // window.$tipper.tip("正在同步系统主题...", {
                //     loading: async(func) => {
                //
                        changeTheme(media.matches ? 'dark' : 'light')
                //
                //         const close = func("已同步系统主题！", TipType.INFO)
                //
                //         await sleep(2200)
                //
                //         close()
                //
                        init = false
                //
                //     }
                // })

            }


        }

        handler()
        media.addListener(handler)

    } else if( tStore.theme.adapt === ThemeAdapt.TIME ) {

       const date = new Date()

        const hours = date.getHours()
        changeTheme(hours > 0 && hours < 8 || hours > 22 ? 'dark' : 'light')

        init = false

    }

}

let asyncInit = false
export default () => {

    let tStore = store()

    function process() {

        if( tStore.theme.adapt === ThemeAdapt.NONE )
            changeTheme(tStore.theme)
        else asyncTheme(tStore)

        tStore.$subscribe((mutation, state) => {
            if( mutation.storeId !== 'user' ) return

            if( mutation.events.key === 'loggedIn' ) {

                state.loggedIn = false
                state.user = null
                state.permissions = []
                state.admin = false

            } else if( mutation.events.key === 'adapt') {

                userModel.updateThemeOption(tStore.theme)

            }
            else changeTheme( state.theme.name )

        })

    }

    if( tStore.loggedIn )
        !asyncInit && window.$tipper.tip("正在同步个人设置...", {
        loading: async(func) => {

            if( !(tStore.theme instanceof Object) ) tStore.theme = { name: 'light', adapt: ThemeAdapt.NONE }

            let res = await userModel.getUserOption('theme')

            if( !res ) {

                res = await userModel.updateThemeOption(tStore.theme)

            }

            tStore.theme = JSON.parse( res.value )

            process()

            const close = func("已同步个人设置！", TipType.INFO)

            await sleep(1200)

            close()

        }
    })
    else process()

    asyncInit = true

    return tStore

}
