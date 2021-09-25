import { dictBankElement } from "./dict-bank-element";
import { dictCurrElement } from "./dict-curr-element";
import { dictElement } from "./dict-element";

export interface dictBankAccountElement extends dictElement {
  number: number;
  description: string;
  accnumber: string;
  bankid: number;
  currencyid: number;
  opened_at: Date;
  closed_at: Date;
  bankObj: dictBankElement;
  currencyObj: dictCurrElement;
}