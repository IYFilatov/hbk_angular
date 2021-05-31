import { dictElement } from "./dict-element";

export interface dictCostElement extends dictElement {
  number: number;
  name: string;
  description: string;  
}