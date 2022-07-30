import { createRouter, createWebHashHistory } from 'vue-router'

import { $userToken } from './store/user'

import {forWikiTip, TipType} from './Common'

const routes = [
    {
        path: "/docs/:uid",
        name: "文档",
        component: () => import('./../view/DocumentView.vue')
    },
    {
        path: "/guide/ref",
        name: "Guide # Ref",
        component: () => import('./../components/common/GuideRef.vue')
    },
    {
        path: "/user/login",
        name: "登录",
        component: () => import('./../view/base/Login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {

    if( !to?.meta?.loginRequired ) return next()

    if( !$userToken.token?.isLogin ) {

        await forWikiTip('请先登录!', 4200, TipType.WARNING)

        return router.back()

    }

})

export default router
