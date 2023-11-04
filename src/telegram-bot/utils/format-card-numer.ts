export const formatCardNumber = (cardNumber: string): string => {
  const cleanedNumber = cardNumber.replace(/\D/g, '');
  const formattedNumber = cleanedNumber.replace(/(\d{4})/g, '$1 ');
  return formattedNumber.trim();
};
