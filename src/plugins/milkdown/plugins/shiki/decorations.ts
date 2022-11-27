// /*
//  * Copyright (c) 2022. TalexDreamSoul
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */
// import { findChildren } from '@milkdown/utils'
// import { Node } from 'prosemirror-model'
// import { Decoration, DecorationSet } from 'prosemirror-view'
// import type { Highlighter } from 'shiki'
//
// export type FlattedNode = {
//     content: string
//     color: string
// }
//
// export function getDecorations(doc: Node, highlighter: Highlighter, name: string) {
//     const decorations: Decoration[] = []
//
//     findChildren((node) => node.type.name === name)(doc).forEach(async (block) => {
//         let from = block.pos + 1
//         const { language } = block.node.attrs
//         if (!language) return
//         const nodes = highlighter.codeToThemedTokens(block.node.textContent, language).map((token) =>
//             token.map(
//                 ({ content, color }) =>
//                     ({
//                         content,
//                         color,
//                     } as FlattedNode),
//             ),
//         )
//         nodes.forEach((block) => {
//             block.forEach((node) => {
//                 const to = from + node.content.length
//                 const decoration = Decoration.inline(from, to, {
//                     style: `color: ${node.color}`,
//                 })
//                 decorations.push(decoration)
//                 from = to
//             })
//             from += 1
//         })
//     })
//     return DecorationSet.create(doc, decorations)
// }
