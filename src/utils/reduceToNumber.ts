export const reduceToNumber = (num: number): number =>
  num > 22
    ? reduceToNumber(
        num
          .toString()
          .split('')
          .reduce((a, b) => a + Number(b), 0)
      )
    : num;
