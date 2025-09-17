export const isOddAndLast = (index: number, length: number) => {
  if (length % 2 === 1) {
    if (index === length - 1) {
      return true;
    }
  }
  return false;
};
