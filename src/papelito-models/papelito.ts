import Player from './player'
import { MapAndClone } from 'dao/firebase_helpers'

class Papelito implements MapAndClone<Papelito> {
  constructor(
    public id: string,
    public text: string = '',
    public author: Player = new Player(),
    public guessed: boolean = false,
    public inBowl: boolean = false
  ) {}

  toString() {
    return this.toMap().toString()
  }

  toMap() {
    return {
      id: this.id,
      text: this.text,
      author: this.author,
      guessed: this.guessed,
      inBowl: this.inBowl,
    }
  }

  static clone(papelito: Papelito) {
    return new Papelito(
      papelito.id,
      papelito.text,
      papelito.author,
      papelito.guessed,
      papelito.inBowl
    )
  }

  static fromJson(map: Map<string, any>) {
    console.log(`This is the map: ${map}`)
    return new Papelito(
      map.get('id'),
      map.get('text'),
      map.get('author'),
      map.get('guessed'),
      map.get('inBowl')
    )
  }
}

export default Papelito
