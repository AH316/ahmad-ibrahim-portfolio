/**
 * Utility Functions for Ahmad Ibrahim's Portfolio
 *
 * This file contains reusable helper functions used throughout the application.
 */

// ============================================================================
// Type Definitions
// ============================================================================

export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

// ============================================================================
// Navigation & Scrolling
// ============================================================================

/**
 * Smoothly scrolls to a section by its ID or selector
 * @param selector - CSS selector for the target element (e.g., '#about', '#contact')
 * @param offset - Optional offset in pixels from the top (default: 0)
 */
export function smoothScrollTo(selector: string, offset: number = 0): void {
  const element = document.querySelector(selector);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

/**
 * Scrolls to the top of the page smoothly
 */
export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

/**
 * Gets the current scroll position
 * @returns Current scroll position in pixels
 */
export function getScrollPosition(): number {
  return window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * Checks if an element is in the viewport
 * @param element - The DOM element to check
 * @param threshold - Percentage of element that must be visible (0-1, default: 0.1)
 * @returns True if element is in viewport
 */
export function isInViewport(element: Element, threshold: number = 0.1): boolean {
  const rect = element.getBoundingClientRect();
  const elementHeight = rect.height;
  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

  return visibleHeight / elementHeight >= threshold;
}

// ============================================================================
// Form Validation
// ============================================================================

/**
 * Validates an email address
 * @param email - Email address to validate
 * @returns Validation result with isValid flag and optional error message
 */
export function validateEmail(email: string): ValidationResult {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Invalid email address' };
  }

  return { isValid: true };
}

/**
 * Validates that a string is not empty
 * @param value - String to validate
 * @param fieldName - Name of the field for error message
 * @returns Validation result
 */
export function validateRequired(value: string, fieldName: string = 'Field'): ValidationResult {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
}

/**
 * Validates minimum length of a string
 * @param value - String to validate
 * @param minLength - Minimum required length
 * @param fieldName - Name of the field for error message
 * @returns Validation result
 */
export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string = 'Field'
): ValidationResult {
  const trimmedValue = value.trim();

  if (trimmedValue.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }

  return { isValid: true };
}

// ============================================================================
// Date & Time Formatting
// ============================================================================

/**
 * Formats a date range string
 * @param startDate - Start date string (e.g., 'Jan 2024')
 * @param endDate - End date string or 'Present'
 * @returns Formatted date range (e.g., 'Jan 2024 – Present')
 */
export function formatDateRange(startDate: string, endDate: string | 'Present'): string {
  return `${startDate} – ${endDate}`;
}

/**
 * Gets the current year
 * @returns Current year as a number
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Calculates years of experience from a start date
 * @param startDate - Start date in format 'YYYY-MM' or 'MMM YYYY'
 * @returns Years of experience (rounded to one decimal)
 */
export function calculateYearsOfExperience(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffInMs = now.getTime() - start.getTime();
  const years = diffInMs / (1000 * 60 * 60 * 24 * 365.25);

  return Math.round(years * 10) / 10;
}

// ============================================================================
// String Utilities
// ============================================================================

/**
 * Truncates a string to a maximum length and adds ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Converts a string to kebab-case
 * @param text - Text to convert
 * @returns Kebab-cased string
 */
export function toKebabCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Capitalizes the first letter of a string
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ============================================================================
// Array Utilities
// ============================================================================

/**
 * Chunks an array into smaller arrays of specified size
 * @param array - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Shuffles an array (Fisher-Yates algorithm)
 * @param array - Array to shuffle
 * @returns Shuffled array (creates new array, doesn't mutate original)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ============================================================================
// Debounce & Throttle
// ============================================================================

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param func - Function to debounce
 * @param wait - Milliseconds to wait
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Creates a throttled function that only invokes func at most once per wait milliseconds
 * @param func - Function to throttle
 * @param wait - Milliseconds to wait
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}

// ============================================================================
// Local Storage
// ============================================================================

/**
 * Safely gets an item from localStorage with JSON parsing
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Parsed value or default
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely sets an item in localStorage with JSON stringification
 * @param key - Storage key
 * @param value - Value to store
 */
export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
  }
}

/**
 * Removes an item from localStorage
 * @param key - Storage key
 */
export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing from localStorage key "${key}":`, error);
  }
}

// ============================================================================
// Class Name Utilities
// ============================================================================

/**
 * Conditionally joins class names together
 * @param classes - Class names or conditional objects
 * @returns Joined class names string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ============================================================================
// Clipboard
// ============================================================================

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves to true if successful
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined' || !navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.warn('Error copying to clipboard:', error);
    return false;
  }
}
