type PapelitoClockType = 'in-progress' | 'paused' | 'reset'

export class FirestorePapelitoClock {
  constructor(
    public state: PapelitoClockType,
    public time_left: number,
    public end_of_turn?: Date
  ) {}

  static clone(item: FirestorePapelitoClock): FirestorePapelitoClock {
    return new FirestorePapelitoClock(item.state, item.time_left, item.end_of_turn)
  }
}
