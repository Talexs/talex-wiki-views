<template>
  <div class="test">
    你好，{{ name }}
    <button @click="func">
      你点了我 {{ number }} 次
    </button>

    <Loading style="left: 50%;top: 50px" />
  </div>
</template>

<script setup>
import Loading from './../common/icon/LoadingIcon.vue'


// ---------------------

// const v1 = 1
//
// const obj = {
//
//   v1
//
// }
//
// console.log( obj )

// es6 -> 属性名缩短的语法糖

// const obj = {
//   a: 1, b: 2
// }
//
// const {a} = obj
//
// console.log(a)

// ---------------------

// async function register() {
//
//   return new Promise((resolve)=> {
//
//     resolve({
//       path: "/user/register",
//       time: 2000,
//       code: 200,
//       data: {
//         name: "张三",
//         uid: 1
//       }
//     })
//
//   })
//
// }
//
// const {data: res} = await register()

// const uid = res.uid

// console.log( res )

// ---------------------

// ;

// Promise<void>

// function func1() {
//
//   return new Promise((resolve, reject) => {
//
//     reject(1)
//
//   })
//
// }
//
// // 闭包
// ;(async function output() {
//
//   console.log( await func1() )
//
// })()

/// （） 要运算的内容 # (1 + 1) * 2

// ---------------------

// const variable = undefined; // -> Boolean
//
// console.log( variable || [] ) // true -> variable | false -> []
// console.log( variable ?? [] ) // null || undefined
//
// // ==
//
// console.log( variable ? variable : [] )

// ---------------------

// const myName = "Tag"

// es6 -> es2016++ | babel

// const newArray = ["你","好"]

// const array = [ ...myName ]

// const obj = { a: 1, b: 2 }

// const map = new Map()

// map.set(1, "a")
// map.set(2, "b")

// console.log( [ ...map.keys() ] )

// console.log( [...obj])

// iterable

// console.log( [], obj )

// array.forEach(item => {
//   newArray.push(item)
// })

// console.log( [ ...newArray, ...array ].join("") )

// console.log( ["你","好", ...array] )

// for( let i = 0;i < myName.length; ++i) {
//
//   console.log( myName[i] )
//
// }

// const array = [""]

// ---------------------

import { ref } from 'vue'

const name = ref("世界！")

const number = ref(0)

const func = ref(() => {

  number.value ++;

  console.log( number )

})

</script>

<script>
export default {
  name: "GuideRef"
}
</script>

<style scoped>

</style>
