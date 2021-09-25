import { docElement } from "./doc-element";
import { dictBankAccountElement } from "../dictionaries/dict-BankAccount-element";

export interface docAccBalanceTransferElement extends docElement {
  delmark: boolean;
  posted: boolean;
  number: number;  
  date: Date;
  accfrom: number;
  accto: number;
  fromamount: number;
  excrate: number;
  toamount: number;
  chargeamount: number;
  description: string;
  accfromObj: dictBankAccountElement;
  acctoObj: dictBankAccountElement;
}