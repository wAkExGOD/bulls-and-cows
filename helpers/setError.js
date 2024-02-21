export const setError = (error, container) => {
  if (!error) {
    return container.classList.add("hidden");
  }

  container.classList.remove("hidden");
  container.textContent = error ?? "Произошла ошибка";
}