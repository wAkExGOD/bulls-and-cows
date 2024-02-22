import {
  getRandomNumbers,
  getAnswers,
  validateInputValue,
  setError,
  getUserNumbers,
} from "./helpers/index.js";

const inputs = document.querySelectorAll(".number");
const form = document.querySelector(".form");
const triesContainer = document.querySelector(".tries");
const errorContainer = document.querySelector(".error");
const KEYCODES = {
  BACKSPACE: 8,
  LEFT: 37,
  RIGHT: 39,
};
const randomNumbers = getRandomNumbers();
let tries = 0;

console.log("Загаданные числа:", randomNumbers);

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
    setError("", errorContainer);
  } catch (error) {
    setError(error?.message, errorContainer);
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
      setError(error?.message, errorContainer);
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
