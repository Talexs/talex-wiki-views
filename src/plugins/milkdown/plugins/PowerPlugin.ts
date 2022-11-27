import { Editor, defaultValueCtx, rootCtx, RemarkPlugin } from "@milkdown/core";
import { AtomList, createNode } from "@milkdown/utils";
import { commonmark } from "@milkdown/preset-commonmark";
import { nord } from "@milkdown/theme-nord";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { InputRule } from "prosemirror-inputrules";

import directive from "remark-directive";

// import "./style.css";

const id = "power";
const iframe = createNode(() => ({
    id,
    schema: () => ({
        attrs: {
            'data-text': { default: "TalexWiki" }
        },
        group: "inline",
        inline: true,
        marks: "",
        atom: true,
        parseDOM: [
            {
                tag: "div",
                getAttrs: (dom) => {
                    if (!(dom instanceof HTMLElement)) {
                        throw new Error();
                    }
                    return {
                        text: dom.getAttribute("text")
                    };
                }
            }
        ],
        toDOM: (node) => ["div", { ...node.attrs, class: "talex-power" }, 0],
        parseMarkdown: {
            match: (node) => {
                return node.type === "textDirective" && node.name === "div";
            },
            runner: (state, node, type) => {
                state.addNode(type, { text: (node.attributes as { text: string }).text });
            }
        },
        toMarkdown: {
            match: (node) => node.type.name === id,
            runner: (state, node) => {
                state.addNode("textDirective", undefined, undefined, {
                    name: "div",
                    attributes: {
                        text: node.attrs.text
                    }
                });
            }
        }
    }),
    inputRules: (nodeType) => [
        new InputRule(
            /#Power\{text="(?<text>[^"]+)?"?\}/,
            (state, match, start, end) => {
                const [okay, text = ""] = match;
                const { tr } = state;
                if (okay) {
                    tr.replaceWith(start, end, nodeType.create({ text }));
                }

                return tr;
            }
        )
    ],
    remarkPlugins: () => [directive as RemarkPlugin]
}));

export const iframePlugin = AtomList.create([iframe()]);
