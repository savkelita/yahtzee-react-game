import { DiceValue } from '../components/dice'

type DiceCount = { value: number; count: number }

const diceGroup = (dice: Array<DiceValue>) =>
  [...dice]
    .sort((a, b) => a.value - b.value)
    .reduce((acc, cur) => {
      const group: DiceCount = { value: cur.value, count: 1 }
      if (acc.length === 0 || acc[acc.length - 1].value !== cur.value) {
        acc.push(group)
        return acc
      }
      acc[acc.length - 1].count++
      return acc
    }, [] as Array<DiceCount>)

// Straight
export const straight = (dice: Array<DiceValue>): boolean =>
  dice
    .filter((x, i, arr) => arr.findIndex((y) => y.value === x.value) === i) // remove duplicates
    .every(
      (_, __, arr) =>
        arr.length === 6 ||
        (arr.length === 5 && [2, 3, 4, 5, 6].every((x) => arr.some((y) => y.value === x))) ||
        [1, 2, 3, 4, 5].every((y) => arr.some((z) => z.value === y)),
    )

// Full
export const full = (dice: Array<DiceValue>) =>
  diceGroup(dice).filter(
    (x, _i, arrX) =>
      x.count > 1 && arrX.some((y, _, arrY) => y.count >= 3 && arrY.some((z) => z.value !== x.value && z.count >= 2)),
  )

// Trilling
export const trilling = (dice: Array<DiceValue>) => diceGroup(dice).filter((x) => x.count >= 3)

// Poker
export const poker = (dice: Array<DiceValue>) => diceGroup(dice).filter((x) => x.count >= 4)

// Yamb
export const yamb = (dice: Array<DiceValue>) => diceGroup(dice).filter((x) => x.count >= 5)
