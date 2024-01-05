import { type Team } from 'papelito-models'

export class FirestoreTeam {
  id: string = '-1'

  constructor (
    public name: string,
    public order: number,
    public score: number
  ) {}

  static clone (item: FirestoreTeam): FirestoreTeam {
    const c = new FirestoreTeam(item.name, item.order, item.score)

    c.id = item.id

    return c
  }

  static fromTeam (team: Team): FirestoreTeam {
    return new FirestoreTeam(team.name, team.order, team.score)
  }
}
