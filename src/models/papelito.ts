import { type Player } from './player'

export const defaultPapelito = {
  text: '',
  isCurrentlyDrawn: false,
  guessed: false,
  inBowl: false
}

export interface Papelito {
  id: string
  text: string
  isCurrentlyDrawn: boolean
  guessed: boolean
  inBowl: boolean
  author?: Player
}
