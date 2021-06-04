import { dictElement } from "./dict-element";

export interface dictBankAccountElement extends dictElement {
  number: number;
  description: string;
  accnumber: string;
  bankid: number;
  opened_at: string;
  closed_at: string;
}