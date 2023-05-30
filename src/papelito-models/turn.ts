export class Turn {
  constructor(
    public active: boolean,
    public activePlayerId: string = '-1',
    public activeTeamId: string = '-1',
    public guessedPapelitos: number = 0,
    public timerCount: number = 60
  ) {}
}
