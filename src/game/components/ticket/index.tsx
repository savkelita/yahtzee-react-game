import React from 'react'

export type Column = 'down' | 'free' | 'up' | 'hand' | 'call'
type Row =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | 'sumupper'
  | 'max'
  | 'min'
  | 'summaxmin'
  | 'kenta'
  | 'triling'
  | 'ful'
  | 'poker'
  | 'yamb'
  | 'sumdown'

export type RowValue = { name: Row }
export const gameRowsInitial: Array<RowValue> = [
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: 'sumupper' },
  { name: 'max' },
  { name: 'min' },
  { name: 'summaxmin' },
  { name: 'kenta' },
  { name: 'triling' },
  { name: 'ful' },
  { name: 'poker' },
  { name: 'yamb' },
  { name: 'sumdown' },
]

export type ColumnValue = { value: null | number; call?: boolean }
export const gameColumnsInitial = (): { [key in Column]: Array<ColumnValue> } => {
  const columns = gameRowsInitial.map((_) => ({ value: null }))
  return {
    down: columns,
    free: columns,
    up: columns,
    hand: columns,
    call: columns.map((x) => ({ ...x, call: false })),
  }
}

export const columnStyle = (column: Column): JSX.Element => {
  switch (column) {
    case 'down':
      return <i className="fas fa-caret-down fa-2x" />
    case 'free':
      return (
        <span>
          <i className="fas fa-caret-up fa-2x" />
          <i className="fas fa-caret-down fa-2x" />
        </span>
      )
    case 'up':
      return <i className="fas fa-caret-up fa-2x" />
    case 'hand':
      return <i className="fas fa-hand-paper fa-2x" />
    case 'call':
      return <i className="fas fa-bell fa-2x" />
    default:
      return <div />
  }
}
