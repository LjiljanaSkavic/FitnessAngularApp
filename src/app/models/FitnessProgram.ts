import { Category } from "./dto/Category";
import { Instructor } from "./Instructor";
import { File } from "./File"
import { Comment } from "./Comment"

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
  images: File[]
  comments: Comment[];
}
