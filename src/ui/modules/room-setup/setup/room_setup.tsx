import { useCallback, useState } from 'react'
import { Steps } from 'primereact/steps'

import { useSelector } from 'react-redux'

import { PapelitosComponent, Instructions, RoomDetails, Game } from '../../../components'

import { type RootState } from '../../../../store-redux/store'
import { type GameState } from '../../../../store-redux/feature/game/game_slice'

import { PapButton } from '../../../components/common'
import { CreateTeams } from '../../../components/create_teams'
import { StartGame } from '../../../components/start_game'

const viewStyle = {
  minHeight: '350px',
  paddingTop: '1rem',
  alignItems: 'baseline',
  display: 'flex',
  flexWwrap: 'nowrap'
}

const StepSections = [
  {
    label: 'Instructions',
    component: Instructions
  },
  {
    label: 'Room',
    component: RoomDetails
  },
  {
    label: 'Papelitos',
    component: PapelitosComponent
  },
  {
    label: 'Teams',
    component: CreateTeams
  },
  {
    label: 'Start',
    component: StartGame
  }
]

export const RoomSetup = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0)
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => prev + 1)
  }, [])
  const goToBack = useCallback(() => {
    setActiveIndex((prev) => prev - 1)
  }, [])

  const game = useSelector<RootState, GameState>((state) => state.game)

  return !game.isGameStarted ? (
    <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
      <Steps
        model={StepSections.map((e) => ({ label: e.label }))}
        activeIndex={activeIndex}
        onSelect={(e) => {
          setActiveIndex(e.index)
        }}
        readOnly={false}
      />

      {StepSections.map((e, index) => {
        return (
          activeIndex === index && (
            <>
              <div style={viewStyle}>
                <e.component />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PapButton
                  disabled={index === 0}
                  link
                  label={'Prev'}
                  onClick={goToBack}
                ></PapButton>
                <PapButton
                  link
                  disabled={index === StepSections.length - 1}
                  label={'Next'}
                  onClick={goToNext}
                ></PapButton>
              </div>
            </>
          )
        )
      })}
    </div>
  ) : (
    <Game />
  )
}
