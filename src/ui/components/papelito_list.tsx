import { Papelito } from 'papelito-models'
import react from 'react'

interface PapelitoListComponentIO {
  papelitoList: Papelito[]
  onDeleteItem: Function
  onSendToBowl: Function
}

const PapelitoListComponent = (props: PapelitoListComponentIO) => {
  return (
    <div>
      <h2>My list of Papelitos</h2>
      <ol>
        {props.papelitoList.map((papelito) => (
          <li key={papelito.id}>
            <div>
              {papelito.id} ({papelito.guessed ? 'guessed' : 'not guessed'}) -{' '}
              {papelito.text} -
              <button onClick={() => props.onDeleteItem(papelito)}>Del</button>
            </div>
          </li>
        ))}
      </ol>
      <button onClick={() => props.onSendToBowl(props.papelitoList)}>
        Throw ALL in Bowl
      </button>
    </div>
  )
}

export { PapelitoListComponent }
