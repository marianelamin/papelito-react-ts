import { PapReactiveKnob } from './common'
import { PapelitoDisplayForExplaining, PapelitoDisplayForGuessing } from './papelito_display'
import { Timer } from '.'

interface PapelitoTurnComponentIO {
  bowlSize: number
  bowlMax: number
}

export const PapelitoTurnComponent = (props: PapelitoTurnComponentIO) => {
  const { bowlSize, bowlMax } = props

  // const hasPapelitoBeenDrawn = () => true
  // const disableDraw = () => bowlSize === 0
  // const disableGuess = () => bowlSize === 0 || !hasPapelitoBeenDrawn()

  return (
    <div>
      <Timer />

      <div>{'Le toca a: <INSERTE NOMBRE DEL EXPLICADOR jajaja>'}</div>
      <p>Numero de papelitos en el bowl</p>
      <PapReactiveKnob label="Bowl----" value={bowlSize} total={bowlMax}></PapReactiveKnob>
      <hr />
      <p>Numero de papelitos adivinados en el turno</p>
      <div>
        <PapelitoDisplayForGuessing />
        <PapelitoDisplayForExplaining
          papelito={{
            id: '',
            text: 'la casa es blanca',
            inBowl: false,
            guessed: false
          }}
        />
      </div>
    </div>
  )
}
