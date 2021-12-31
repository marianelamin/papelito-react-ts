export const print = () => console.log('hello')

// import react, { useState } from 'react'

// import { Row, Container, Block, Button } from 'ui/styles'

// type BLOCK = 'x' | 'o' | '-'

// export const TicTacToe = () => {
//   const initBoardState: BLOCK[] = ['-', '-', '-', '-', '-', '-', '-', '-', '-']
//   const [board, stateBoard] = useState<BLOCK[]>(initBoardState)

//   const [isXTurn, setIsXTurn] = useState<boolean>(true)
//   function handleClick(index: number) {
//     const newBoard = [...board]
//     newBoard[index] = isXTurn ? 'x' : 'o'
//     setIsXTurn(!isXTurn)
//     stateBoard(newBoard)
//   }

//   return (
//     <Container>
//       <Row>
//         <Block onClick={() => handleClick(0)}>
//           {board[0] !== '-' && board[0]}
//         </Block>
//         <Block onClick={() => handleClick(1)}>
//           {board[1] !== '-' && board[1]}
//         </Block>
//         <Block onClick={() => handleClick(2)}>
//           {board[2] !== '-' && board[2]}
//         </Block>
//       </Row>
//       <Row>
//         <Block onClick={() => handleClick(3)}>
//           {board[3] !== '-' && board[3]}
//         </Block>
//         <Block onClick={() => handleClick(4)}>
//           {board[4] !== '-' && board[4]}
//         </Block>
//         <Block onClick={() => handleClick(5)}>
//           {board[5] !== '-' && board[5]}
//         </Block>
//       </Row>
//       <Row>
//         <Block onClick={() => handleClick(6)}>
//           {board[6] !== '-' && board[6]}
//         </Block>
//         <Block onClick={() => handleClick(7)}>
//           {board[7] !== '-' && board[7]}
//         </Block>
//         <Block onClick={() => handleClick(8)}>
//           {board[8] !== '-' && board[8]}
//         </Block>
//       </Row>
//       <Button
//         onClick={() => {
//           stateBoard(initBoardState)
//           setIsXTurn(true)
//         }}
//       >
//         Clear Board
//       </Button>
//     </Container>
//   )
// }
