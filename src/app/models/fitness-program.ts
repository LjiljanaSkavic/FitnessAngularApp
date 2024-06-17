import { Category } from "./dto/category";
import { Instructor, InstructorDTO } from "./instructor";
import { FitnessAppFile } from "./fitness-app-file"
import { Comment } from "./comment"
import { Attribute } from "./dto/attribute";

export interface FitnessProgram {
  id: number;
  name: string;
  description: string;
  price: number;
  difficultyLevel: number;
  duration: string;
  online: boolean;
  location: string;
  completed: boolean;
  deleted: boolean;
  contactEmail: string;
  creationDate: Date;
  category: Category;
  instructor: Instructor;
  images: FitnessAppFile[]
  comments: Comment[];
  attributes: Attribute[];
  appUserCreatorId: number;
}

export interface FitnessProgramRequest {
  name: string;
  description: string;
  price: number;
  difficultyLevel: number;
  duration: string;
  location: string;
  online: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
  contactEmail: string;
  creationDate: Date;
  categoryId: number;
  instructor: InstructorDTO;
  imageIds: number[],
  attributes: Attribute[],
  appUserCreatorId: number
}
