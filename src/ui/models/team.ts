import Player from 'ui/models/player'

class Team {
  id: number
  name: string
  players: Player[]
  score: number

  constructor() {
    this.id = -1
    this.name = ''
    this.score = 0
    this.players = []
  }

  toString() {
    let map = {
      id: this.id,
      name: this.name,
      players: this.players,
      score: this.score,
    }
    return map.toString()
  }
}

export default Team
