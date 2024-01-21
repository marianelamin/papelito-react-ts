import { Turn } from '.'
import { Round } from './round.interface'

export const defaultGame: Game = {
  id: 'gameStatus',
  hasGameStarted: false,
  activeTurn: new Turn(false),
  activeRound: {
    id: '',
    turns: [],
    stats: []
  }
}

export interface Game {
  id: string
  hasGameStarted: boolean
  activeTurn: Turn
  activeRound: Round
}

export function clone(item: Game): Game {
  return {
    id: item.id,
    hasGameStarted: item.hasGameStarted,
    activeTurn: item.activeTurn,
    activeRound: item.activeRound
  }
}
