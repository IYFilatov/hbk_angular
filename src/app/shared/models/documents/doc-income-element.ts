import { docElement } from "./doc-element";

export interface docIncomeElement extends docElement {
  delmark: boolean;
  posted: boolean;
  number: number;  
  date: Date;
  description: string;
  tableData: Object[];
}