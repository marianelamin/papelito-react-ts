# papelito

Papelito is a family game played a lot in Venezuela, specially at La casa de Los Mendoza around the first week of January.

Each family adds a little tweak to it, and depending on the age of the players some rules could be added to make the game more or less challenging.

### Other variations

This game receives many other names and variations. I will list these variations as I find them.

- [Instructions for Papelito](http://cairo.lti.cs.cmu.edu/~hector/wikihow_xml/categorized/Hobbies%20and%20Crafts/Games/Paper%20Games/Play-Papelito.html.xml) by Hector.
- https://usbornebeth.wordpress.com/2009/07/08/how-to-play-the-name-game-aka-fishbowl-aka-celebrity-aka-salad-bowl/

## The Mendoza variation

### What we need

- Timer
- At least 2 teams
- Each team can be formed by 2 or more players
- A bowl with Papelitos, 3-5 pieces of paper per player
- Pens to write down the papers

## Some Rules / How to play

Related to the Game:

1. A game could have from 1 to 3 rounds using the same bowl of papelitos.

- Describe the content of the paper with words, without using ANY of the WORDS already present on the paper. No gestures, no finger pointing.
- Describe the content of the paper with mimics, no sounds or humming.
- Describe the content of the paper with only ONE word. Once said, it cannot be changed.

2. The team with more guesses, wins the game.

Related to the rounds:

1. Each round can have many turns, one per team for as long as there are papelitos in the bowl.
2. A round ends when there are no more papelitos in the bowl.
3. After a round each team counts the papelitos they guessed and update their score.

Related to a turn:

1. Each turn lasts 60s, although this number is configurable and could on a case-by-case basis be modified by the players during the game.
2. There is one team at play, ie Team A, where one player is describing and the rest are trying to guess. Teams that are not active simply silently observe the turn develop.
3. Players of the team (active team) take on one of 2 roles: Descriptor or Guesser. All the players can eventually take on the descriptor role, however in a single turn there can only be one descriptor.
4. If a papelito is guessed, the descriptor saves it and is allowed to pick up and unfold a new papelito, for as long as there is time left on the timer.
5. Passive teams observe, and have the ability to object in case a rule has been broken, ie: the descriptor accidentally uses any of the words written on the paper.

Related to the team:

1. Keeps the score on each round.
2. Can be form of 2 or more players.

Related to the papelitos:

1. Usually there are three papelitos per player.
2. The content on the papelito can be follow a theme. ie, presidents of the world, musicians, a verb, a sentence of 3 to 5 words. This is pretty open and agreed amongst all players.

---

# Development

Requirements:

- nodejs
- A firebase project

### Run the app

In the project directory, you need to:

#### Vite - [vitejs](https://vitejs.dev/)

1. Install all dependencies
   ```sh
   yarn
   ```
2. Start the application in dev mode. Open http://localhost:5173/ to view it in the browser.
   ```sh
   yarn start
   ```

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Deploy

Need to build the app and deploy to Firebase. This can be achieved simply by using custom script.

#### Vite

```sh
yarn deploy
```

---

# Play

Currently a WIP.

In order to play, you will be able to do so by visiting [https://papelito-en-los-mendoza.web.app](https://papelito-en-los-mendoza.web.app).

---

# Mari:

- finish upgrading to latest router.
- get rid of redux. Use context, app simple enough.
- Remove so many layers if most of the stuff is CRUD.
