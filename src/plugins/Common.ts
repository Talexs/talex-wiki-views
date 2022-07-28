import { createApp } from 'vue'

import WikiTip from './../components/common/message/WikiTip.vue'
import WikiDialogTip from './../components/common/message/WikiDialogTip.vue'

export enum TipType {
    ERROR, WARNING, INFO, SUCCESS, DEFAULT
}

export interface DialogBtn {

    content: string
    type?: TipType
    onClick: () => Boolean; // return true for close, false for deny
    loading?: (func: Function) => Promise<void>; // 1 param argument for loading function, call for stop loading

}

export async function forWikiDialogTip(title: String, message: String, btns: DialogBtn[] = [ { content: "确定", type: TipType.INFO, onClick: () => true } ]) {

    const root: HTMLDivElement = document.createElement('div');

    let index: number = 0;

    while( document.getElementById('wiki-dialog-tip-' + index) ) {

        index++;

    }

    root.id = 'wiki-dialog-tip-' + index;

    root.style.zIndex = `${100 + index}`

    const app = createApp(WikiDialogTip, {
        message, index, title, btns,
        close: async () => {

            app.unmount();

            document.body.removeChild(root);

        }
    })

    document.body.appendChild(root);
    app.mount(root);

}

export async function forWikiTip(message: String, stay: Number, type: TipType | null = null, loading: boolean = false) {

    const root: HTMLDivElement = document.createElement('div');

    let index: number = 0;

    while( document.getElementById('wiki-tip-' + index) ) {

        index++;

    }

    root.id = 'wiki-tip-' + index;

    root.style.position = 'absolute'
    root.style.right = '-100%'
    root.style.bottom = `calc(5% + ${index * 45}px)`;
    root.style.transition = 'all .25s'

    const app = createApp(WikiTip, {
        message, stay, index, type, loading,
        close: async () => {

            root.style.opacity = '0'
            root.style.right = '-100%'

            await sleep(300)

            app.unmount();

            document.body.removeChild(root);

        }
    })

    document.body.appendChild(root);
    app.mount(root);

    await sleep(200)

    root.style.right = '0'

}


export async function sleep(time: number) {
    return new Promise((resolve) => setTimeout(() => resolve(time), time))
}
