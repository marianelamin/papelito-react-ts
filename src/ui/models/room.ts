import { Papelito, Team, ActiveTurn, GameSettings } from './all_models'

class Room {
  id: string
  bowl: Papelito[]
  password: string
  private: boolean
  round: number
  activeTurn: ActiveTurn
  settings: GameSettings
  teams: Team[]

  constructor() {
    this.id = '-1'
    this.bowl = []
    this.password = ''
    this.private = false
    this.settings = new GameSettings()
    this.activeTurn = new ActiveTurn()
    this.round = 1
    this.teams = []
  }

  static fromJson(map: Map<string, any>) {
    console.log(`This is the map: ${map}`)
    let newRoom = new Room()
    newRoom.id = map.get('id')
    newRoom.bowl = map.get('bowl')
    newRoom.password = map.get('password')
    newRoom.private = map.get('private')
    newRoom.settings = map.get('settings')
    newRoom.round = map.get('round')
    newRoom.teams = map.get('teams')
  }
}
export default Room
