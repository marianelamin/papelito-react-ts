import { FirestoreTeam } from '.'

export class FirestoreStats {
  constructor(
    public team: FirestoreTeam,
    public score: number
  ) {}

  static clone(item: FirestoreStats): FirestoreStats {
    return new FirestoreStats(item.team, item.score)
  }
}

export class FirestoreRound {
  id: string = '-1'

  constructor(
    public turnIds: string[],
    public stats: FirestoreStats[]
  ) {}

  static clone(item: FirestoreRound): FirestoreRound {
    const c = new FirestoreRound(
      item.turnIds,
      item.stats.map((s) => new FirestoreStats(s.team, s.score))
    )

    c.id = item.id

    return c
  }
}
