import { dictElement } from "./dict-element";

export interface dictCurrElement extends dictElement {
  number: number;
  name: string;
  code: string;
  symbol: string;
}