// import { useEffect, useState } from 'react'

import { useState } from 'react'
import { useRoom } from '.'
import { Papelito, Player, Team } from '../models'
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

interface PapelitoClock {
  countDown: number
  status: 'in-progress' | 'paused' | 'reset'
}
interface Round {
  id: number
  turns: Turn[]
  stats: { team: Team; score: number }[]
}
interface Turn {
  team: Team
  presenter: Player
  papelitos: Papelito[]
  timerCount: number
}

const timer: PapelitoClock = {
  countDown: 0,
  status: 'paused'
}

const activeTeam: Team = {
  id: 'team123',
  name: '',
  order: 3,
  score: 0, // not going to be used
  players: [] // not going to be used
}
const activePlayer: Player = {
  name: 'Test Player',
  id: 'player123',
  teamId: 'team123',
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
  id: 0,
  turns: [turn],
  stats: [{ team: new Team(), score: 2 }]
}

export const useGame = () => {
  const { room } = useRoom()

  const [activeRound, setactiveRound] = useState<Round>(round)
  const [activeTurn, setActiveTurn] = useState<Turn>(turn)
  // const [player, setPlayer] = useState<Player>()

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

  return { room, activeTurn, activeRound, timer }
}
