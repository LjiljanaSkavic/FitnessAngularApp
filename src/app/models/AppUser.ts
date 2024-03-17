import { IFile } from "./IFile";

export interface AppUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  activated: boolean;
  image: IFile;
}

export interface AppUserShort {
  id: number;
  username: string;
  image: IFile;
  isLoggedIn: boolean;
}
