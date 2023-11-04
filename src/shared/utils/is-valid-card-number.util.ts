export const isValidCardNumber = (cardNumber: string): boolean => {
  const regex = /^[0-9]{16}$/;
  return regex.test(cardNumber);
};
