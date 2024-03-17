import { Category } from "./dto/Category";
import { Instructor, InstructorDTO } from "./Instructor";
import { IFile } from "./IFile"
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
  images: IFile[]
  comments: Comment[];
}

export interface FitnessProgramRequest {
  name: string;
  description: string;
  price: number;
  difficultyLevel: number;
  duration: string;
  location: string;
  isCompleted: boolean;
  isDeleted: boolean;
  contact: string;
  categoryId: number;
  instructor: InstructorDTO;
  imageIds: number[],
  appUserCreatorId: number
}


export interface FitnessProgramShort {
  id: string;
  name: string;
  price: number;
  difficultyLevel: number;
  isCompleted: boolean;
  imageId: number;
}
