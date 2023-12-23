// reducers are functions that calculate the new value of my state
import { Papelito, Team } from 'papelito-models'

import { papelitoService } from 'services'

// export interface PapelitosState {
//   id: string
//   private: boolean
//   password: string
//   bowl: Papelito[]
//   myPapelitos: Papelito[]
//   teams: Team[]
//   previousTeam: Team
//   currentTeam: Team
//   nextTeam: Team
//   round: number
// }

// // @todo: need to read this initial state from firebase
// const initialState = {
//   id: '',
//   private: false,
//   password: '',
//   bowl: [],
//   myPapelitos: [],
//   round: 1,
//   teams: [],
//   previousTeam: new Team(),
//   currentTeam: new Team(),
//   nextTeam: new Team(),
// }

// export const papelitoReducer = (
//   state: PapelitosState = initialState,
//   action: Action<any>
// ) => {
//   switch (action.type) {
//     case GameActions.GET_ALL_PAPELITOS: {
//       // TODO: logic that returns all papelitos of the game
//       return {
//         ...state,
//         myPapelitos: papelitoService.fetchAllPapelitos(action.payload),
//       }
//     }
//     case GameActions.ADD_PAPELITO: {
//       // TODO: logic that adds it to the db and returns all papelitos of the game
//       return { ...state, myPapelitos: [...state.myPapelitos, action.payload] }
//     }
//     case GameActions.REMOVE_PAPELITO: {
//       // TODO: logic that removes a papelito from the game
//       return {
//         ...state,
//         myPapelitos: state.myPapelitos.filter(
//           (papelito) => papelito.id != action.payload.id
//         ),
//       }
//     }
//     case GameActions.GUESS_PAPELITO_FROM_BOWL: {
//       console.log(`from reducer: guessing ${action.payload.text}`)
//       let bowl = state.bowl.map((papel) => {
//         console.log(`from reducer: guessing ${papel.text}`)
//         if (papel.id === action.payload.id) {
//           papel.guessed = true
//           // todo: BUG!!! this is being undefined for some reason!
//           console.log(`from reducer: guessed & marked ${papel.text}`)
//         }
//         return papel
//       })
//       console.log('new bowl:')
//       console.log(bowl)

//       return {
//         ...state,
//         bowl: bowl,
//       }
//     }
//     case GameActions.THROW_PAPELITO_IN_BOWL: {
//       console.log(`papelito is being thrown into bowl: ${action.payload}`)
//       let myPapelitos = state.myPapelitos.filter(
//         (papelito) => papelito.id != action.payload.id
//       )
//       let bowl = [...state.bowl, action.payload]
//       return {
//         ...state,
//         bowl: bowl,
//         myPapelitos: myPapelitos,
//       }
//     }
//     default:
//       return state
//   }
// }

// const _removePapelito = (state: PapelitosState, payload: any) => {
//   return state.myPapelitos.filter((papelito) => papelito.id != payload.id)
// }
