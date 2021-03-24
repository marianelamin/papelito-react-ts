import { Papelito } from 'ui/models/all_models'
import react from 'react'

interface PapelitoListIO {
  papelitoList: Papelito[]
  deletePapelito: Function
}

const PapelitoList = (props: PapelitoListIO) => {
  return (
    <div>
      <h2>Papelitos List</h2>
      <ol>
        {props.papelitoList.map((papelito, index) => (
          <li key={index}>
            <div>
              {papelito.id} ({papelito.guessed ? 'guessed' : 'not guessed'}) -{' '}
              {papelito.text} -
              <button onClick={() => props.deletePapelito(index)}>Del</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export { PapelitoList }
