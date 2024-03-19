export interface ActivityLogRequest {
    date: Date;
    duration: number; // Assuming duration in minutes
    type: number; // Assuming type is represented by an ID
    currentWeightLbs: number;
    notes: string;
    kcalIntake: number;
    appUserId: number;
}
