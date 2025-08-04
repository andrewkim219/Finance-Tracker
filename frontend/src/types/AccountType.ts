import type { UserType } from "./UserType.ts";
import type { TransactionType } from "./TransactionType.ts";

export interface AccountType {
  id?: number;
  accountName: string;
  accountType: string;
  balance: number;
  user?: UserType;
  transactions?: TransactionType[];
}
