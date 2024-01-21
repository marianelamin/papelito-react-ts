import { useCallback, useEffect, useMemo, useState } from 'react'
import { Papelito } from '../../../../../models'
import { papelitoRef, fs } from '../../../../../dao/collection_references'
import { FirestorePapelito } from '../../../../../models/firestore'
import { useUser } from '../../../../core/user/context'

const drawPapelitoFromBowl = (bowl: Papelito[]) => {
  const available = bowl.filter((p) => !p.guessed)
  const index = Math.floor(Math.random() * available.length)
  return available[index]
}

export const useBowl = () => {
  const { room } = useUser()
  const [bowl, setBowl] = useState<Papelito[]>([])
  const [drawnPapelito, setDrawnPapelito] = useState<Papelito>()

  const availableToDraw = useMemo(() => bowl.filter((p) => !p.guessed), [bowl])
  const drawPapelito = useCallback(async () => {
    console.log('drawPapelito')
    console.log({ bowl })
    const drawn = drawPapelitoFromBowl(bowl)

    await fs.updateDoc(fs.doc(papelitoRef(room?.id!), drawn?.id), {
      is_currently_drawn: true
    })
    setDrawnPapelito(drawn)
  }, [bowl])

  const markAsGuessed = useCallback(async () => {
    console.log('markAsGuessed')
    console.log({ drawnPapelito })
    await fs.updateDoc(fs.doc(papelitoRef(room?.id!), drawnPapelito?.id), {
      is_currently_drawn: null,
      is_guessed: true
    })
    setDrawnPapelito(undefined)
    // todo: push to the papelitos in active turn
  }, [drawnPapelito])

  const disputePapelito = useCallback(() => {
    console.log('dispute')
    console.log({ drawnPapelito })
    // todo: mark as disputed and update the bowl
    // todo: push to the papelitos in active turn
  }, [drawnPapelito])

  useEffect(() => {
    let unsubscribe: () => void

    if (room?.id!) {
      console.info(`Bowl hook - roomId: ${room?.id!}`)
      const collection = fs.query(papelitoRef(room?.id!))
      unsubscribe = fs.onSnapshot(
        collection,
        (docs) => {
          console.log(`document [papelitos]: `, docs)
          const res: Papelito[] = []
          docs.forEach((d) => {
            const p = (d.data() as FirestorePapelito).toPapelito(d.id)
            res.push(p)
            if (p.isCurrentlyDrawn) setDrawnPapelito(p)
          })
          setBowl(res)
          console.log({ res })
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
  }, [room?.id!])

  return { availableToDraw, bowl, drawnPapelito, drawPapelito, markAsGuessed, disputePapelito }
}
