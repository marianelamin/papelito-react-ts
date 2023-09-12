export interface Player {
  id: string
  name: string
  order: number
  teamId: string
  colorNumber: number
  hasSubmittedPapelitos: boolean
}

export const defaultPlayer: Player = {
  id: '-1',
  name: '',
  order: 0,
  teamId: '-1',
  colorNumber: 1,
  hasSubmittedPapelitos: false,
}
