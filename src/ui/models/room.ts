import Papelito from './papelito'
import Team from './team'

class Room {
  id: string
  bowl: Papelito[]
  currentTeam: number
  previousTeam: number
  nextTeam: number

  password: string | undefined
  private: boolean
  round: number

  teams: Team[]
  constructor() {
    this.id = '-1'
    this.bowl = []
    this.previousTeam = -1
    this.currentTeam = 0
    this.nextTeam = 1
    this.password = undefined
    this.private = false
    this.round = 1
    this.teams = []
  }
}

export default Room
