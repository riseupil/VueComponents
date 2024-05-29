export function formatAmount(amount) {
  if (amount || amount === 0) {
    return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return amount;
}

export function formatAmountWithFraction(value, fractionDigits = 1) {
  const amount = Math.abs(Number(value));
  const result = amount.toLocaleString(undefined, { maximumFractionDigits: fractionDigits, minimumFractionDigits: fractionDigits });
  return result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function unformatAmount(amount) {
  return amount.replace(/,/g, '');
}
