const container = document.querySelector(".success");

export const setSuccess = () => {
  if (!container) {
    return null;
  }

  container.classList.remove("hidden");
  container.textContent = "Поздравляю! Вы угадали все цифры!";
};
