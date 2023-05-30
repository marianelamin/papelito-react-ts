import { Player } from 'papelito-models/player'

export class Team {
  constructor(
    public id: string = '-1',
    public name: string = '',
    public order: number = 0,
    public score: number = 0,
    public players: Player[] = []
  ) {}

  toString() {
    return JSON.stringify(this)
  }

  static clone(team: Team): Team {
    return new Team(team.id, team.name, team.order, team.score, team.players)
  }
}
