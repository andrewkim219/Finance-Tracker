import type { TransactionTypeEnum } from "./TransactiontypeEnum.ts";
import type { AccountType } from "./AccountType.ts";
import type { CategoryType } from "./CategoryType.ts";

export interface TransactionType {
  id?: number;
  description?: string;
  amount: number;
  date: string; // ISO date string
  type: TransactionTypeEnum;
  account: AccountType;
  category?: CategoryType;
}
