import { docElement } from "./doc-element";
import { dictBankAccountElement } from "../dictionaries/dict-BankAccount-element";

export interface docAccBalanceTransferElement extends docElement {
  delmark: boolean;
  posted: boolean;
  number: number;  
  date: Date;
  accfrom: number;
  accto: number;
  amount: number;
  chargeamount: number;
  description: string;
  accfromObj: dictBankAccountElement;
  acctoObj: dictBankAccountElement;
}