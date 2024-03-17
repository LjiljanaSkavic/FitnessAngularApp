import { IFile } from "./IFile"

export interface FitnessProgramCard {
  id: number;
  name: string;
  price: number;
  difficultyLevel: number;
  image: IFile;
}
