import { dictElement } from "./dict-element";

export interface dictCurrElement extends dictElement {
  number: number;
  name: string;
  alcode: string;
  numcode: string;
  symbol: string;
}