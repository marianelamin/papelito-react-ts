import { Papelito } from 'ui/models/all_models'

const fetchAllPapelitos = (roomId: string) => {
  // TODO: dispatch fetch all papelitos action
  console.log(`room requested: ${roomId}...`)
  return [
    new Papelito(`room es ${roomId}`),
    new Papelito('hola'),
    new Papelito('la cosa esta difcil 2'),
    new Papelito('la tercera es la vencida'),
  ]
}
const addPapelito = (roomId: string, papelito: Papelito) => {
  // add papelito action
}
const removePapelito = (roomId: string, papelito: Papelito) => {
  // TODO: remove papelito
}

const guessPapelito = (roomId: string, papelito: Papelito) => {
  // TODO: mark the guessed boolean as true
}

export default { fetchAllPapelitos, addPapelito, removePapelito, guessPapelito }
