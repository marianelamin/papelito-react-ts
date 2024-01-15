export interface Player {
  name: string
  id: string
  teamId: string
  order: number
  colorNumber: number
  isAdmin: boolean
  hasSubmittedPapelitos: boolean
}

export const defaultPlayer: Player = {
  name: '',
  id: '-1',
  teamId: '-1',
  order: 0,
  colorNumber: 1,
  isAdmin: false,
  hasSubmittedPapelitos: false
}
