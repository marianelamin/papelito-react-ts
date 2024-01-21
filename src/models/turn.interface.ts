import { Papelito, Player, Team } from '.'

export interface Turn {
  team: Team
  presenter: Player
  papelitos: Papelito[]
  timerCount: number
}
