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
    location: string;
    completed: boolean;
    deleted: boolean;
    contactEmail: string;
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
    isCompleted: boolean;
    isDeleted: boolean;
    contactEmail: string;
    categoryId: number;
    instructor: InstructorDTO;
    imageIds: number[],
    attributes: Attribute[],
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
