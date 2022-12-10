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

import { createApp } from 'vue'
import ImageViewer from '~/components/common/viewer/ImageViewer.vue'
import _ from 'lodash'

export function useImageClickAgent(container: HTMLBaseElement) {
    container.querySelectorAll('img').forEach(img => {
        const { src } = img.attributes as any
        if( src ) {
            const root: HTMLDivElement = document.createElement('div');
            const wrapperEl = img/*.parentElement*/ as HTMLElement

            wrapperEl.onclick = () => {

                const app = createApp(ImageViewer, {
                    wrapper: wrapperEl,
                    img,
                    close: () => {

                        app.unmount();

                        document.body.removeChild(root)

                    }
                })

                document.body.appendChild(root);
                app.mount(root);

            }

        }

    })
}

export function useEditorOutline(scrollbar: any, container: HTMLBaseElement) {

    let observer: any = null;
    let activeCatalogName: string | null = null;

    function generateUniqueNumber() {
        let num = 0
        return function() {
            num += 1
            return num
        }
    }

    const getUniqueNumber = generateUniqueNumber()

    function mutationObserverInstall() {

        const list = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
        let catalogList: any[] = []

        return new MutationObserver((mutations) => {
            mutations.forEach((mutation: any) => {
                console.log('mutation', mutation)
                // 过滤出 h1-h6
                const children = _.filter(mutation.target.children, item => _.includes(list, item.nodeName))
                // 移除 h1-h6 中的一个
                const removedNodes = _.some(mutation.removedNodes, item => _.includes(list, item.nodeName))

                // children.length > 1 ,此时会全量更新h1-h6的节点
                if ( !_.isEmpty(mutation.addedNodes) && !_.isEmpty(children) ) {
                    // 先清空
                    catalogList = []
                    console.log('children', children)

                    // 给元素添加自定义属性
                    _.forEach(children, child => {
                        const foundName = _.find(child.attributes, { name: 'catalog_name' })

                        // 未添加自定义属性的目录
                        if ( !foundName ) {
                            const name = `catalog_${ getUniqueNumber() }`
                            child.setAttribute('catalog-index', name)

                            catalogList.push({
                                catalogName: name,
                                nodeName: child.nodeName,
                                innerHTML: child.innerHTML,
                            })
                        }
                        // 已经添加了自定义属性
                        else {
                            catalogList.push({
                                catalogName: foundName.value,
                                nodeName: child.nodeName,
                                innerHTML: child.innerHTML,
                            })
                        }
                    })

                    console.log('catalogList', catalogList)
                    // $emit('showCatalog', catalogList)
                }

                // children.length = 0 , 检查到全文中没有h1-h6, 则清空目录列表
                if ( removedNodes && _.isEmpty(children) ) {
                    const catalogs = container.querySelectorAll('h1,h2,h3,h4,h5,h6')

                    // 清空目录列表
                    if ( _.isEmpty(catalogs) ) /*this.$emit('showCatalog', [])*/
                        console.log('清空目录列表')
                }

            })
        })

    }

    // function activeCatalogNameChange() {
    //     const titleNode = container.querySelector(`[catalogname=${activeCatalogName}]`)
    //     console.log('titleNode', titleNode)
    //     const top = titleNode.offsetTop
    //
    //         // 设置滚动条滚动到对应的位置
    //         // iframe的window对象
    //     console.log(scrollbar)
    //     scrollbar.scrollTo(0, top)
    //     // ;(document.getElementById('tinymce_ifr') as any).contentWindow.scrollTo(0, top)
    // }

    // 查找所有h1-h6标题节点
    function findH1ToH6Nodes() {
        // 获取h1-h6的所有节点
        const children = container.querySelectorAll('h1,h2,h3,h4,h5,h6')

        if (_.isEmpty(children)) return

        const catalogList: any[] = []

        // 保留只有id锚点的节点
        _.forEach(children, (child: any) => {
            const name = `catalog_${getUniqueNumber()}`
            child.setAttribute('catalogName', name)

            catalogList.push({
                catalogName: name,
                node: child,
                nodeName: child.nodeName,
                innerHTML: child.innerHTML,
            })
        })

        if (!_.isEmpty(catalogList)) /*this.$emit('showCatalog', catalogList)*/
            console.log('catalogList', catalogList)

        return catalogList
    }

    const obj = {
        scrolling: (e: any) => {
            // console.log(e)
        },
        mounted: () => {
            // observer = mutationObserverInstall()

            /*const nodesMap =*/ findH1ToH6Nodes()

            // console.log(nodesMap)

            // obj.updated()
        },
        updated: () => {
            // // 配置观察选项
            // const config = {
            //     // 观察 attributes 改变
            //     attributes: true,
            //     // 指定观察属性
            //     attributeFilter: ['id'],
            //     // 观察节点增删
            //     childList: true,
            //     // 观察文本改变
            //     characterData: true,
            //     // 观察子节点树
            //     subtree: true
            // }
            //
            // // 关闭观察器
            // observer.disconnect()
            // // 观察节点变化
            // observer.observe(container, config)
        }
    }

    return obj

}
