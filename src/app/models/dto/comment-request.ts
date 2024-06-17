export interface CommentRequest {
    content: string;
    date: Date;
    fitnessProgramId: number;
    appUserId: number;
}

export interface CommentEditRequest {
    content: string;
    date: Date;
}
