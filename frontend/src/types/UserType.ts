import type { AccountType } from "./AccountType.ts";

export interface UserType {
  id?: number;
  username: string;
  email: string;
  password: string;
  accounts?: AccountType[];
}
