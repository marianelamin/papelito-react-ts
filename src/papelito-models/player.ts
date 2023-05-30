export interface Player {
  id: string
  name: string
  order: number
  teamId: string
}

export const defaultPlayer: Player = {
  id: '-1',
  name: '',
  order: 0,
  teamId: '-1',
}
