import React, { useState } from 'react'
import { Button } from 'ui/styles'
import { Papelito } from 'ui/models/papelito'
import { AddPapelito } from 'ui/components/add_papelito'
import { PapelitoBowl } from 'ui/components/papelito_bolw'

// ---------------------------

interface PapelitoListIO {
  papelitoList: Papelito[]
  deletePapelito: Function
}

const PapelitoList = (props: PapelitoListIO) => {
  return (
    <div>
      <h2>Papelitos List</h2>
      <ol>
        {props.papelitoList.map((papelito, index) => (
          <li key={index}>
            <div>
              {papelito.id} ({papelito.guessed ? 'guessed' : 'not guessed'}) -{' '}
              {papelito.text} -
              <button onClick={() => props.deletePapelito(index)}>Del</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ---------------------------

const PapelitoWrapper = () => {
  const [papelitoShown, setPapelitoShown] = useState<Papelito | undefined>(
    undefined
  )
  const [papelitoList, setPapelitoList] = useState<Papelito[]>([
    new Papelito('La casa roja', false, 1),
    new Papelito('temperatura es alta', false, 2),
  ])
  const playerName = 'Marianela'
  let papelitoIndex

  const saveNewPapelito = (papelito: Papelito) => {
    let newPapelitoList = [...papelitoList]
    papelito.author = playerName
    newPapelitoList.push(papelito)
    console.log(papelito)
    console.log(newPapelitoList)
    setPapelitoList(newPapelitoList)
  }

  function deletePapelito(index: number) {
    // if papelito deletes was the one shown, update this
    if (papelitoList[index] === papelitoShown) setPapelitoShown(undefined)
    console.log(index)
    let newPapelitoList = [...papelitoList]
    newPapelitoList.splice(index, 1)
    setPapelitoList(newPapelitoList)
  }

  const guessPapelito = (value: any) => {
    console.log('this papelito should be marked as guessed')
    console.log(value)
    updatePapelitoList(value)
  }

  function updatePapelitoList(value: Papelito) {
    papelitoList.forEach((papel) => {
      if (papel.id === value.id) {
        papel.guessed = value.guessed
      }
    })

    setPapelitoList([...papelitoList])
  }

  const drawPapelito = () => {
    papelitoIndex = Math.floor(Math.random() * papelitoList.length)
    let selectedPapelito = papelitoList[papelitoIndex]
    console.log(`lanzate un papelito ahi:`)
    console.log(selectedPapelito)
    setPapelitoShown(selectedPapelito)
  }

  // todo: there is something going on with the correct filtered list
  const papelitosInBowl = papelitoList.filter(
    (papelito) => papelito.guessed === false
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <span>
          Player: <b>{playerName}</b>
        </span>
      </div>
      <PapelitoList
        papelitoList={papelitoList}
        deletePapelito={deletePapelito}
      ></PapelitoList>
      <AddPapelito onSavePapelito={saveNewPapelito}></AddPapelito>
      <PapelitoBowl
        papelitoList={papelitosInBowl}
        papelitoShown={papelitoShown}
        bowlSize={papelitosInBowl.length}
        papelitoDrawn={drawPapelito}
        papelitoGuessed={guessPapelito}
      ></PapelitoBowl>
    </div>
  )
}

// ---------------------------

export { PapelitoList, PapelitoWrapper }
