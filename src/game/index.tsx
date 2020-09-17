import React, { useState } from 'react'
import { Dice, initialDice } from '../game/components/dice'
import {
  gameColumnsInitial,
  gameRowsInitial as gameRow,
  columnStyle,
  Column,
  RowValue,
} from '../game/components/ticket'

export const App = () => {
  const [roll, setRoll] = useState(1)
  const [dice, setDice] = useState(initialDice())
  const [gameColumn, setGameColumn] = useState(gameColumnsInitial())

  const selectDice = (index: number) => {
    if (roll !== 1) {
      setDice(dice.map((d, i, arr) => (i === index ? { ...d, selected: !arr[index].selected } : d)))
    }
  }

  const rollDice = () => {
    setRoll(roll + 1)
    setDice(dice.map((d) => (!d.selected ? { ...d, value: Math.floor(Math.random() * (7 - 1) + 1) } : d)))
  }

  const selectCell = (row: RowValue, rowIndex: number, column: Column) => {
    switch (row.name) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6': {
        switch (column) {
          case 'down': {
            setRoll(1)
            setDice(dice.map((x) => ({ ...x, selected: false })))
            setGameColumn({
              ...gameColumn,
              [column]: gameColumn[column].map((x, i) => (i === rowIndex ? { ...x, value: 10 } : x)),
            })
            break
          }
          default:
        }
        break
      }
      default:
    }
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column', width: 400 }}>
        <table className="table table-bordered">
          <thead>
            <tr style={{ backgroundColor: '#4267b2', color: '#FFF' }}>
              <th className="col-sm-2">
                <i className="fas fa-dice fa-2x" />
              </th>
              {(Object.keys(gameColumn) as Array<Column>).map((column, columnIndex) => (
                <th key={columnIndex} className="col-sm-2">
                  {columnStyle(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gameRow.map((row, rowIndex) => (
              <tr
                style={
                  row.name === 'sumupper' || row.name === 'sumdown' || row.name === 'summaxmin'
                    ? { backgroundColor: '#4267b2', color: '#FFF' }
                    : undefined
                }
                key={rowIndex}
              >
                <th>
                  {row.name === 'sumupper' || row.name === 'sumdown' || row.name === 'summaxmin'
                    ? 'Σ'
                    : row.name.toUpperCase()}
                </th>
                {(Object.keys(gameColumn) as Array<Column>).map((column, columnIndex) => (
                  <td
                    key={columnIndex}
                    style={
                      row.name === 'sumupper' || row.name === 'sumdown' || row.name === 'summaxmin'
                        ? { backgroundColor: '#EAEAEA', color: '#333', fontWeight: 'bold' }
                        : undefined
                    }
                    className={`${column === 'call' && gameColumn[column][columnIndex].call ? 'selected' : ''}`}
                    // tslint:disable-next-line: jsx-no-lambda
                    onClick={() => selectCell(row, rowIndex, column)}
                  >
                    {gameColumn[column][rowIndex].value}
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
