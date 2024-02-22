import {
  getRandomNumbers,
  getAnswers,
  validateInputValue,
  setError,
  setSuccess,
  getUserNumbers,
} from "./helpers/index.js";

const inputs = document.querySelectorAll(".number");
const form = document.querySelector(".form");
const triesContainer = document.querySelector(".tries");
const KEYCODES = {
  BACKSPACE: 8,
  LEFT: 37,
  RIGHT: 39,
};
const randomNumbers = getRandomNumbers();
let tries = 0;

console.log("Загаданные числа:", randomNumbers);

inputs[0]?.focus()

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const userNumbers = getUserNumbers(inputs);
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
    if (answers.bulls === 4) {
      setSuccess()
    }
  } catch (error) {
    setError(error?.message);
    Array.from(inputs)
      .find((input) => input.value === "")
      ?.focus();
  }
});

inputs.forEach((input, i) => {
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
