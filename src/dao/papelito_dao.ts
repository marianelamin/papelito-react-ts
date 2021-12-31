import * as collectionsRef from './collection_references'
import { Player, Papelito } from 'papelito-models'
import { FirestorePapelito } from 'papelito-models/firestore'

export const getPapelitoDetails = (roomCode: string) => {
  console.log(`getting papelito details from papelito dao: ${roomCode}`)
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

export default this
