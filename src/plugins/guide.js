// --------------------------------------------------

// 封装

// 隐式 -> 创建一个对象
// 显式 -> 访问一个对象

// 你去吃海底捞
//   调料 # 水果 (直接可以访问的 # 显式）
//   后厨 -> 切水果 （隐式 # 说 -> 切）

const obj= {}
const func = () => {}

// 对象 { 创建 / 访问 }

// function. -> prototype

class Animal {

  #name
  #age

  constructor(name, age) {

    this.#name = name
    this.#age = age

  }

  setName(name) { // setter

    if( name === "张三" ) return

    this.#name = name

  }

  getName() {

    return this.#name

  }

  getAge() {

    return this.#age

  }

}

// 继承

class Dog extends Animal {

  #gender

  constructor(name, age, gender) {
    super(name, age);

    this.#gender = gender

  }

  getGender() {

    return this.#gender

  }

  setGender(gender) {

    this.#gender = gender

  }

}

// 多态



const dog = new Dog("旺财", 26);

dog.getAge()
dog.getGender()

new Promise(() => {



});

// js/ts oop => 万物皆对象

