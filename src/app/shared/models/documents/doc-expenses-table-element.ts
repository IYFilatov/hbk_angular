import { dictBankAccountElement } from "../dictionaries/dict-BankAccount-element";
import { dictCostElement } from "../dictionaries/dict-cost-element";

export interface docExpensesTableElement {
  linenum: number;
  costtypenum: number;
  accnum: number;  
  description: string;
  amount: number;
  costtypeObj: dictCostElement;
  bankaccObj: dictBankAccountElement;
}