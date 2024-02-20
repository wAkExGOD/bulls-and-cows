export const getHiddenNumbers = () => {
  let numbers = []

  for (let i = 0; i < 4; i++) {
    const number = +(Math.random() * 9).toFixed()

    if (!numbers.includes(number)) {
      numbers.push(number)
    } else {
      --i
    }
  }

  return numbers
}
