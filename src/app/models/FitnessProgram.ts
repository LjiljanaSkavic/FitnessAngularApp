// fitness-program.interface.ts
import { Category } from "./dto/Category";
import { Instructor } from "./Instructor";

export interface FitnessProgram {
  id: number;
  name: string;
  description: string;
  price: number;
  difficultyLevel: number;
  duration: string;
  location: string;
  isCompleted: boolean;
  isDeleted: boolean;
  contact: string;
  category: Category;
  instructor: Instructor;
}
