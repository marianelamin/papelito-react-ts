import { MapAndClone } from 'dao/firebase_helpers'
import { Room } from 'papelito-models'
import GameSettings from 'papelito-models/game_settings'
import Turn from 'papelito-models/turn'

// should be firestore objects only, no custom classes

export class FirestoreRoom implements MapAndClone<FirestoreRoom> {
  id: string = '-1'

  constructor(
    public code: string,
    public password: string,
    public is_room_private_room: boolean,
    public active_round_number: number, //** @todo: should remove */

    public active_player_id: string, //** @todo: should remove */
    public active_team_id: string, //** @todo: should remove */
    public papelitos_guessed: number, //** @todo: should remove */
    public timer_count: number, //** @todo: should remove */

    public settings_papelito_per_player: number,
    public settings_papelito_text_limit: number,
    public total_rounds: number,
    public time_per_turn: number
  ) {}

  toMap() {
    return {
      code: this.code,
      password: this.password,
      is_room_private_room: this.is_room_private_room,
      active_round_number: this.active_round_number,

      active_player_id: this.active_player_id,
      active_team_id: this.active_team_id,
      papelitos_guessed: this.papelitos_guessed,
      timer_count: this.timer_count,

      settings_papelito_per_player: this.settings_papelito_per_player,
      settings_papelito_text_limit: this.settings_papelito_text_limit,
      total_rounds: this.total_rounds,
      time_per_turn: this.time_per_turn,
    }
  }

  static clone(item: FirestoreRoom): FirestoreRoom {
    let c = new FirestoreRoom(
      item.code,
      item.password,
      item.is_room_private_room,
      item.active_round_number,
      item.active_player_id,
      item.active_team_id,
      item.papelitos_guessed,
      item.timer_count,
      item.settings_papelito_per_player,
      item.settings_papelito_text_limit,
      item.total_rounds,
      item.time_per_turn
    )

    c.id = item.id

    return c
  }

  toRoom(): Room {
    return new Room(
      this.id,
      this.code,
      this.password,
      this.is_room_private_room,
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
      this.total_rounds
    )
  }

  static fromRoom(room: Room): FirestoreRoom {
    return new FirestoreRoom(
      room.code,
      room.password,
      room.privateRoom,
      room.round,
      room.activeTurn.activePlayerId,
      room.activeTurn.activeTeamId,
      room.activeTurn.guessedPapelitos,
      room.activeTurn.timerCount,
      room.settings.papelitoPerPlayer,
      room.settings.papelitoTextLimit,
      room.settings.rounds,
      room.settings.timerTurn
    )
  }
}
