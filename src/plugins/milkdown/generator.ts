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

import { useEditor } from '@milkdown/vue'
import { commandsCtx, defaultValueCtx, Editor, rootCtx, themeManagerCtx } from '@milkdown/core'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { shiki } from 'milkdown-plugin-shiki'
import { nord } from '@milkdown/theme-nord'
import { codeFence, commonmark } from '@milkdown/preset-commonmark'
import { createDropdownItem, defaultActions, slash, slashPlugin } from '@milkdown/plugin-slash'
import { cursor } from '@milkdown/plugin-cursor'
import { block } from '@milkdown/plugin-block'
import { math } from '@milkdown/plugin-math'
import { gfm } from '@milkdown/preset-gfm'
import { iframePlugin } from '~/plugins/milkdown/plugins/PowerPlugin'

export function generateEditor(defaultValue: string, initFunc: Function, onUpdated: Function) {
    const editor = useEditor((root) => Editor.make()
        .config((ctx) => {
            ctx.set(rootCtx, root)

            // const ctx = editor.getInstance().ctx

            ctx.set(defaultValueCtx, defaultValue)
            ctx.get(listenerCtx).markdownUpdated((_ctx, markdown) => onUpdated(_ctx, markdown))

            function initial() {
                const editorIns = editor.getInstance()
                if( !editorIns ) return setTimeout(initial, 100)

                initFunc(ctx, editorIns)
            }

            initial()
        })
        .use(nord)
        .use(commonmark
            .configure(codeFence, {
                languageList: [ 'JavaScript', "TypeScript", "Bash", "SQL", "JSON", "YAML",
                    'HTML', "CSS", "C", "CPP", "JAVA", "Ruby", "Python", "Go", "Rust", "FileTree", "Terminal" ,
                    "Body"
                ]
            })
        )
        .use(slash.configure(slashPlugin, {
            config: (ctx) => {
                // Get default slash plugin items
                const actions = defaultActions(ctx);

                // Define a status builder
                return ({ isTopLevel, content, parentNode }) => {
                    // You can only show something at root level
                    if (!isTopLevel) return null;

                    // Empty content ? Set your custom empty placeholder !
                    if (!content) {
                        return { placeholder: '输入 \'/\' 来打开提示窗口。' };
                    }

                    // Define the placeholder & actions (dropdown items) you want to display depending on content
                    if (content.startsWith('/')) {

                        // if (parentNode.type.name === 'customNode') {
                        //     actions.push({
                        //         id: 'custom',
                        //         dom: createDropdownItem(ctx.get(themeManagerCtx), 'Custom', 'h1'),
                        //         command: () => ctx.get(commandsCtx).call(/* Add custom command here */),
                        //         keyword: ['custom'],
                        //         typeName: 'heading',
                        //     });
                        // }

                        return content === '/'
                            ? {
                                placeholder: '输入内容以匹配',
                                actions,
                            }
                            : {
                                // @ts-ignore
                                actions: actions.filter(({ keyword }) =>
                                    keyword.some((key: string) => key.includes(content.slice(1).toLocaleLowerCase())),
                                ),
                            };
                    }
                };
            }
        }))
        // .use(await shiki({
        //
        // }))
        .use(cursor)
        .use(block)
        .use(math)
        .use(gfm)
        .use(iframePlugin)
        .use(listener)
    )
    return () => editor
}
