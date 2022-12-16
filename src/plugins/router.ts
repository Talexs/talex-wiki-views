/*
 * Copyright (c) 2022. TalexDreamSoul
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '~/plugins/store'
import GlobalConfig from '~/config/GlobalConfig'
import { TipType } from '~/plugins/addon/Tipper'

const routes: any = [
    {
        path: "/",
        redirect: "/index"
    },
    {
        path: "/index",
        name: "首页",
        component: () => import('./../view/base/Index.vue'),
        meta: {
            showFooter: true
        }
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
      redirect: "/about/protocol"
    },
    {
        path: "/about",
        name: "关于",
        meta: {
            heightUnlimited: true,
            showFooter: true
        },
        component: () => import('../view/others/about/AboutNavBar.vue'),
        children: [
            {
                path: "/about/protocol",
                name: "关于协议",
                meta: {
                    heightUnlimited: true
                },
                component: () => import('../view/others/about/AboutProtocol.vue'),
            },
            {
                path: "/about/open_source",
                name: "关于开源",
                meta: {
                    heightUnlimited: true
                },
                component: () => import('../view/others/about/AboutOpenSource.vue'),
            },
            {
                path: "/about/quote",
                name: "关于引用",
                meta: {
                    heightUnlimited: true
                },
                component: () => import('../view/others/about/AboutQuote.vue'),
            }
        ]
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
                path: "/org",
                name: "组织管理",
                meta: {
                    heightUnlimited: true,
                    loginRequired: true,
                    largerWidth: false
                },
                redirect: "/org/list",
                children: [
                    {
                        path: "/org/create",
                        name: "创建组织",
                        meta: {
                            heightUnlimited: true,
                            loginRequired: true,
                            largerWidth: false
                        },
                        component: () => import('../view/organization/ApplyOrg.vue')
                    },
                    {
                        path: "/org/edit/:id",
                        name: "编辑组织",
                        meta: {
                            heightUnlimited: true,
                            loginRequired: true,
                            largerWidth: false
                        },
                        component: () => import('../view/organization/ApplyOrg.vue')
                    },
                    {
                        path: "/org/list",
                        name: "创建组织",
                        meta: {
                            heightUnlimited: true,
                            loginRequired: true,
                            largerWidth: false
                        },
                        component: () => import('../view/organization/OrgList.vue')
                    },
                ]
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
                path: "/user/wiki/setting",
                name: "维基设置",
                meta: {
                    heightUnlimited: false,
                    loginRequired: true
                },
                component: () => import('../view/book/wiki/WikiModifier.vue')
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
        path: "/org/view/:id",
        name: "组织详情",
        component: () => import('../view/organization/OrgView.vue')
    },
    // {
    //     path: "/user/notifications",
    //     name: "消息通知",
    //     component: () => import('../view/center/Notification.vue')
    // },
    {
        path: "/user/register",
        name: "注册",
        component: () => import('./../view/base/Register.vue')
    },
    {
        path: "/wiki/view/:id",
        name: "维基浏览",
        component: () => import('./../view/book/WikiViewer.vue')
    },
    {
        path: "/wiki/edit/:id/:wiki?",
        name: "维基编辑",
        meta: {
            loginRequired: true
        },
        component: () => import('./../view/book/editor/WikiEditorFrame.vue'),
        // children: [
        //     {
        //         path: "/wiki/edit/:id/:wiki?",
        //         name: "维基编辑",
        //         meta: {
        //             loginRequired: true
        //         },
        //         component: () => import('./../view/book/editor/WikiEditor.vue')
        //     },
        // ]
    },
    {
        path: "/tds/test",
        name: "测试页面",
        component: () => import('./../view/base/Test.vue')
    },
    {
        path: "/direct",
        name: "跳转",
        component: () => import('./../view/others/DirectMention.vue')
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

        window.$tipper.tip('请先登录!', {
            stay: 4200,
            type: TipType.WARNING
        })

        return router.back()

    }

    if( to.meta?.adminRequired ) {

        // @ts-ignore
        if( !store.local.admin  ) {

            window.$tipper.tip('您没有全新!', {
                stay: 4200,
                type: TipType.WARNING
            })

            return router.back()

        }

    }

    return next()

})

export default router
