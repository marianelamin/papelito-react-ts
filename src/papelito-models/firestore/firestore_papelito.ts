import { Papelito, defaultPlayer } from 'papelito-models'

export class FirestorePapelito {
  id: string = '-1'

  constructor(
    public text: string,
    public is_guessed: boolean,
    public is_in_bowl: boolean,
    public author_id?: string
  ) {}

  static clone(item: FirestorePapelito): FirestorePapelito {
    let c = new FirestorePapelito(
      item.text,
      item.is_guessed,
      item.is_in_bowl,
      item.author_id
    )

    c.id = item.id

    return c
  }

  static fromPapelito(papelito: Papelito) {
    return new FirestorePapelito(
      papelito.text,
      papelito.guessed,
      papelito.inBowl,
      papelito.author?.id
    )
  }

  toPapelito(): Papelito {
    return new Papelito(
      this.id,
      this.text,
      this.is_guessed,
      this.is_in_bowl,
      this.author_id
        ? {
            id: this.author_id,
            name: defaultPlayer.name,
            order: defaultPlayer.order,
            teamId: defaultPlayer.teamId,
          }
        : undefined
    )
  }
}
