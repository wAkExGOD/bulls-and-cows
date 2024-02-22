export const getAnswers = (hiddenNumbers, inputNumbers) => {
  const answers = {
    bulls: 0,
    cows: 0,
  };

  for (let i = 0; i < 4; i++) {
    const input = inputNumbers[i];
    const hidden = hiddenNumbers[i];

    if (hidden === input) {
      answers.bulls++;
    } else if (hiddenNumbers.some((el) => el === input)) {
      answers.cows++;
    }
  }

  return answers;
};
