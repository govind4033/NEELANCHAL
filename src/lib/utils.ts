import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Central API base URL helper for frontend
export const API_BASE_URL: string = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_API_BASE_URL) ||
  (typeof process !== 'undefined' && (process as any).env && (process as any).env.VITE_API_BASE_URL) ||
  'http://localhost:3001';

export function apiUrl(path: string): string {
  const normalizedBase = API_BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}
