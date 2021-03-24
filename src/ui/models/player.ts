class Person {
  name: string

  constructor(name: string) {
    this.name = name
  }
}

class Player extends Person {
  activeInTurn: boolean

  constructor(name: string) {
    super(name)
    this.activeInTurn = false
  }

  toString() {
    return `{ name: ${this.name}, activeInTurn: ${this.activeInTurn} }`
  }
}

export default Player
