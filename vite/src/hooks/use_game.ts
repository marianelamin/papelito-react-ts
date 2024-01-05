// import { useEffect, useState } from 'react'

import {} from '../papelito-models'
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

export const useGame = (roomId: string) => {
  console.warn('implement hook', roomId)
  // const [isFetching, setIsFetching] = useState<boolean>(false)
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

  return [true, true]
}
