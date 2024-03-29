import { Papelito, defaultPlayer } from '..'

export class FirestorePapelito {
  constructor(
    public text: string,
    public is_currently_drawn: boolean = false,
    public is_guessed: boolean,
    public is_in_bowl: boolean,
    public author_id?: string
  ) {}

  static clone(item: FirestorePapelito): FirestorePapelito {
    const c = new FirestorePapelito(
      item.text,
      item.is_currently_drawn,
      item.is_guessed,
      item.is_in_bowl,
      item.author_id
    )

    return c
  }

  static fromPapelito(papelito: Papelito) {
    return new FirestorePapelito(
      papelito.text,
      papelito.isCurrentlyDrawn,
      papelito.guessed,
      papelito.inBowl,
      papelito.author?.id
    )
  }

  toPapelito(id: string): Papelito {
    return {
      id,
      text: this.text,
      isCurrentlyDrawn: this.is_currently_drawn,
      guessed: this.is_guessed,
      inBowl: this.is_in_bowl,
      author: this.author_id
        ? {
            ...defaultPlayer,
            id: this.author_id
          }
        : undefined
    }
  }
}
