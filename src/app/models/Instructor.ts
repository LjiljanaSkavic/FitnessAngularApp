import { IFile } from "./IFile";

export interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  height: number;
  weight: number;
  image: IFile;
}

export interface InstructorDTO {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: boolean;
  height: number;
  weight: number;
  imageId: number;
}
