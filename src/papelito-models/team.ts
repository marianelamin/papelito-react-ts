import Player from 'papelito-models/player'
import { MapAndClone } from 'dao/firebase_helpers'

class Team implements MapAndClone<Team> {
  constructor(
    public id: string = '-1',
    public name: string = '',
    public order: number = 0,
    public score: number = 0,
    public players: Player[] = []
  ) {}

  toString() {
    return this.toMap().toString()
  }

  toMap() {
    return {
      id: this.id,
      name: this.name,
      order: this.order,
      score: this.score,
      players: this.players,
    }
  }

  static clone(team: Team): Team {
    return new Team(team.id, team.name, team.order, team.score, team.players)
  }

  static fromJson(map: Map<string, any>) {
    console.log(`This is the map: ${map}`)
    return new Team(
      map.get('id'),
      map.get('name'),
      map.get('order'),
      map.get('score'),
      map.get('players')
    )
  }
}

export default Team
