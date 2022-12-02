import { createApp, customRef, reactive, ref, watch, h, render } from 'vue'

import gsap from 'gsap'
import { Md5 } from 'ts-md5'

export function genGsapNumber(number = 0, duration = .5) {
    const obj = reactive({
        number,
        tweened: 0
    })
    watch(() => obj.number, () => {
       gsap.to(
            obj,
            {
                duration,
                tweened: Number(obj.number) || 0
            }
        )
    })
    return obj
}

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

import { computed } from 'vue'
import TalexTip from '~/components/common/message/TalexTip.vue'

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
