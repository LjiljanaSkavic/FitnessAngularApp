import { AppUserShort } from "./app-user";

export interface Comment {
  id: number;
  content: string
  dateTime: Date;
  appUser: AppUserShort;
}
