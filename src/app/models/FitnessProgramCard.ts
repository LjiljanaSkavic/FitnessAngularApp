import { File } from "./File"

export interface FitnessProgramCard {
  id: number;
  name: string;
  price: number;
  difficultyLevel: number;
  image: File;
}
