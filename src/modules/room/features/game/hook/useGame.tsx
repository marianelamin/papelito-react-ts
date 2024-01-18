// import { useEffect, useState } from 'react'

import { useCallback, useState } from 'react'
import { useRoom } from '../../../../../hooks'
import { Papelito, Player, Team } from '../../../../../models'
import { usePapelitos, useTimer } from '.'
// import { db, doc, onSnapshot } from '../dao'

// import { playersRef } from '../dao/collection_references'

/** @todo: hacer un objeto que se contenga informacion que esta constantemente cambiando
 * puede llamarse partida.
 *
 * temporizador
 * scores de equipos
 * papelito escondido, y cuando lo adivinan aparece en pantalla
 * numero de ronda
 * jugador anterior,
 * ugador actual,
 * proximo al bate
 * numero de adivinados,
 * numero de papelitos por adivinar
 *
 *
 */

interface Round {
  id: string
  turns: Turn[]
  stats: { id: string; team: Team; score: number }[]
}
interface Turn {
  team: Team
  presenter: Player
  papelitos: Papelito[]
  timerCount: number
}

const activeTeam: Team = {
  id: 'team123B',
  name: 'B',
  order: 3,
  score: 0, // not going to be used
  players: [] // not going to be used
}
const activePlayer: Player = {
  name: 'Test Player',
  id: 'VdQqt9ref2ibEzfaGx6w',
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

const drawPapelitoFromBowl = (bowl: Papelito[]) => {
  const available = bowl.filter((p) => !p.guessed)
  const index = Math.floor(Math.random() * available.length)
  return available[index]
}

export const useGame = () => {
  const { room } = useRoom()
  const { bowl } = usePapelitos(room?.id)
  const { timer } = useTimer()

  const [activeRound, setActiveRound] = useState<Round>(round)
  const [activeTurn, setActiveTurn] = useState<Turn>(turn)

  // const [drawnPapelito, setDrawnPapelito] = useState<Papelito | undefined>(drawn)
  const [drawnPapelito, setDrawnPapelito] = useState<Papelito | undefined>()

  const drawPapelito = useCallback(() => {
    console.log('drawPapelito')
    const drawn = drawPapelitoFromBowl(bowl)
    setDrawnPapelito(drawn)
    // todo: mark papelito as current
  }, [bowl])

  const markAsGuessed = useCallback(() => {
    console.log('markAsGuessed')
    console.log({ drawnPapelito })
    // todo: mark as guessed and update the bowl
    // todo: push to the papelitos in active turn
    setDrawnPapelito(undefined)
  }, [])

  const disputePapelito = useCallback(() => {
    console.log('dispute')
    console.log({ drawnPapelito })
    // todo: mark as guessed and update the bowl
    // todo: push to the papelitos in active turn
  }, [])

  // useEffect(() => {
  //   console.info('-\n\nThis is custom Player hook\n\n\n-', `roomId: ${roomId}`)
  //   const unsubscribe = onSnapshot(
  //     // doc(db, 'gamePlayers', playerId),
  //     doc(playersRef(roomId)),
  //     (document) => {
  //       console.log(`Received doc snapshot: `, document)
  //       console.log(`Received doc snapshot: `, document.data())
  //       console.log(`Received doc snapshot: `, document.id)

  //       // let r = (document.data() as FirestorePlayer).toPlayer()
  //       // console.log(r instanceof Player)
  //       // console.log(r)
  //       // setPlayer(r)
  //       // setIsFetching(true)

  //       // let newPlayerRaw = { ...document.data(), id: document.id }
  //       // newPlayerRaw['id'] = playerId

  //       // console.log(newPlayerRaw)
  //       // if (document.exists) console.log(`here is the Player:  ${newPlayerRaw}`)
  //       // setPlayer(newPlayerRaw)
  //       // else console.log('Player Not Found')
  //       // if (isFetching) setIsFetching(false)
  //     },
  //     (error) => console.error('aqui esta el error pues: \n', error),
  //     () => {
  //       console.info('Finished!!!')
  //     }
  //   )

  //   return () => {
  //     unsubscribe()
  //   }
  // }, [roomId, isFetching])

  return {
    room,
    activeTurn,
    activeRound,
    timer,
    bowl,
    hasGameStarted: room?.hasGameStarted,
    drawnPapelito,
    disputePapelito,
    drawPapelito,
    markAsGuessed
  }
}
