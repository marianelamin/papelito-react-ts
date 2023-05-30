import { Player } from './player'

export class Papelito {
  constructor(
    public id: string,
    public text: string = '',
    public guessed: boolean = false,
    public inBowl: boolean = false,
    public author?: Player
  ) {}
}
