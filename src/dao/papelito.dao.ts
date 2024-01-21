import { fs, papelitoRef } from './collection_references'
import { type Papelito } from '../models'
import { FirestorePapelito } from '../models/firestore'

export const getPapelitoDetails = (roomCode: string, papelitoId: string) => {
  console.log(
    `getting papelito details from papelito dao: ${roomCode} and papelitoId: ${papelitoId}`
  )
}

export const createPapelito = (roomCode: string, papelito: Papelito) => {
  const fsPapelito = FirestorePapelito.fromPapelito(papelito)
  console.log('creating papelito from papelito  dao', fsPapelito)
  fs.addDoc(papelitoRef(roomCode), fsPapelito)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id)
      console.log(docRef)
    })
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
}

export const removePapelitoById = async (roomCode: string, id: string) => {
  await fs.deleteDoc(fs.doc(papelitoRef(roomCode), id))
}

export const removePapelitosFromPlayerId = async (roomCode: string, playerId: string) => {
  const batch1 = fs.batch()
  const query = fs.query(papelitoRef(roomCode), fs.where('author_id', '==', playerId))
  const paps = await fs.getDocs(query)
  const allPaps = await fs.getDocs(papelitoRef(roomCode))
  console.log({ paps, allPaps })
  paps.docs.forEach((doc) => {
    console.log({ doc })
    batch1.delete(doc.ref)
  })
  await batch1.commit()
}

export const getPapelitosInBowl = () => {
  console.log('get papelitos in bowl')
}

export const addSinglePapelito = async (
  roomCode: string,
  papelito: Papelito
): Promise<Papelito> => {
  const addedDoc = await fs.addDoc(papelitoRef(roomCode), FirestorePapelito.fromPapelito(papelito))
  console.log('Added pap', addedDoc)
  const retrievedDoc = await fs.getDoc(addedDoc)

  console.log('doc', retrievedDoc)
  const pap = retrievedDoc.data()?.toPapelito(retrievedDoc.id)
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
    return await fs
      .addDoc(papelitoRef(roomCode), FirestorePapelito.fromPapelito(p))
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

export default this
