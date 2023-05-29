import { Papelito } from 'papelito-models'
import { PapButton } from './common'
import { PapCard } from './common/pap-card'

interface PapelitoDisplayComponentIO {
  papelito: Papelito
  footerActions?: React.ReactNode
}
const PapelitoDisplayComponent = (props: PapelitoDisplayComponentIO) => {
  const { papelito, footerActions } = props

  const footerActions1 = (
    <div>
      <PapButton
        icon="pi pi-trash"
        onClick={() => console.log('erase')}
      ></PapButton>
      <PapButton
        icon="pi pi-send"
        onClick={() => console.log('throw in bowl')}
      ></PapButton>
      <PapButton
        icon="pi pi-user"
        onClick={() => console.log('guessed')}
      ></PapButton>
      <PapButton
        icon="pi pi-deny"
        onClick={() => console.log('dispute')}
      ></PapButton>
      <PapButton
        icon="pi pi-home"
        onClick={() => console.log('pass')}
      ></PapButton>
    </div>
  )

  return (
    <>
      <PapCard
        header={`In bowl: ${papelito.inBowl ? 'Yes' : 'Not yet'}`}
        footer={footerActions}
      >
        {papelito.text}
      </PapCard>
    </>
  )
}

export { PapelitoDisplayComponent }
