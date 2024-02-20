import {
  getHiddenNumbers,
  getAnswers,
  validateInputValue,
} from "./helpers/index.js";

const inputs = document.querySelectorAll(".number");
const form = document.querySelector(".form");
const triesContainer = document.querySelector(".tries");
const errorContainer = document.querySelector(".error");

const BACKSPACE_KEYCODE = 8;

const hiddenNumbers = getHiddenNumbers();
let tries = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    tries++;

    const inputNumbers = getInputNumbers(inputs);
    const answers = getAnswers(hiddenNumbers, inputNumbers);
    const newTry = `
      <div class="try">
        Попытка ${tries}: ${inputNumbers.join("")} - Быки 🐂: ${
      answers.bulls
    }, Коровы 🐄: ${answers.cows}
      </div>
    `;
    triesContainer.insertAdjacentHTML("afterbegin", newTry);
    setError("");
  } catch (error) {
    setError(error?.message);
    inputs[0].focus();
  }
});

function getInputNumbers(inputs) {
  let numbers = [];

  for (let i = 0; i < inputs.length; i++) {
    let value = inputs[i].value;
    if (value !== "") {
      if (numbers.includes(+value)) {
        throw new Error("Цифры не могут повторяться")
      }

      numbers.push(+value)
    }
  }

  if (numbers.length !== 4) {
    throw new Error("Пожалуйста, корректно заполните все цифры");
  }

  return numbers;
}

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

  input.addEventListener("keydown", (e) => {
    if (e.keyCode === BACKSPACE_KEYCODE && input.value === "") {
      inputs[i - 1]?.focus();
    }
  });
});

function setError(errorText) {
  if (!errorText) {
    return errorContainer.classList.add("hidden");
  }

  errorContainer.classList.remove("hidden");
  errorContainer.textContent = errorText ?? "Произошла ошибка";
}
