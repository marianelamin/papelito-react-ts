export class FirestoreTurn {
  id: string = '-1'

  constructor(
    public active: boolean,
    public round_number: number,
    public player_id: string,
    public papelitos_guessed: number,
    public timer_count: number
  ) {}

  static clone(item: FirestoreTurn): FirestoreTurn {
    let c = new FirestoreTurn(
      item.active,
      item.round_number,
      item.player_id,
      item.papelitos_guessed,
      item.timer_count
    )

    c.id = item.id

    return c
  }
}
