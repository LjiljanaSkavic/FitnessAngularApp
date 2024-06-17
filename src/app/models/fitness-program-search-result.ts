import { FitnessProgramCard } from "./fitness-program-card";

export interface FitnessProgramSearchResult {
  fitnessPrograms: FitnessProgramCard[];
  totalElements: number;
  totalPages: number;
  pageSize: number;
}
