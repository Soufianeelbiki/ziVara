import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  value: number,
  options?: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
) {
  const {
    locale = "fr-FR",
    currency = "EUR",
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options ?? {};

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}
