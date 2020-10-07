import React, { useState } from 'react'
import { Dice, initialDice } from '../game/components/dice'
import {
  gameColumnsInitial,
  gameRowsInitial as gameRow,
  columnStyle,
  Column,
  RowValue,
} from '../game/components/ticket'
import { straight, full, trilling, poker, yamb } from './helpers/'

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
    if (roll === 1) return
    switch (row.name) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6': {
        switch (column) {
          case 'down': {
            if (
              (gameColumn[column][0].value === null && rowIndex === 0) ||
              (rowIndex > 0 && gameColumn[column][rowIndex - 1].value !== null)
            ) {
              setRoll(1)
              setDice(dice.map((x) => ({ ...x, selected: false })))
              setGameColumn({
                ...gameColumn,
                [column]: gameColumn[column].map((x, i) => (i === rowIndex ? { ...x, value: 10 } : x)),
              })
            }
            break
          }
          case 'free': {
            if (gameColumn[column][rowIndex].value === null) {
              setRoll(1)
              setDice(dice.map((x) => ({ ...x, selected: false })))
              setGameColumn({
                ...gameColumn,
                [column]: gameColumn[column].map((x, i) => (i === rowIndex ? { ...x, value: 10 } : x)),
              })
            }
            break
          }
          case 'hand': {
            if (roll === 2 && gameColumn[column][rowIndex].value === null) {
              setRoll(1)
              setDice(dice.map((x) => ({ ...x, selected: false })))
              setGameColumn({
                ...gameColumn,
                [column]: gameColumn[column].map((x, i) => (i === rowIndex ? { ...x, value: 10 } : x)),
              })
            }
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
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              width: 100,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <i className="fas fa-dice fa-2x" />
          </div>
          {(Object.keys(gameColumn) as Array<Column>).map((column, columnIndex) => (
            <div className="cell" key={columnIndex}>
              {columnStyle(column)}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {gameRow.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  width: 100,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={rowIndex}
              >
                {row.name.toUpperCase()}
              </div>
              {(Object.keys(gameColumn) as Array<Column>).map((column, columnIndex) => (
                <button
                  key={columnIndex}
                  className="btn cell"
                  // tslint:disable-next-line: jsx-no-lambda
                  onClick={() => selectCell(row, rowIndex, column)}
                >
                  {gameColumn[column][rowIndex].value}
                </button>
              ))}
            </div>
          ))}
        </div>
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
