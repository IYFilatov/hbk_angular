import { docElement } from "./doc-element";
import { docIncomeTableElement } from "./doc-income-table-element";

export interface docIncomeElement extends docElement {
  delmark: boolean;
  posted: boolean;
  number: number;  
  date: Date;
  description: string;
  tableData: docIncomeTableElement[];
}