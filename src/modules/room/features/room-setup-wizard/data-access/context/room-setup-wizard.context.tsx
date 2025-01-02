import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { RoomDetails, CreateTeams } from '../../../../../../ui/components'

import {
  ROOM_PATH,
  ROOM_SETUP_PATH,
  ROOM_SET_TEAMS_PATH,
  ROOM_START_GAME_PATH
} from '../../../../../../routes'
import { Steps, StepsSelectEvent } from 'primereact/steps'
import StartGame from '../../setup/start-game'

interface RoomSetupStep {
  label: string
  component: () => ReactNode
  route: string
}

const StepSections: RoomSetupStep[] = [
  {
    label: 'Room',
    component: RoomDetails,
    route: ROOM_SETUP_PATH
  },
  {
    label: 'Teams',
    component: CreateTeams,
    route: `${ROOM_SETUP_PATH}/${ROOM_SET_TEAMS_PATH}`
  },
  {
    label: 'Start',
    component: StartGame,
    route: `${ROOM_SETUP_PATH}/${ROOM_START_GAME_PATH}`
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

const roomPathConcat = (route: string) => `/${ROOM_PATH}/${route}`

const RoomSetupWizardContextProvider = ({ children }: RoomSetupWizardContextProviderProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const currentIndex = useMemo(() => {
    const isValid = StepSections.some((s) => roomPathConcat(s.route) === pathname)
    console.log({ isValid })
    return isValid ? StepSections.findIndex((s) => roomPathConcat(s.route) === pathname) : 0
  }, [pathname])

  const [activeIndex, setActiveIndex] = useState<number>(currentIndex)

  const goToNext = useCallback(() => {
    const hasNext = activeIndex < StepSections.length - 1
    if (!hasNext) return

    const nextStep = activeIndex + 1
    setActiveIndex(nextStep)
    navigate(roomPathConcat(StepSections[nextStep].route))
  }, [navigate])

  const goToBack = useCallback(() => {
    const hasPrev = activeIndex > 0
    if (!hasPrev) return

    const prevStep = activeIndex - 1
    setActiveIndex(prevStep)
    navigate(roomPathConcat(StepSections[prevStep].route))
  }, [navigate])

  const onSelectStep = useCallback(
    (e: StepsSelectEvent) => {
      setActiveIndex(e.index)
      navigate(roomPathConcat(StepSections[e.index].route))
    },
    [navigate]
  )

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
      <Steps
        model={StepSections.map((e) => ({ label: e.label }))}
        activeIndex={activeIndex}
        onSelect={onSelectStep}
        readOnly={false}
      />
      {children}
    </RoomSetupWizardContext.Provider>
  )
}

const useRoomSetupWizard = (): RoomSetupWizardState => {
  const context = useContext(RoomSetupWizardContext)
  if (context == null) {
    throw new Error('useRoomSetupWizard debe ser usado dentro de RoomSetupWizardContextProvider')
  }
  return context
}

export { RoomSetupWizardContextProvider, useRoomSetupWizard }
