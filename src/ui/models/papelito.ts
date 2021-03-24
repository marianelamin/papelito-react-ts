import Player from './player'

class Papelito {
  text: string
  guessed: boolean
  id: number | null | undefined
  author: Player | null | undefined

  constructor(
    _text: string,
    _guessed?: boolean,
    _id?: number,
    _author?: Player
  ) {
    this.text = _text
    if (_guessed) this.guessed = _guessed
    else this.guessed = false
    if (_id) this.id = _id
    else this.id = null
    if (_author) this.author = _author
    else this.author = null
  }

  static fromAnotherPapelito(papelito: Papelito) {
    let newPapelito = new Papelito(papelito.text)
    newPapelito.author = papelito.author
    newPapelito.guessed = papelito.guessed
    newPapelito.id = papelito.id
    return newPapelito
  }

  toString(): string {
    const map = {
      text: this.text,
      guessed: this.guessed,
      id: this.id,
      author: this.author,
    }

    return map.toString()
  }
}

export default Papelito
