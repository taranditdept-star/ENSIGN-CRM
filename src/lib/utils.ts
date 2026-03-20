import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidZimbabwePhone(phone: string): boolean {
  // Regex for Zimbabwean mobile numbers:
  // Starts with +2637, 2637, or 07 followed by 8 digits
  const zimPhoneRegex = /^(?:(?:\+2637|2637|07)\d{8})$/;
  return zimPhoneRegex.test(phone.replace(/\s/g, '')); // Remove spaces before testing
}
