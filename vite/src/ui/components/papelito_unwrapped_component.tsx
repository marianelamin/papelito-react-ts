import { type Papelito } from '../../papelito-models'

interface PapelitoUnwrappedComponentIO {
  papelito: Papelito | undefined
  showPapelito?: boolean // prob no going to be used
}

const PapelitoUnwrappedComponent = (props: PapelitoUnwrappedComponentIO) => {
  const { papelito } = props

  return papelito !== undefined ? (
    <div>
      <p>{papelito.text}</p>
      <span>[{papelito.id}] - </span>
      <span>({papelito.guessed ? 'true' : 'false'})</span>
    </div>
  ) : (
    <div>nothing to show yet</div>
  )
}

export { PapelitoUnwrappedComponent }
