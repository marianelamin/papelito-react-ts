import React, { useState } from 'react'
import { Button } from 'ui/styles'
import { Papelito } from 'ui/models/papelito'
import { AddPapelito } from 'ui/components/add_papelito'

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
  const [papelitoList, setPapelitoList] = useState<Papelito[]>([
    new Papelito('La casa roja', false, 1),
    new Papelito('temperatura es alta', false, 2),
  ])

  let papelitoIndex

  const saveNewPapelito = (papelito: Papelito) => {
    let newPapelitoList = [...papelitoList]
    newPapelitoList.push(papelito)
    console.log(papelito)
    console.log(newPapelitoList)
    setPapelitoList(newPapelitoList)
  }

  function deletePapelito(index: number) {
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
    return selectedPapelito
  }

  // todo: there is something going on with the correct filtered list
  const papelitosInBowl = papelitoList.filter(
    (papelito) => papelito.guessed === false
  )

  return (
    <div>
      <PapelitoList
        papelitoList={papelitoList}
        deletePapelito={deletePapelito}
      ></PapelitoList>
      <AddPapelito onSavePapelito={saveNewPapelito}></AddPapelito>
      <PapelitoBowl
        papelitoList={papelitosInBowl}
        papelitoDrawn={drawPapelito}
        papelitoGuessed={guessPapelito}
      ></PapelitoBowl>
    </div>
  )
}

// ---------------------------

interface PapelitoBowlIO {
  papelitoList: Papelito[]
  papelitoDrawn: Function
  papelitoGuessed: Function
}

const PapelitoBowl = (props: PapelitoBowlIO) => {
  const papelitoQuestionMark = new Papelito('?')
  const [papelitoShown, setPapelitoShown] = useState<Papelito>(
    papelitoQuestionMark
  )
  const [showPapelito, setShowPapelito] = useState<boolean>(false)

  const drawPapelito = () => {
    console.log(hasPapelitoBeenDrawn())

    if (props.papelitoList.length > 0) {
      setShowPapelito(true)
      return setPapelitoShown(props.papelitoDrawn())
    } else {
      return null
    }
  }

  const guessPapelito = () => {
    setShowPapelito(false)
    var p = new Papelito(papelitoShown.text, true, papelitoShown.id)
    console.log(`papelito set to guessed:`)
    console.log(p)
    setPapelitoShown(papelitoQuestionMark)
    return props.papelitoGuessed(p)
  }

  const bowlSize = () => props.papelitoList.length
  const hasPapelitoBeenDrawn = () => {
    return (
      props.papelitoList.find((papel) => papel.id == papelitoShown.id) !==
      undefined
    )
  }

  return (
    <div>
      <h2>Bowl</h2> <span>total: {bowlSize()}</span>
      <div>
        <PapelitoDisplay
          papelito={papelitoShown}
          showPapelito={showPapelito}
        ></PapelitoDisplay>
      </div>
      <button onClick={drawPapelito} disabled={bowlSize() === 0}>
        Draw
      </button>
      <button
        onClick={guessPapelito}
        disabled={bowlSize() === 0 || !hasPapelitoBeenDrawn()}
      >
        Guessed
      </button>
    </div>
  )
}

// ---------------------------

interface PapelitoDisplayIO {
  papelito: Papelito
  showPapelito: boolean
}

const PapelitoDisplay = (props: PapelitoDisplayIO) => {
  return props.showPapelito ? (
    <div>
      <p>{props.papelito.text}</p>
      <span>[{props.papelito.id}] - </span>
      <span>({props.papelito.guessed ? 'true' : 'false'})</span>
    </div>
  ) : (
    <div>nothing to show yet</div>
  )
}

// ---------------------------

export { PapelitoList, PapelitoWrapper, PapelitoBowl }
