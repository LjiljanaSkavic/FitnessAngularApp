import { AppUserShort } from "./AppUser";

export interface Comment {
  id: number;
  content: string
  dateTime: Date;
  appUser: AppUserShort;
}
