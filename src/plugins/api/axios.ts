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

import axios from 'axios'

import { sleep } from '../Common'

import GlobalConfig from '~/config/GlobalConfig.js'
import RefreshConfig from '~/config/RefreshConfig.js'
import ErrorCode from '~/config/ErrorCode.js'
import { useStore } from '~/plugins/store'
import { MentionTip } from '~/plugins/addon/MentionerManager'
import { TipType } from '~/plugins/addon/Tipper'
import { GLOBAL } from '@antv/g2plot/lib/core/global'

const config = {
    baseURL: `${GlobalConfig.hostName}:${GlobalConfig.endsPort}/`,
    timeout: 60000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    }
    // withCredentials: true,
}

Object.defineProperty(window, 'MAX_SUCCESS_CODE', {
    value: 9998,
    enumerable: true,
    writable: false
})

const _axios = axios.create(config)

// Object.defineProperty(_axios, 'validateStatus', {
//     value: (status: Number) => {
//         return status >= 200 && status < 510;
//     },
//     enumerable: true,
//     writable: false
//  })

// 容错处理
_axios.interceptors.request.use(
     originConfig => {

         const reqConfig = { ...originConfig }

         if( !reqConfig.url ) console.error('Request url must not be null.')

         const method: String = String(reqConfig?.method).toLowerCase()

         // console.log(reqConfig, method)

         method && (() => {

             if( method === 'get' ) !reqConfig.params ? reqConfig.params = reqConfig.data || {} : 0
             else if( method === 'post' ) {
                 !reqConfig.data ? reqConfig.data = reqConfig.params || {} : 0

                 let hasFile = false
                 Object.keys(reqConfig.data).forEach(key => {
                     typeof reqConfig.data[key] === 'object' && (
                         (item) => (item instanceof FileList || item instanceof File || item instanceof Blob) ? hasFile = true : 0
                     )(reqConfig.data[key])
                 })

                 hasFile && ((data) => {
                     const formData = new FormData()

                     Object.keys(data).forEach(key => formData.append("file", data[key]))

                     reqConfig.data = formData

                     // console.log("File", formData)

                 })(reqConfig.data)
             }

         })()

         const accessToken = localStorage.getItem(RefreshConfig.storage.accessToken)

         accessToken && (headers => {
             headers && (headers['Authorization'] = accessToken)
         })(reqConfig['headers'])

        return reqConfig
    },
    error => Promise.reject(error)
)

async function logout() {
    const store = useStore()
    store.local.loggedIn = false
    localStorage.clear()

    const { origin } = window.location
    window.location.href = origin

    // window.location = '/'

    window.$tipper.tip( '登录超时，请重新登录!', {
        stay: 4000,
        type: TipType.ERROR
    } );
}

// 添加响应拦截器
_axios.interceptors.response.use(
    async (res: any) => {

        if( res.status.toString().charAt(0) !== '2' ) {

            console.error("@FATAL ERROR@")

            window.$tipper.tip( '系统出现错误，请联系管理员!', {
                stay: 12000,
                type: TipType.ERROR
            } );

            return Promise.reject(res)

        }

        const data = res.data
        if( data.error ) {

            const { code } = data

            // // refresh_token 异常，直接登出
            // if (refreshTokenException(code)) {
            //     setTimeout(logout, 1500)
            //     return Promise.resolve(null)
            // }

            // assessToken相关，刷新令牌
            if (code === 406) {
                let refreshToken = localStorage.getItem(RefreshConfig.storage.refreshToken)

                if( !refreshToken ) {
                    await logout()
                    return Promise.resolve(null)
                }

                // process bearer
                refreshToken = refreshToken.slice(7)

                const refreshResult: any = await post('/user/refresh_token', {
                    refresh_token: refreshToken
                })
                const accessToken = refreshResult ? refreshResult['access_token'] : ""
                localStorage.setItem(RefreshConfig.storage.accessToken, `${RefreshConfig.storage.bearer} ${accessToken}`)

                // 将上次失败请求重发
                const result = await _axios(res.config)
                return Promise.resolve(result)
            }

        }

        if( ( res.config['hideError'] !== true ) && data.error ) {

            let msg = data.error?.msg ? Array(...data.error.msg) : [data.error]

            for ( const m of msg ) {

                console.log("@Error", m)

                window.$tipper.tip( m + '!', {
                    stay: 3200,
                    type: TipType.WARNING
                } );

                await sleep(200)

            }

        }

        return data.data

        /*if( data.code.toString().charAt(0) === '2' )*/ //return data.data

        // console.log('response catch error', res)

        // return await Promise.reject(res)

    },
    async res => {

        if ( !res.response || res.code === "ERR_INTERNET_DISCONNECTED" ) {
            return window.$tipper.tip( '请检查您的网络!', {
                stay: 8200,
                type: TipType.WARNING
            } );
        }

        // 判断请求超时
        if ( res.code === "ERR_NETWORK" && (res.message.indexOf('timeout') !== -1 || res.message === 'Network Error') ) {
            return window.$tipper.tip( '无法连接至远程服务器!', {
                stay: 8200,
                type: TipType.WARNING
            } );
        }

        console.log("@ERROR", res)

        const { code, message } = res.data

        return new Promise(async (resolve, reject) => {

            let tipMessage: any = message

            // 弹出信息提示的第一种情况：直接提示后端返回的异常信息（框架默认为此配置）；
            // 特殊情况：如果本次请求添加了 handleError: true，用户自行通过 try catch 处理，框架不做额外处理
            if (res.config?.handleError) {
                return reject(res)
            }

            // 弹出信息提示的第二种情况：采用前端自己定义的一套异常提示信息（需自行在配置项开启）；
            // 特殊情况：如果本次请求添加了 showBackend: true, 弹出后端返回错误信息。
            if (!res.config?.showBackend) {
                // 弹出前端自定义错误信息
                const errorArr = Object.entries(ErrorCode).filter(v => v[0] === code.toString())
                // 匹配到前端自定义的错误码
                if (errorArr.length > 0 && errorArr[0][1] !== '') {
                    ;[[, tipMessage]] = errorArr
                } else {
                    tipMessage = ErrorCode['777']
                }
            }

            if ( typeof message === 'string' ) {
                tipMessage = message
            }
            if ( Object.prototype.toString.call(message) === '[object Object]' ) {
                ;[ tipMessage ] = Object.values(message).flat()
            }
            if ( Object.prototype.toString.call(message) === '[object Array]' ) {
                ;[ tipMessage ] = message
            }
            await window.$tipper.mention(new MentionTip(tipMessage, {
                time: 3200,
                type: TipType.ERROR
            }));
            reject(res)
        })

    }
)

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post(url: string, data = {}, params = {}) {
    return _axios({
        method: 'post',
        url,
        data,
        params,
    })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get(url: string, params = {}) {
    return _axios({
        method: 'get',
        url,
        params,
    })
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url: string, data = {}, params = {}) {
    return _axios({
        method: 'put',
        url,
        params,
        data,
    })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url: string, params = {}) {
    return _axios({
        method: 'delete',
        url,
        params,
    })
}

declare module 'axios' {
    export interface AxiosRequestConfig {
        hideError?: boolean
    }
}

export default _axios

