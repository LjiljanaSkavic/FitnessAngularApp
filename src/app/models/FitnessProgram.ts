import { Category } from "./dto/Category";
import { Instructor, InstructorDTO } from "./Instructor";
import { IFile } from "./IFile"
import { Comment } from "./Comment"
import { Attribute } from "./dto/Attribute";

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
  images: IFile[]
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
