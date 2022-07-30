import axios from 'axios'

import { forWikiTip } from './Common'

import { $userToken } from './store/user'
import { useRouter } from 'vue-router'

const service = axios.create({
    baseURL: '//' + window.location.hostname + ":5173/api/",
    timeout: 60000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {

        if( $userToken.token?.isLogin ) {

            config?.headers && (config.headers[`${$userToken.token?.tokenName}`] = `${$userToken.token?.tokenName} ${$userToken.token?.tokenValue}`)

        }

        return config
    },
    function (error) {
        // 对请求错误做些什么
        console.log("传输请求错误：", error)
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    async function (response) {

        if( response.data.status === 404 ) {

            // forWikiTip('请尝试按下 Ctrl + F5 刷新页面缓存! (' + response.data.message + ')', T)

        } else if( response.data.status === 999 ) {

            // ElNotification({
            //     title: '>_',
            //     message: "请登录后重试!",
            //     type: 'warning',
            // })

            await useRouter()?.push({

                path: "/login",
                name: "登录",
                params: { comp: "LAccount", floor: 0 },

            })

            return response.data

        } else if( response.data.status !== 200 && response.data.status !== 10012 ) {

            // ElNotification({
            //     title: '数据传输错误',
            //     message: response.data.data + "(" + response.data.message + ")",
            //     type: 'warning',
            //     position: 'bottom-right'
            // })

        } else return response.data

    },
    function (error) {

        // ElNotification({
        //     title: '网络连接错误',
        //     message: '无法连接至远程服务器，请联系网站管理员！',
        //     type: 'error',
        //     position: 'bottom-right'
        // })

        console.log(error)
        return Promise.reject({ data: error })
    }
)

export default service

