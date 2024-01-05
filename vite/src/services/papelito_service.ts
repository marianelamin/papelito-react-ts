import * as papelitoDao from '../dao/papelito_dao'
import { Papelito } from '../papelito-models'

export const fetchAllPapelitos = (roomId: string) => {
  // TODO: dispatch fetch all papelitos action
  console.log(`room requested: ${roomId}...`)
  return [
    new Papelito('12', `room es ${roomId}`),
    new Papelito('adf3', 'hola'),
    new Papelito('234', 'la cosa esta difcil 2'),
    new Papelito('232', 'la tercera es la vencida')
  ]
}
export const addPapelito = (roomId: string, papelito: Papelito) => {
  // add papelito action
}
export const removePapelito = (roomId: string, papelito: Papelito) => {
  // TODO: remove papelito
}

export const guessPapelito = (roomId: string, papelito: Papelito) => {
  // TODO: mark the guessed boolean as true
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
