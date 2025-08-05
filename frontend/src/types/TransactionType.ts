import type { TransactionTypeEnum } from "./TransactiontypeEnum.ts";

export interface TransactionType {
  id?: number;
  description: string;
  amount: number;
  date: string; // ISO date string
  type: TransactionTypeEnum;
  account: number;
  category: number;
}
