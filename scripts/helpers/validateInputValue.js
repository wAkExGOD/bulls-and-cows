export const validateInputValue = (value) => {
  const regexp = /[0-9]/;

  if (!regexp.test(value)) {
    throw new Error("Вводить можно только цифры");
  }
};
