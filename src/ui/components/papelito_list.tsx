import { useState } from 'react'
import { Papelito } from 'papelito-models'
import { PapButton } from './common'
import { PapelitoDisplayComponent } from './papelito-display'

interface PapelitoListComponentIO {
  papelitoList: Papelito[]
  onDeleteItem: Function
  onSendToBowl: (item: Papelito) => void
}

const PapelitoListComponent = (props: PapelitoListComponentIO) => {
  const { onSendToBowl, onDeleteItem, papelitoList } = props
  return (
    <div>
      <h2>My list of Papelitos</h2>
      <ol>
        {papelitoList.map((papelito) => (
          <li key={papelito.id}>
            <div>
              <PapelitoDisplayComponent
                papelito={papelito}
                footerActions={
                  <PapButton
                    icon="pi pi-trash"
                    onClick={() => onDeleteItem(papelito)}
                  ></PapButton>
                }
              ></PapelitoDisplayComponent>
            </div>
          </li>
        ))}
      </ol>
      <PapButton
        disabled={papelitoList.length === 0}
        icon="pi pi-send"
        onClick={() => onSendToBowl(papelitoList[0])}
      ></PapButton>
    </div>
  )
}

export { PapelitoListComponent }
