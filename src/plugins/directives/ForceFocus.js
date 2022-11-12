import { createApp, nextTick } from 'vue'

const forceFocus = {
    mounted(ele) {

        const el = ele.querySelector('input')

        const attr = el.getAttributeNode && el.getAttributeNode("tabindex")
        const hasAttr = attr ? attr.specified : false

        if( !hasAttr ) el.tabIndex = -1

        el.focus()
    }
}

export default forceFocus
