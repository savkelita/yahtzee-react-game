import React, { useState } from 'react'
import { Dice, initialDice } from '../game/components/dice'

export const App = () => {
  const [roll, setRoll] = useState(1)
  const [dice, setDice] = useState(initialDice())

  const selectDice = (index: number) => {
    if (roll !== 1) {
      setDice(dice.map((d, i, arr) => (i === index ? { ...d, selected: !arr[index].selected } : d)))
    }
  }

  const rollDice = () => {
    setRoll(roll + 1)
    setDice(dice.map((d) => (!d.selected ? { ...d, value: Math.floor(Math.random() * (7 - 1) + 1) } : d)))
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column', width: 300, padding: 10 }}>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          {dice.map((d, i) => (
            <Dice
              key={i}
              value={d}
              // tslint:disable-next-line: jsx-no-lambda
              onClick={() => selectDice(i)}
            />
          ))}
        </div>
        <button
          // tslint:disable-next-line: jsx-no-lambda
          onClick={() => rollDice()}
          className="btn-default"
          disabled={roll > 3}
        >
          Roll {`${roll > 3 ? '' : roll}`}
        </button>
      </div>
    </div>
  )
}
