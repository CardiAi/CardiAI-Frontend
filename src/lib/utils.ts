import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import CryptoJS from "crypto-js";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encrypt = (data: string, key: string) => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

export const decrypt = (data: string, key: string) => {
  return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
};
