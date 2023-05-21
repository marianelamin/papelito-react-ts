import { MapAndClone } from 'dao/firebase_helpers'

class Turn implements MapAndClone<Turn> {
  constructor(
    public active: boolean,
    public activePlayerId: string = '-1',
    public activeTeamId: string = '-1',
    public guessedPapelitos: number = 0,
    public timerCount: number = 60
  ) {}

  toMap() {
    return {
      active: this.active,
      activePlayerId: this.activePlayerId,
      activeTeamId: this.activeTeamId,
      guessedPapelitos: this.guessedPapelitos,
      timerCount: this.timerCount,
    }
  }
}

export default Turn
