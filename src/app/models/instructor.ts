import { FitnessAppFile } from "./fitness-app-file";

export interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  height: number;
  weight: number;
  image: FitnessAppFile;
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
