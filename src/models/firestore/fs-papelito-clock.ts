type PapelitoClockType = 'in-progress' | 'paused' | 'reset'

export class FirestorePapelitoClock {
  constructor(
    public count_down: number,
    public state: PapelitoClockType
  ) {}

  static clone(item: FirestorePapelitoClock): FirestorePapelitoClock {
    return new FirestorePapelitoClock(item.count_down, item.state)
  }
}
