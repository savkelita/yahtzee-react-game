import React from 'react'

type DiceValue = { value: number; selected: boolean }

export const initialDice = (): Array<DiceValue> => {
  const dice = []
  for (let i = 1; i < 7; i++) {
    dice.push({ value: Math.floor(Math.random() * (7 - 1) + 1), selected: false })
  }
  return dice
}

const displayDice = (value: DiceValue['value']): string => {
  switch (value) {
    case 1:
      return 'fa-dice-one'
    case 2:
      return 'fa-dice-two'
    case 3:
      return 'fa-dice-three'
    case 4:
      return 'fa-dice-four'
    case 5:
      return 'fa-dice-five'
    case 6:
      return 'fa-dice-six'
    default:
      return ''
  }
}

type Props = {
  value: DiceValue
  onClick: () => void
}

export const Dice = ({ value: { selected, value }, onClick }: Props): JSX.Element => (
  <button onClick={onClick} className={`${!selected ? 'dice dice-none' : 'dice dice-selected'}`}>
    <i className={`fas ${displayDice(value)} fa-4x`} />
  </button>
)
