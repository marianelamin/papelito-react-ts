import { Team } from '.'
import { Turn } from './turn.interface'

export interface Round {
  id: string
  turns: Turn[]
  stats: { id: string; team: Team; score: number }[]
}

export function clone(item: Round): Round {
  return {
    id: item.id,
    turns: item.turns,
    stats: item.stats
  }
}
