import { docElement } from "./doc-element";
import { docExpensesTableElement } from "./doc-expenses-table-element";

export interface docExpensesElement extends docElement {
  delmark: boolean;
  posted: boolean;
  number: number;  
  date: Date;
  description: string;
  tableData: docExpensesTableElement[];
}