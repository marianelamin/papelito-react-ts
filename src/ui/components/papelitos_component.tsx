import { AddPapelitoComponent } from './add_papelito'
import { PapelitoListComponent } from './papelito_list'

const PapelitosComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '1rem',
      }}
    >
      <PapelitoListComponent />
      <AddPapelitoComponent />
    </div>
  )
}

export { PapelitosComponent }
