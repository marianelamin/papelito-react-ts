import { Room, GameSettings } from '..'

export class FirestoreRoom {
  id: string = '-1'

  constructor(
    public code: string,
    public password: string,
    public is_private: boolean,

    public has_game_started: boolean,
    // public active_round_number: number,
    // public active_player_id: string,
    // public active_team_id: string,
    // public papelitos_guessed: number,
    // public timer_count: number,

    public settings_papelito_per_player: number,
    public settings_papelito_text_limit: number,
    public total_rounds: number,
    public time_per_turn: number,

    public created_date: string
  ) {}

  static clone(item: FirestoreRoom): FirestoreRoom {
    const c = new FirestoreRoom(
      item.code,
      item.password,
      item.is_private,
      item.has_game_started,
      // item.active_round_number,
      // item.active_player_id,
      // item.active_team_id,
      // item.papelitos_guessed,
      // item.timer_count,
      item.settings_papelito_per_player,
      item.settings_papelito_text_limit,
      item.total_rounds,
      item.time_per_turn,
      item.created_date
    )

    c.id = item.id

    return c
  }

  toRoom(): Room {
    return new Room(
      this.id,
      this.code,
      this.password,
      new GameSettings(
        this.is_private,
        this.settings_papelito_per_player,
        this.settings_papelito_text_limit,
        this.time_per_turn,
        this.total_rounds
      ),
      this.has_game_started,
      // new Turn( // remove this from here
      //   false,
      //   this.active_player_id,
      //   this.active_team_id,
      //   this.papelitos_guessed,
      //   this.timer_count
      // ),
      // this.total_rounds,
      new Date(this.created_date)
    )
  }

  static fromRoom(item: Room): FirestoreRoom {
    return new FirestoreRoom(
      item.code,
      item.password,
      item.settings.isPrivate,
      item.hasGameStarted,
      item.settings.papelitoPerPlayer,
      item.settings.papelitoTextLimit,
      item.settings.rounds,
      item.settings.timerTurn,
      item.createdDate.toISOString()
    )
  }
}
