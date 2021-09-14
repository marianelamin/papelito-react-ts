import { Player, Team } from './all_models'
class ActiveTurn {
  activePlayer: Player
  activeTeam: Team
  guessedPapelitos: number
  timerCount: number

  constructor() {
    this.activePlayer = new Player('')
    this.activeTeam = new Team()
    this.guessedPapelitos = 0
    this.timerCount = 60
  }
}

export default ActiveTurn
