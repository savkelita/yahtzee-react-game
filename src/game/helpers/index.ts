import { DiceValue } from '../components/dice'

type DiceCount = { value: number; count: number }

export const fullHouse = (dice: Array<DiceValue>) =>
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
    .filter(
      (x, i, arrX) =>
        x.count > 1 && arrX.some((y, i, arrY) => y.count >= 3 && arrY.some((z) => z.value !== x.value && z.count >= 2)),
    )
