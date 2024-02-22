export const setError = (error, container) => {
  if (!container) {
    return null;
  }

  if (!error) {
    return container.classList.add("hidden");
  }

  container.classList.remove("hidden");
  container.textContent = error ?? "Произошла непредвиденная ошибка";
};
