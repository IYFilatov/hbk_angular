import { dictIncomeElement } from "../dictionaries/dict-income-element";

export interface docIncomeTableElement {
  linenum: number;
  inctypenum: number;
  accnum: number;  
  description: string;
  amount: number;
  inctypeObj: dictIncomeElement;
}