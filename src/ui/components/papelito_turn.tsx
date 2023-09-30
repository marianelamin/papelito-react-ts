import { PapReactiveKnob } from './common'
import { PapelitoDisplayForGuessing } from './papelito_display_guessing'
import { Timer } from 'ui/components'

interface PapelitoTurnComponentIO {
  bowlSize: number
  bowlMax: number
}

export const PapelitoTurnComponent = (props: PapelitoTurnComponentIO) => {
  const { bowlSize, bowlMax } = props

  const hasPapelitoBeenDrawn = () => true
  const disableDraw = () => bowlSize === 0
  const disableGuess = () => bowlSize === 0 || !hasPapelitoBeenDrawn()

  return (
    <div>
      <Timer />

      <div>{`Le toca a: <INSERTE NOMBRE DEL EXPLICADOR jajaja>`}</div>
      <p>Numero de papelitos en el bowl</p>
      <PapReactiveKnob
        label="Bowl----"
        value={bowlSize}
        total={bowlMax}
      ></PapReactiveKnob>
      <hr />
      <p>Numero de papelitos adivinados en el turno</p>
      <div>
        <PapelitoDisplayForGuessing />
      </div>
      <hr />
    </div>
  )
}
