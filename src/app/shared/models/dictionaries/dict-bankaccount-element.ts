import { dictElement } from "./dict-element";

export interface dictBankAccountElement extends dictElement {
  number: number;
  description: string;
  accnumber: string;
  bankid: number;
  opened_at: Date;
  closed_at: Date;
}