import { useEffect, useState } from 'react'
import { Papelito } from '../../../../../models'
import { db, doc, onSnapshot } from '../../../../../dao'
import { papelitoRef } from '../../../../../dao/collection_references'

const papelitosInBowl: Papelito[] = [
  {
    id: '0',
    text: 'Daddy plays start craft 2',
    inBowl: false,
    guessed: true
  },
  {
    id: '1',
    text: 'simon esta pidiendo algo',
    inBowl: true,
    guessed: false
  },
  {
    id: '2',
    text: 'Simoncito habla con papa',
    inBowl: true,
    guessed: false
  },
  {
    id: '3',
    text: 'Ver el Arrow',
    inBowl: true,
    guessed: false
  }
]

const drawn: Papelito = {
  id: 'as',
  text: `Waisting John's time`,
  inBowl: false,
  guessed: true
}

export const usePapelitos = (roomId?: string) => {
  const [bowl, setBowl] = useState<Papelito[]>(papelitosInBowl)

  useEffect(() => {
    let unsubscribe: () => void

    if (roomId) {
      console.info('-\n\nThis is custom Papelito hook\n\n\n-', `roomId: ${roomId}`)
      unsubscribe = onSnapshot(
        // doc(db, 'gamePlayers', playerId),
        doc(papelitoRef(roomId)),
        (document) => {
          console.log(`Received doc snapshot: `, document)
          console.log(`Received doc snapshot: `, document.data())
          console.log(`Received doc snapshot: `, document.id)

          // let r = (document.data() as FirestorePlayer).toPlayer()
          // console.log(r instanceof Player)
          // console.log(r)
          // setPlayer(r)
          // setIsFetching(true)

          // let newPlayerRaw = { ...document.data(), id: document.id }
          // newPlayerRaw['id'] = playerId

          // console.log(newPlayerRaw)
          // if (document.exists) console.log(`here is the Player:  ${newPlayerRaw}`)
          // setPlayer(newPlayerRaw)
          // else console.log('Player Not Found')
          // if (isFetching) setIsFetching(false)
        },
        (error) => console.error('aqui esta el error pues: \n', error),
        () => {
          console.info('Finished!!!')
        }
      )
    }

    return () => {
      !!unsubscribe && unsubscribe()
    }
  }, [roomId])
  return { bowl }
}
