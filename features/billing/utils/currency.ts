import { Money, Currency } from "../types/billing.types";

/**
 * Formats a Money object into a locale-aware currency string.
 * Money amounts are expected in minor units (e.g. cents).
 */
export function formatMoney(money: Money, locale: string = 'en-US'): string {
  const { amount, currency } = money;
  
  // Convert minor units to major units
  const amountMajor = amount / 100;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amountMajor);
}

/**
 * Formats a raw amount (in minor units) with a specific currency string.
 */
export function formatAmount(amountMinor: number, currency: Currency, locale: string = 'en-US'): string {
  return formatMoney({ amount: amountMinor, currency }, locale);
}
