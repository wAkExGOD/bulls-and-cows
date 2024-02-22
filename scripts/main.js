const inputs = document.querySelectorAll(".number");
const form = document.querySelector(".form");
const triesContainer = document.querySelector(".tries");
const errorContainer = document.querySelector(".error");
const successContainer = document.querySelector(".success");
const KEYCODES = {
  BACKSPACE: 8,
  LEFT: 37,
  RIGHT: 39,
};
const helpers = {
  getAnswers: (hiddenNumbers, inputNumbers) => {
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
  },
  getRandomNumbers: () => {
    let numbers = [];

    for (let i = 0; i < 4; i++) {
      const number = +(Math.random() * 9).toFixed();

      if (!numbers.includes(number)) {
        numbers.push(number);
      } else {
        i--;
      }
    }

    return numbers;
  },
  getUserNumbers: () => {
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
  },
  setError: (error) => {
    if (!error) {
      return errorContainer.classList.add("hidden");
    }

    errorContainer.classList.remove("hidden");
    errorContainer.textContent = error ?? "Произошла непредвиденная ошибка";
  },
  setSuccess: () => {
    successContainer.classList.remove("hidden");
    successContainer.textContent = "Поздравляю! Вы угадали все цифры!";
  },
  validateInputValue: (value) => {
    const regexp = /[0-9]/;

    if (!regexp.test(value)) {
      throw new Error("Вводить можно только цифры");
    }
  },
  clearInputs: () => {
    inputs.forEach((input) => (input.value = ""));
  },
};
const randomNumbers = helpers.getRandomNumbers();
let tries = 0;

console.log("Загаданные числа:", randomNumbers);

inputs[0]?.focus();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { getUserNumbers, getAnswers, clearInputs, setError, setSuccess } =
    helpers;

  try {
    const userNumbers = getUserNumbers();
    const answers = getAnswers(randomNumbers, userNumbers);
    tries++;
    const tryHTML = `
      <li class="try">
        Попытка ${tries}: ${userNumbers.join("")} - Быки 🐂: ${
      answers.bulls
    }, Коровы 🐄: ${answers.cows}
      </li>
    `;

    triesContainer.insertAdjacentHTML("afterbegin", tryHTML);
    setError("");
    clearInputs();
    inputs[0]?.focus();
    if (answers.bulls === 4) {
      setSuccess();
    }
  } catch (error) {
    setError(error?.message);
    Array.from(inputs)
      .find((input) => input.value === "")
      ?.focus();
  }
});

inputs.forEach((input, i) => {
  const { validateInputValue, setError } = helpers;

  input.addEventListener("input", () => {
    try {
      const value = input.value;
      validateInputValue(value);
      const formattedValue = value.replace(/\D/g, "");
      input.value = formattedValue[formattedValue.length - 1] ?? "";

      if (value) {
        inputs[i + 1]?.focus();
      }
    } catch (error) {
      setError(error?.message);
    }
  });

  input.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
      case KEYCODES.BACKSPACE:
        if (input.value === "") {
          inputs[i - 1]?.focus();
        }
        break;
      case KEYCODES.LEFT:
        inputs[i - 1]?.focus();
        break;
      case KEYCODES.RIGHT:
        inputs[i + 1]?.focus();
        break;
    }
  });
});
