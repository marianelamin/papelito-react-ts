class GameSettings {
  id: number
  papelitoPerPlayer: number
  papelitoTextLimit: number
  timerTurn: number
  rounds_number: number

  constructor() {
    this.id = -1
    this.papelitoPerPlayer = 0
    this.papelitoTextLimit = 0
    this.timerTurn = 0
    this.rounds_number = 0
  }

  static fromJson(map: Map<string, any>) {
    console.log(`This is the map: ${map}`)
    let gameSettings = new GameSettings()
    gameSettings.id = map.get('id')
    gameSettings.papelitoPerPlayer = map.get('papelitoPerPlayer')
    gameSettings.papelitoTextLimit = map.get('papelitoTextLimit')
    gameSettings.timerTurn = map.get('timerTurn')
    gameSettings.rounds_number = map.get('rounds_number')
  }
}
export default GameSettings
