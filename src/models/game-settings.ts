export class GameSettings {
  constructor (
    public isPrivate: boolean = false,
    public papelitoPerPlayer: number = 3,
    public papelitoTextLimit: number = 140,
    public timerTurn: number = 60,
    public rounds: number = 3,
  ) {}

  static fromJson (map: Map<string, any>) {
    console.log(`This is the map: ${map}`)
    const gameSettings = new GameSettings()
    gameSettings.papelitoPerPlayer = map.get('papelitoPerPlayer')
    gameSettings.papelitoTextLimit = map.get('papelitoTextLimit')
    gameSettings.timerTurn = map.get('timerTurn')
    gameSettings.rounds = map.get('rounds')
  }
}
