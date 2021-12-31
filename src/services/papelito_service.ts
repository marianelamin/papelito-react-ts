import { Papelito } from 'papelito-models'

export const fetchAllPapelitos = (roomId: string) => {
  // TODO: dispatch fetch all papelitos action
  console.log(`room requested: ${roomId}...`)
  return [
    new Papelito('12', `room es ${roomId}`),
    new Papelito('adf3', 'hola'),
    new Papelito('234', 'la cosa esta difcil 2'),
    new Papelito('232', 'la tercera es la vencida'),
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

export default this
