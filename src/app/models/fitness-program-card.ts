import { FitnessAppFile } from "./fitness-app-file"

export interface FitnessProgramCard {
  id: number;
  name: string;
  price: number;
  difficultyLevel: number;
  image: FitnessAppFile;
  online: boolean
  location: string;
}
