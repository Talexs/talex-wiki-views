// --------------------------------------------------

// 封装

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
