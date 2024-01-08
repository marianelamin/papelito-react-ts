import * as collectionsRef from './collection_references'
import { type Papelito } from '../models'
import { FirestorePapelito } from '../models/firestore'

export const getPapelitoDetails = (roomCode: string, papelitoId: string) => {
  console.log(
    `getting papelito details from papelito dao: ${roomCode} and papelitoId: ${papelitoId}`
  )
}

export const createPapelito = (roomCode: string, papelito: Papelito) => {
  const fsPapelito = new FirestorePapelito(
    papelito.text,
    papelito.guessed,
    papelito.inBowl,
    papelito.author?.id
  )
  console.log('creating papelito from papelito  dao')
  collectionsRef
    .addDoc(collectionsRef.papelitoRef(roomCode), fsPapelito)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id)
      console.log(docRef)
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
}

export const removePapelitoById = async (roomCode: string, id: string) => {
  await collectionsRef.deleteDoc(collectionsRef.doc(collectionsRef.papelitoRef(roomCode), id))
}

export const getPapelitosInBowl = () => {
  console.log('get papelitos in bowl')
}

export const addSinglePapelito = async (
  roomCode: string,
  papelito: Papelito
): Promise<Papelito> => {
  const addedDoc = await collectionsRef.addDoc(
    collectionsRef.papelitoRef(roomCode),
    FirestorePapelito.fromPapelito(papelito)
  )
  console.log('Added pap', addedDoc)
  const retrievedDoc = await collectionsRef.getDoc(addedDoc)

  console.log('doc', retrievedDoc)
  const pap = retrievedDoc.data()?.toPapelito()
  if (!pap) {
    throw new Error('Papelito not found')
  } else {
    pap.id = retrievedDoc.id
    console.log('saved pap', pap)
    return pap
  }
}

export const addToBowl = async (roomCode: string, papelitos: Papelito[]): Promise<Papelito[]> => {
  return await Promise.all(
    papelitos.map(async (papelito) => await addSinglePapelito(roomCode, papelito))
  )
}

export const addToBowlInBulk = (roomCode: string, papelitos: Papelito[]) => {
  console.log(`Use firestore api to send all this papelitos into the bowl on ${roomCode}`)
  console.log('Add this bulk of papelitos to BOWL')

  return papelitos.map(async (p) => {
    return await collectionsRef
      .addDoc(collectionsRef.papelitoRef(roomCode), FirestorePapelito.fromPapelito(p))
      .then((addedDoc) => {
        p.id = addedDoc.id
        console.log(`Added pap ${p.id}`)
        return true
      })
      .catch((error) => {
        console.error('Error adding papelito: ', error)
        return false
      })
  })
}

// export const drawOnePapelito = (roomCode: string): Papelito => {
//   console.log(`draw one papelito from roomId: ${roomCode}`)
//   let ref = collectionsRef.doc(collectionsRef.papelitoRef(roomCode))

//   return new Papelito('Hardcoded pepelito')
// }
// export const putBackPapelito = (
//   roomCode: string,
//   papelitoId: string
// ): boolean => {
//   console.log(`putBackPapelito on roomId: ${roomCode}`)
//   let ref = collectionsRef.doc(collectionsRef.papelitoRef(roomCode))

//   // update something

//   return true
// }
// export const disputePapelito = (
//   roomCode: string,
//   papelitoID: string
// ): Papelito => {
//   console.log(`disputing a papelito (${papelitoID}) from roomId: ${roomCode}`)
//   let ref = collectionsRef.doc(collectionsRef.papelitoRef(roomCode))

//   // update something

//   return new Papelito('Some papelito text')
// }

export default this
