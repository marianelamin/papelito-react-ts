export class Papelito {
  text: string
  guessed: boolean
  id: number | null | undefined

  constructor(
    _text: string,
    _guessed?: boolean,
    _id?: number | undefined | null
  ) {
    this.text = _text
    if (_guessed) this.guessed = _guessed
    else this.guessed = false
    if (_id) this.id = _id
    else this.id = null
  }

  public toString() {
    const map = { text: this.text, guessed: this.guessed, id: this.id }

    return map.toString()
  }
}