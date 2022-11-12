import { createApp, customRef } from 'vue'

import WikiTip from './../components/common/message/WikiTip.vue'
import WikiDialogTip from './../components/common/message/WikiDialogTip.vue'

import { Md5 } from 'ts-md5'

export function _T_DecodeNumber(str: string, addonSecret: number = 0): number {
    return parseInt(String(str2number(str)), 8) - addonSecret
}

export function _T_EncodeNumber(number: number, randomAddon: number = 0): string {
    return number2str(Number((number + randomAddon).toString(8)))
}

export function str2number(str: string): number {

    const mapper = "VTFCPOGMX*"

    let _str = ''
    for( const letter of [ ...str ] ) _str += mapper.indexOf(letter.toUpperCase())

    return Number(_str)
}

export function number2str(number: number): string {

    const mapper = "VTFCPOGMX"

    let str = ''
    for( const letter of [ ...String(number) ] ) {

        const char = mapper.at(Number(letter)) || '*'
        str += Math.random() > .5 ? char.toLowerCase() : char

    }

    return str
}

// string to md5
export const toMD5 = ( str: string ) => {

    return Md5.hashStr(str);

}

export enum TipType { // 提示类型
    ERROR, WARNING, INFO, SUCCESS, DEFAULT
}

export interface DialogBtn {

    content: string
    type?: TipType
    onClick: () => Promise<Boolean>; // return true for close, false for deny
    loading?: (func: Function) => Promise<void>; // 1 param argument for loading function, call for stop loading

}

import { mentionManager, MentionTip } from './addon/MentionerManager'

export async function forMentionTip(tip: MentionTip) {

    await mentionManager.applyFor(tip)

}

export async function forWikiDialogTip(title: String, message: String, btns: DialogBtn[] = [ { content: "确定", type: TipType.INFO, onClick: async () => true } ]) {

    const root: HTMLDivElement = document.createElement('div');

    let index: number = 0;

    while( document.getElementById('wiki-dialog-tip-' + index) ) {

        index++;

    }

    root.id = 'wiki-dialog-tip-' + index;

    root.style.zIndex = `${10000 + index}`

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

export async function forWikiTip(message: String, stay: Number, type: TipType | null = null, loading: boolean = false, left: boolean = false) {

    const root: HTMLDivElement = document.createElement('div');

    let index: number = 0;

    while( document.getElementById('wiki-tip-' + index) ) {

        index++;

    }

    root.id = 'wiki-tip-' + index;

    root.style.position = 'absolute'
    root.style[left ? 'left' : 'right'] = '-100%'
    root.style.bottom = `calc(5% + ${index * 45}px)`;
    root.style.transition = 'all .25s'

    const app = createApp(WikiTip, {
        message, stay, index, type, loading,
        close: async () => {

            root.style.opacity = '0'
            root.style[left ? 'left' : 'right'] = '-100%'

            await sleep(300)

            app.unmount();

            document.body.removeChild(root);

        }
    })

    document.body.appendChild(root);
    app.mount(root);

    await sleep(200)

    root.style[left ? 'left' : 'right'] = '0'

}

import { computed } from 'vue'

export function useModelWrapper(props: any, emit: any, name = 'modelValue') {
    return computed({
        get: () => props[name],
        set: (value) => emit(`update:${name}`, value)
    })
}

export function throttleRef(value: any, time: number) {

    let ts = 0

    return customRef((track, trigger) => {
        return {
            get() {
                track()
                return value
            },
            set(newValue) {

                if( new Date().getTime() - ts < time ) return

                value = newValue
                track()
                trigger()
                ts = new Date().getTime()
            }
        }
    })

}

export function debounceRef(value: any, delay: number) {

    let timer: any

    return customRef((track, trigger) => {
       return {
           get() {
               track()
               return value
           },
           set(newValue) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                  value = newValue
                  track()
                  trigger()
                }, delay)
           }
       }
    })

}

export async function sleep(time: number) {
    return new Promise(resolve => setTimeout(() => resolve(time), time))
}

// class Animal {
//
//     private name: String
//     private readonly age: Number
//
//     constructor(name: String, age: Number) {
//
//         this.name = name
//         this.age = age
//
//     }
//
//     public getName(): String {
//
//         return this.name;
//
//     }
//
//     public getAge(): Number {
//
//         return this.age;
//
//     }
//
//     public setName(name: String): void {
//
//         this.name = name
//
//     }
//
// }
//
// class Dog extends Animal {
//
//     private gender: String
//
//     constructor(name: String, age: Number, gender: String) {
//         super(name, age);
//
//         this.gender = gender
//
//     }
//
//
// }
//
// // class Cat extends Animal {
// //
// //     private name: String
// //
// //     constructor(name: String) {
// //
// //         this.name = name
// //
// //     }
// //
// // }
//
// // 多态
//
// const dog: Animal = new Dog("旺财", 2, "雄")
