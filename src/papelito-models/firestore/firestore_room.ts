import { Room } from 'papelito-models'
import { GameSettings } from 'papelito-models/game_settings'
import { Turn } from 'papelito-models/turn'

export class FirestoreRoom {
  id: string = '-1'

  constructor (
    public code: string,
    public password: string,
    public is_private: boolean,
    public active_round_number: number,

    public active_player_id: string,
    public active_team_id: string,
    public papelitos_guessed: number,
    public timer_count: number,

    public settings_papelito_per_player: number,
    public settings_papelito_text_limit: number,
    public total_rounds: number,
    public time_per_turn: number,

    public created_date: string
  ) {}

  static clone (item: FirestoreRoom): FirestoreRoom {
    const c = new FirestoreRoom(
      item.code,
      item.password,
      item.is_private,
      item.active_round_number,
      item.active_player_id,
      item.active_team_id,
      item.papelitos_guessed,
      item.timer_count,
      item.settings_papelito_per_player,
      item.settings_papelito_text_limit,
      item.total_rounds,
      item.time_per_turn,
      item.created_date
    )

    c.id = item.id

    return c
  }

  toRoom (): Room {
    return new Room(
      this.id,
      this.code,
      this.password,
      this.is_private,
      new GameSettings(
        this.settings_papelito_per_player,
        this.settings_papelito_text_limit,
        this.time_per_turn,
        this.total_rounds
      ),
      new Turn( // remove this from here
        false,
        this.active_player_id,
        this.active_team_id,
        this.papelitos_guessed,
        this.timer_count
      ),
      this.total_rounds,
      new Date(this.created_date)
    )
  }

  static fromRoom (room: Room): FirestoreRoom {
    return new FirestoreRoom(
      room.code,
      room.password,
      room.isPrivate,
      room.round,
      room.activeTurn.activePlayerId,
      room.activeTurn.activeTeamId,
      room.activeTurn.guessedPapelitos,
      room.activeTurn.timerCount,
      room.settings.papelitoPerPlayer,
      room.settings.papelitoTextLimit,
      room.settings.rounds,
      room.settings.timerTurn,
      room.createdDate.toISOString()
    )
  }
}
