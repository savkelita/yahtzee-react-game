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

type GameRow = Array<{ name: Row; value: number | null; call?: boolean }>
export const gameRowsInitial: GameRow = [
  { name: '1', value: null },
  { name: '2', value: null },
  { name: '3', value: null },
  { name: '4', value: null },
  { name: '5', value: null },
  { name: '6', value: null },
  { name: 'sumupper', value: 0 },
  { name: 'max', value: null },
  { name: 'min', value: null },
  { name: 'summaxmin', value: 0 },
  { name: 'kenta', value: null },
  { name: 'triling', value: null },
  { name: 'ful', value: null },
  { name: 'poker', value: null },
  { name: 'yamb', value: null },
  { name: 'sumdown', value: 0 },
]

export const gameColumns: { [key in Column]: GameRow } = {
  down: gameRowsInitial,
  free: gameRowsInitial,
  up: gameRowsInitial,
  hand: gameRowsInitial,
  call: gameRowsInitial.map((x) =>
    x.name === 'sumupper' || x.name === 'summaxmin' || x.name === 'sumdown' ? x : { ...x, call: false },
  ),
}

export const sumStyle = 'Σ'

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
