import React from 'react'
import { PapelitoWrapper } from 'ui/views/papelito_game'
import { TicTacToe } from 'ui/views/tictactoe'

const App = () => {
  return (
    <div>
      <div> PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
      <PapelitoWrapper></PapelitoWrapper>
    </div>
  )
}

export default App
