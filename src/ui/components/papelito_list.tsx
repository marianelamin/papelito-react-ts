import { Papelito } from 'ui/models/all_models'
import react from 'react'

interface PapelitoListComponentIO {
  papelitoList: Papelito[]
  onDeleteItem: Function
  onSendToBowl: Function
}

const PapelitoListComponent = (props: PapelitoListComponentIO) => {
  return (
    <div>
      <h2>Papelitos List</h2>
      <ol>
        {props.papelitoList.map((papelito) => (
          <li key={papelito.id}>
            <div>
              {papelito.id} ({papelito.guessed ? 'guessed' : 'not guessed'}) -{' '}
              {papelito.text} -
              <button onClick={() => props.onDeleteItem(papelito)}>Del</button>
              <button onClick={() => props.onSendToBowl(papelito)}>
                Throw in Bowl
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export { PapelitoListComponent }
