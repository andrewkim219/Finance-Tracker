import type { TransactionType } from "./TransactionType.ts";

export interface CategoryType {
  id?: number;
  name: string;
  type: string;
  transactions?: TransactionType[];
}
