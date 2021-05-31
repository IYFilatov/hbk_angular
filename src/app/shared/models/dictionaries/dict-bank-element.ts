import { dictElement } from "./dict-element";

export interface dictBankElement extends dictElement {
  number: number;
  name: string;
  code: string;
  internalcode: string;
  phone: string;
}