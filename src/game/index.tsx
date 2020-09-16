import React, { useState } from 'react'
import { Dice, initialDice } from '../game/components/dice'
import { gameColumns, gameRowsInitial, sumStyle, columnStyle, Column } from '../game/components/ticket'

export const App = () => {
  const [roll, setRoll] = useState(1)
  const [dice, setDice] = useState(initialDice())
  const [gameRow] = useState(gameRowsInitial)
  const [gameColumn] = useState(gameColumns)

  const selectDice = (index: number) => {
    if (roll !== 1) {
      setDice(dice.map((d, i, arr) => (i === index ? { ...d, selected: !arr[index].selected } : d)))
    }
  }

  const rollDice = () => {
    setRoll(roll + 1)
    setDice(dice.map((d) => (!d.selected ? { ...d, value: Math.floor(Math.random() * (7 - 1) + 1) } : d)))
  }

  const press = () => {
    console.log('KLIKNUO!')
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column', width: 400, padding: 10 }}>
        <table className="table table-bordered">
          <thead>
            <tr style={{ backgroundColor: '#4267b2', color: '#FFF' }}>
              <th className="col-sm-2">
                <i className="fas fa-dice fa-2x" />
              </th>
              {Object.keys(gameColumn).map((col, ci) => (
                <th key={ci} className="col-sm-2">
                  {columnStyle(col as Column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gameRow.map((comb, ic) => (
              <tr
                style={
                  comb.name !== 'sumupper' && comb.name !== 'sumdown' && comb.name !== 'summaxmin'
                    ? {}
                    : { backgroundColor: '#4267b2', color: '#FFF' }
                }
                key={ic}
              >
                <th>
                  {comb.name !== 'sumupper' && comb.name !== 'sumdown' && comb.name !== 'summaxmin'
                    ? comb.name.toUpperCase()
                    : sumStyle}
                </th>
                {Object.keys(gameColumn).map((col, icol) => (
                  <td
                    key={icol}
                    style={
                      comb.name !== 'sumupper' && comb.name !== 'sumdown' && comb.name !== 'summaxmin'
                        ? {}
                        : { backgroundColor: '#EAEAEA', color: '#333', fontWeight: 'bold' }
                    }
                    className={`${col === 'call' && gameColumn[col][ic].call ? 'selected' : ''}`}
                    // tslint:disable-next-line: jsx-no-lambda
                    onClick={() => press()}
                  >
                    {gameColumn[col as Column][ic].value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
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
          className="btn btn-default btn-block"
          disabled={roll > 3}
        >
          Roll {`${roll > 3 ? '' : roll}`}
        </button>
      </div>
    </div>
  )
}
