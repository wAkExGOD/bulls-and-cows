export const getUserNumbers = (inputs) => {
  if (!inputs) {
    return null;
  }

  let numbers = [];

  for (let i = 0; i < inputs.length; i++) {
    let value = inputs[i].value;
    if (value !== "") {
      if (numbers.includes(+value)) {
        throw new Error("Цифры не могут повторяться");
      }

      numbers.push(+value);
    }
  }

  if (numbers.length !== 4) {
    throw new Error("Пожалуйста, корректно заполните все пропуски");
  }

  return numbers;
};
