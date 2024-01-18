export interface PapelitoClock {
  countDown: number
  status: 'in-progress' | 'paused' | 'reset'
}
