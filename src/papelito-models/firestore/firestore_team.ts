import { Team } from 'papelito-models'
import { MapAndClone } from 'dao/firebase_helpers'

export class FirestoreTeam implements MapAndClone<FirestoreTeam> {
  id: string = '-1'

  constructor(
    public name: string,
    public order: number,
    public score: number
  ) {}

  toMap() {
    return {
      name: this.name,
      order: this.order,
      team_id: this.score,
    }
  }

  static clone(item: FirestoreTeam): FirestoreTeam {
    let c = new FirestoreTeam(item.name, item.order, item.score)

    c.id = item.id

    return c
  }

  static fromTeam(team: Team): FirestoreTeam {
    return new FirestoreTeam(team.name, team.order, team.score)
  }
}
