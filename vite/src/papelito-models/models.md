## Design of the game

### Entities

- Game
- Turn
- Team
- Active Team extends Team
- Passive Team extends Team
- Person
- Player extends Person
- Papelito

## Possible classes

- Game
  - id: int
  - rounds: int
  - teams: <Team>[]
  - winner: Team

In a game you can:
startRound(): void
endRound(): void

In a round you can:
startTurn(): void
endTurn(): void

- Turn
  - activeTeam: Team
  - timer: Timer
  - passiveTeams: <Team>[]  
    startTimer(): void

In a turn you can:
openPapelito(), which automatically starts the timer
guessPapelito()
putbackPapelito()
objectTeamDescription()
acceptObjection()

- Team

  - id: int
  - players: <Player>[]
  - score: <int>[]
    selectNextDescriptor(): Player

- Active Team extends Team
  acceptDispute() -> same as acceptObjection()

- Passive Team extends Team
  disputeCurrentTurn() -> same as objectTeamDescription()

- Person

  - id: int
  - name: string

- Player extends Person

  - writtenPapelitos: <Papelito>[]
  - teamId: int
  - guessedPapelitoIds: <int>[]

- Descriptor extends Player
  currentPapelito: Papelito
  pickUpPapelito(): void
  putBackPapelito(): void
  guessedPapelito(): void

- Papelito
  - id: int
  - text: string
  - authorId: int
  - hasBeenGuessed: bool
