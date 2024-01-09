import EnterPapelitos from '../../../../ui/views/enter-papelitos'

const Lobby = () => {
  return (
    <div>
      <h1>Welcome to the room</h1>
      <p>
        Game has not started. Please add your papelitos in the mean time. See basic room settings
      </p>
      <EnterPapelitos />
    </div>
  )
}

export default Lobby
