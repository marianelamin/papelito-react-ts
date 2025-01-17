import { useState } from 'react'
import { useRoom } from '../../../../../hooks'
import { defaultPlayer, Player, Team } from '../../../../../models'
import { useTimer } from '.'
import { Round } from '../../../../../models/round.interface'
import { Turn } from '../../../../../models/turn.interface'

/** @todo: hacer un objeto que se contenga informacion que esta constantemente cambiando
 * puede llamarse partida.
 *
 * temporizador
 * papelito escondido, y cuando lo adivinan aparece en pantalla
 * numero de adivinados,
 * numero de papelitos por adivinar
 * jugador anterior,
 * ugador actual,
 * proximo al bate
 * numero de ronda
 * scores de equipos
 *
 *
 */

const activeTeam: Team = {
  id: 'team123B',
  name: 'B',
  order: 3,
  score: 0, // not going to be used
  players: [] // not going to be used
}
const activePlayer: Player = {
  name: 'Test Player',
  id: 'CgwkSzKPFK1Oy9I37a6a',
  teamId: 'team123B',
  order: 0,
  colorNumber: 0,
  isAdmin: false,
  hasSubmittedPapelitos: false
}

const turn: Turn = {
  team: activeTeam,
  presenter: activePlayer,
  papelitos: [],
  timerCount: 0
}
const round: Round = {
  id: '0',
  turns: [
    {
      team: {
        id: 'team123A',
        name: 'A',
        order: 0,
        score: 0, // not going to be used
        players: [] // not going to be used
      },
      presenter: {
        name: 'Player 1',
        id: '',
        teamId: 'team123A',
        order: 0,
        colorNumber: 0,
        isAdmin: false,
        hasSubmittedPapelitos: false
      },
      papelitos: [
        {
          id: '',
          isCurrentlyDrawn: true,
          guessed: true,
          text: '',
          inBowl: false
        }
      ],
      timerCount: 0
    }
  ],
  stats: [{ id: '1', team: new Team(), score: 2 }]
}

export const useGame = () => {
  const { room } = useRoom()
  const { timer } = useTimer()

  const [activeRound, setActiveRound] = useState<Round>(round)
  const [activeTurn, setActiveTurn] = useState<Turn>(turn)

  setActiveRound({
    id: 'string',
    turns: [],
    stats: [{ id: 'stringId', team: new Team(), score: 1 }]
  })
  setActiveTurn({ team: new Team(), presenter: defaultPlayer, papelitos: [], timerCount: 0 })
  return {
    room,
    activeTurn,
    activeRound,
    timer,
    hasGameStarted: room?.hasGameStarted
  }
}
