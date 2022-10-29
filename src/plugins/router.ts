import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useStore } from '~/plugins/store'
import { forWikiTip, TipType } from './Common'
import GlobalConfig from '~/config/GlobalConfig'

const routes: any = [
    {
      path: "/",
      redirect: "/index"
    },
    {
        path: "/index",
        name: "首页",
        component: () => import('./../view/base/Index.vue')
    },
    {
        path: "/user/login",
        name: "登录",
        component: () => import('./../view/base/Login.vue')
    },
    {
        path: "/user/personal",
        name: "个人信息",
        meta: {
            heightUnlimited: true,
            loginRequired: true
        },
        component: () => import('../view/center/PersonalInfo.vue')
    },
    {
        path: "/about",
        name: "关于",
        meta: {
            heightUnlimited: true
        },
        component: () => import('../view/others/About.vue')
    },
    {
        name: "PersonCenter",
        path: "/user",
        component: () => import('./../components/common/layout/NavBar.vue'),
        children: [
            {
                path: "/user/dashboard",
                name: "数据面板",
                meta: {
                    heightUnlimited: true,
                    loginRequired: true,
                    largerWidth: true
                },
                component: () => import('../view/center/dashboard/Dashboard.vue')
            },
            {
                path: "/user/design",
                name: "外观设计",
                meta: {
                    heightUnlimited: true,
                    loginRequired: true
                },
                component: () => import('../view/center/DesignDisguise.vue')
            },
            {
                path: "/user/wikis",
                name: "维基列表",
                meta: {
                    heightUnlimited: false,
                    loginRequired: true
                },
                component: () => import('../view/book/wiki/WikiList.vue')
            },
            {
                path: "/user/plans",
                name: "升级计划",
                meta: {
                    heightUnlimited: true,
                    loginRequired: true
                },
                component: () => import('../view/center/ProPlan.vue')
            },
            {
                path: "/user/security",
                name: "安全",
                meta: {
                    heightUnlimited: true,
                    loginRequired: true
                },
                component: () => import('../view/center/Security.vue')
            },
            {
                path: "/cms/users",
                name: "用户管理",
                meta: {
                    heightUnlimited: true,
                    loginRequired: true,
                    adminRequired: true,
                    largerWidth: true
                },
                component: () => import('../view/admin/user/UserList.vue')
            },
            {
                path: "/cms/eller",
                name: "角色管理",
                meta: {
                    heightUnlimited: true,
                    loginRequired: true,
                    adminRequired: true,
                    largerWidth: true
                },
                component: () => import('../view/admin/eller/RoleList.vue')
            },
            {
                path: "/cms/eller/edit",
                name: "角色编辑",
                meta: {
                    heightUnlimited: true,
                    loginRequired: true,
                    adminRequired: true,
                    largerWidth: true
                },
                component: () => import('../view/admin/eller/RoleEdit.vue')
            },
            {
                path: "/cms/eller/create",
                name: "角色创建",
                meta: {
                    heightUnlimited: true,
                    loginRequired: true,
                    adminRequired: true,
                    largerWidth: true
                },
                component: () => import('../view/admin/eller/RoleCreate.vue')
            },
            {
                path: "/cms/logs",
                name: "日志管理",
                meta: {
                    heightUnlimited: true,
                    loginRequired: true,
                    adminRequired: true
                },
                component: () => import('../view/admin/log/LogList.vue')
            },
        ]
    },
    {
        path: "/user/register",
        name: "注册",
        component: () => import('./../view/base/Register.vue')
    },
    {
        path: "/wiki/view/:id/:wiki?/:index?",
        name: "维基浏览",
        component: () => import('./../view/book/WikiViewer.vue')
    },
    {
        path: "/wiki/edit/:id/:wiki?",
        name: "维基编辑",
        meta: {
            loginRequired: true
        },
        component: () => import('./../view/book/WikiEditor.vue')
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: '/index'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {

    if( to.name )
        document.title = `${GlobalConfig.name} | ${String(to.name)}`

    if( !to?.meta?.loginRequired ) return next()

    const store = useStore()

    if( !store.local.loggedIn ) {

        await forWikiTip('请先登录!', 4200, TipType.WARNING)

        return router.back()

    }

    if( to.meta?.adminRequired ) {

        // @ts-ignore
        if( !store.local.admin  ) {

            await forWikiTip('您没有权限!', 4200, TipType.WARNING)

            return router.back()

        }

    }

    return next()

})

export default router
