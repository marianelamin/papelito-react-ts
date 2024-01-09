import { ReactNode, createContext, useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { Instructions, RoomDetails } from '../../../../../../ui/components'
import { CreateTeams } from '../../../../../../ui/components/create-teams'
import { StartGame } from '../../setup/start-game'
import {
  ROOM_PATH,
  ROOM_SETUP_PATH,
  ROOM_SET_TEAMS_PATH,
  ROOM_START_GAME_PATH
} from '../../../../routes'

interface RoomSetupStep {
  label: string
  component: () => ReactNode
  route: string
}

const StepSections: RoomSetupStep[] = [
  {
    label: 'Instructions',
    component: Instructions,
    route: 'instructions'
  },
  {
    label: 'Room',
    component: RoomDetails,
    route: ROOM_SETUP_PATH
  },
  {
    label: 'Teams',
    component: CreateTeams,
    route: ROOM_SET_TEAMS_PATH
  },
  {
    label: 'Start',
    component: StartGame,
    route: ROOM_START_GAME_PATH
  }
]

interface RoomSetupWizardState {
  activeStepIndex: number
  setActiveStepIndex: (index: number) => void
  steps: RoomSetupStep[]

  nextStep: () => void
  previousStep: () => void
}

const RoomSetupWizardContext = createContext<RoomSetupWizardState>({
  activeStepIndex: 0,
  setActiveStepIndex: (_index: number) => {},
  steps: [],
  nextStep: () => {},
  previousStep: () => {}
})

interface RoomSetupWizardContextProviderProps {
  children: ReactNode
}

const RoomSetupWizardContextProvider = ({ children }: RoomSetupWizardContextProviderProps) => {
  const navigate = useNavigate()

  const [activeIndex, setActiveIndex] = useState<number>(0)

  const goToNext = useCallback(() => {
    const hasNext = activeIndex < StepSections.length - 1
    if (!hasNext) return

    const nextStep = activeIndex + 1
    setActiveIndex(nextStep)
    navigate(`${ROOM_PATH}/${StepSections[nextStep]}`)
  }, [])

  const goToBack = useCallback(() => {
    const hasPrev = activeIndex > 0
    if (!hasPrev) return

    const prevStep = activeIndex - 1
    setActiveIndex(prevStep)
    navigate(`${ROOM_PATH}/${StepSections[prevStep]}`)
  }, [])

  //   const game = useSelector<RootState, GameState>((state) => state.game)

  return (
    <RoomSetupWizardContext.Provider
      value={{
        activeStepIndex: activeIndex,
        setActiveStepIndex: setActiveIndex,
        steps: StepSections,
        nextStep: goToNext,
        previousStep: goToBack
      }}
    >
      {children}
    </RoomSetupWizardContext.Provider>
  )
  //   return !game.isGameStarted ? (
  //     <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
  //       <Steps
  //         model={StepSections.map((e) => ({ label: e.label }))}
  //         activeIndex={activeIndex}
  //         onSelect={(e) => {
  //           setActiveIndex(e.index)
  //         }}
  //         readOnly={false}
  //       />

  //       {StepSections.map((e, index) => {
  //         return (
  //           activeIndex === index && (
  //             <>
  //               <div style={viewStyle}>
  //                 <e.component />
  //               </div>
  //               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  //                 <PapButton
  //                   disabled={index === 0}
  //                   link
  //                   label={'Prev'}
  //                   onClick={goToBack}
  //                 ></PapButton>
  //                 <PapButton
  //                   link
  //                   disabled={index === StepSections.length - 1}
  //                   label={'Next'}
  //                   onClick={goToNext}
  //                 ></PapButton>
  //               </div>
  //             </>
  //           )
  //         )
  //       })}
  //     </div>
  //   ) : (
  //     <Game />
  //   )
}

const useRoomSetupWizard = () => useContext(RoomSetupWizardContext)

export { RoomSetupWizardContextProvider, useRoomSetupWizard }
