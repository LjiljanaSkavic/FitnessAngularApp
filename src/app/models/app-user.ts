import { FitnessAppFile } from "./fitness-app-file";

export interface AppUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  activated: boolean;
  image: FitnessAppFile;
}

export interface AppUserShort {
  id: number;
  username: string;
  image: FitnessAppFile;
  loggedIn: boolean;
}

export interface AppUserShortWithUnreadMessages extends AppUserShort {
  unreadMessages: number;
}
