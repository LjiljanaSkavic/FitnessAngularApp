import { File } from "./File";

export interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: boolean;
  height: number;
  weight: number;
  image: File;
}
