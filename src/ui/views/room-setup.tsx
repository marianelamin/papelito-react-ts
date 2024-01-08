import { useNavigate } from 'react-router'
import { PapButton } from '../components/common'

const RoomSetup = () => {
  const navigate = useNavigate()

  return (
    <div>
      {'configure room - second step of wizard'}
      <PapButton onClick={() => navigate('/room/enter-papelitos')}>Next</PapButton>
    </div>
  )
}

export default RoomSetup
