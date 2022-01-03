import * as collectionsRef from './collection_references'
import { Player, Papelito } from 'papelito-models'
import { FirestorePapelito } from 'papelito-models/firestore'

export const getPapelitoDetails = (roomCode: string, papelitoId: string) => {
  console.log(
    `getting papelito details from papelito dao: ${roomCode} and papelitoId: ${papelitoId}`
  )
}

export const createPapelito = (roomCode: string, papelito: Papelito) => {
  const fsPapelito = new FirestorePapelito(
    papelito.text,
    papelito.author.id,
    papelito.guessed,
    papelito.inBowl
  )
  console.log(`creating papelito from papelito  dao`)
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

export const getPapelitosInBowl = () => {
  console.log(`get papelitos in bowl`)
}

export const addToBowl = (roomId: string, papelitos: Papelito[]) => {
  console.log(
    `Use firestore api to send all this papelitos into the bowl on ${roomId}`
  )
  console.log('Add this bulk of papelitos to BOWL')
  console.log(papelitos)

  let ref = collectionsRef.doc(collectionsRef.papelitoRef(roomId))
  // ADD THE PAPELITOS HERE.. ON A FOORLOOP OR ON BULK..
  // SIMON IS WHINING
  // .then((docRef) => {
  //   console.log('Document written with ID: ', docRef.id)
  //   console.log(docRef)
  // })
  // .catch((error) => {
  //   console.error('Error adding document: ', error)
  // })
}

export const drawOnePapelito = (roomCode: string): Papelito => {
  console.log(`draw one papelito from roomId: ${roomCode}`)
  let ref = collectionsRef.doc(collectionsRef.papelitoRef(roomCode))

  return new Papelito('Some papelito text')
}
export const putBackPapelito = (
  roomCode: string,
  papelitoId: string
): boolean => {
  console.log(`putBackPapelito on roomId: ${roomCode}`)
  let ref = collectionsRef.doc(collectionsRef.papelitoRef(roomCode))

  // update something

  return true
}
export const disputePapelito = (
  roomCode: string,
  papelitoID: string
): Papelito => {
  console.log(`disputing a papelito (${papelitoID}) from roomId: ${roomCode}`)
  let ref = collectionsRef.doc(collectionsRef.papelitoRef(roomCode))

  // update something

  return new Papelito('Some papelito text')
}

export default this
