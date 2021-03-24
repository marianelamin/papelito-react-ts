import Player from 'ui/models/player'

class Team {
  id: number
  name: string
  players: Player[]
  score: number
  size: number

  constructor() {
    this.id = -1
    this.name = ''
    this.score = 0
    this.players = []
    this.size = 0
  }

  // static fromJson(map:Map){
  //   let newTeam = new Team()
  //   newTeam.id =
  //   newTeam.name =
  //   newTeam.players =
  //   newTeam.score =
  //   newTeam.size
  // }
}

export default Team
