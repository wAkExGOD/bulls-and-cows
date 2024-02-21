import {
  getHiddenNumbers,
  getAnswers,
  validateInputValue,
  setError,
  getInputNumbers,
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

const hiddenNumbers = getHiddenNumbers();
let tries = 0;
console.log("Загаданные числа:", hiddenNumbers);

/*
  Form submit listener
*/
form.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const inputNumbers = getInputNumbers(inputs);
    const answers = getAnswers(hiddenNumbers, inputNumbers);
    const newTry = `
      <div class="try">
        Попытка ${tries}: ${inputNumbers.join("")} - Быки 🐂: ${
      answers.bulls
    }, Коровы 🐄: ${answers.cows}
      </div>
    `;

    tries++;
    triesContainer.insertAdjacentHTML("afterbegin", newTry);
    setError("", errorContainer);
  } catch (error) {
    setError(error?.message, errorContainer);
    Array.from(inputs)
      .find((input) => input.value === "")
      ?.focus();
  }
});

/*
  Inputs event listeners
*/
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

  input.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
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
