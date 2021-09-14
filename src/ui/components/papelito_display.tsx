import react, { useState } from 'react'
import { Papelito } from '../models/all_models'

interface PapelitoDisplayComponentIO {
  papelito: Papelito | undefined
  showPapelito?: boolean // prob no going to be used
}

const PapelitoDisplayComponent = (props: PapelitoDisplayComponentIO) => {
  return props.papelito !== undefined ? (
    <div>
      <p>{props.papelito.text}</p>
      <span>[{props.papelito.id}] - </span>
      <span>({props.papelito.guessed ? 'true' : 'false'})</span>
    </div>
  ) : (
    <div>nothing to show yet</div>
  )
}

export { PapelitoDisplayComponent }
