import { FitnessProgramCard } from "./FitnessProgramCard";

export interface FitnessProgramSearchResult {
  fitnessPrograms: FitnessProgramCard[];
  totalElements: number;
  totalPages: number;
  pageSize: number;
}
