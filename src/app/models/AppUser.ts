import { File } from "../models/File";

export interface AppUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  activated: boolean;
  image: File;
}

export interface AppUserShort {
  id: number;
  username: string;
  image: File;
  isLoggedIn: boolean;
}
