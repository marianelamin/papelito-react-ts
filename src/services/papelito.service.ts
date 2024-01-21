import * as papelitoDao from '../dao/papelito.dao'
import { Papelito, defaultPapelito } from '../models'

export const fetchAllPapelitos = (roomId: string) => {
  // TODO: dispatch fetch all papelitos action
  console.log(`room requested: ${roomId}...`)
  return [
    { ...defaultPapelito, id: '12', text: `room es ${roomId}` },
    { ...defaultPapelito, id: 'adf3', text: 'hola' },
    { ...defaultPapelito, id: '234', text: 'la cosa esta difcil 2' },
    { ...defaultPapelito, id: '232', text: 'la tercera es la vencida' }
  ]
}
export const addPapelito = (roomId: string, papelito: Papelito) => {
  throw new Error(`implement: ${JSON.stringify({ papelito, roomId })}`)
  // add papelito action
}
export const removePapelito = (roomId: string, papelito: Papelito) => {
  // TODO: remove papelito
  throw new Error(`implement: ${JSON.stringify({ papelito, roomId })}`)
}

export const guessPapelito = (roomId: string, papelito: Papelito) => {
  // TODO: mark the guessed boolean as true
  throw new Error(`implement: ${JSON.stringify({ papelito, roomId })}`)
}

export const addToBowl = async (roomId: string, papelitos: Papelito[]) => {
  return await papelitoDao.addToBowl(roomId, papelitos)
  // return papelitoDao.addToBowl(roomId, papelitos)
}

// bowl type of services

// export const drawOnePapelito = (roomId: string) =>
//   papelitoDao.drawOnePapelito(roomId)

// export const putBackPapelito = (roomId: string, papelitoId: string) =>
//   papelitoDao.putBackPapelito(roomId, papelitoId)

// export const disputePapelito = (roomId: string, papelitoId: string) =>
//   papelitoDao.disputePapelito(roomId, papelitoId)

export default this
