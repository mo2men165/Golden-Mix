// src/types/contactInfo.ts
export interface ContactInfo {
  _id: string;
  phoneNumber1: string;
  phoneNumber2?: string;
  phoneNumber3?: string;
  email: string;
  addressEn: string;
  addressAr: string;
}