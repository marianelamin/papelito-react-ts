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

export const removePapelitoById = async (roomCode: string, id: string) => {
  return collectionsRef.deleteDoc(
    collectionsRef.doc(collectionsRef.papelitoRef(roomCode), id)
  )
}

export const getPapelitosInBowl = () => {
  console.log(`get papelitos in bowl`)
}

export const addToBowl = async (roomCode: string, papelito: Papelito) => {
  console.log(
    `Use firestore api to send one papelito into the bowl on ${roomCode}`
  )

  return collectionsRef
    .addDoc(
      collectionsRef.papelitoRef(roomCode),
      FirestorePapelito.fromPapelito(papelito)
    )
    .then((addedDoc) => {
      const newPap = addedDoc.id
      console.log(`Added pap`, addedDoc)
      return collectionsRef.getDoc(addedDoc)
    })
    .then((doc) => {
      console.log('doc', doc)
      const pap = doc.data()?.toPapelito()
      if (!pap) {
        throw new Error('Papelito not found')
      } else {
        pap.id = doc.id
        console.log('saved pap', pap)
        return pap
      }
    })
  // addDoc(
  //   collectionsRef.papelitoRef(roomCode),
  //   FirestorePapelito.fromPapelito(papelito)
  // ).then((addedDoc) => {
  //   const newPap = addedDoc.id
  //   console.log(`Added pap`, addedDoc)
  //   // addedDoc.id
  //   // console.log(`Added pap ${papelito.id}`)
  //   return papelito
  // })
}

export const addToBowlInBulk = (roomCode: string, papelitos: Papelito[]) => {
  console.log(
    `Use firestore api to send all this papelitos into the bowl on ${roomCode}`
  )
  console.log('Add this bulk of papelitos to BOWL')

  return papelitos.map((p) => {
    return collectionsRef
      .addDoc(
        collectionsRef.papelitoRef(roomCode),
        FirestorePapelito.fromPapelito(p)
      )
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
