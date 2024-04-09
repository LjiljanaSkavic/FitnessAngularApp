export interface ActivityLogRequest {
  date: Date;
  duration: number; // Assuming duration in minutes
  type: number; // Assuming type is represented by an ID
  currentWeightLbs: number;
  notes: string;
  kcalIntake: number;
  appUserId: number;
  id?: number
}

export interface ActivityLog {
  id: number;
  date: Date;
  duration: number;
  type: number;
  currentWeightLbs: number;
  notes: string;
  kcalIntake: number;
}

export interface ActivityLogShort {
  id: number;
  type: number;
  currentWeightLbs: number;
  kcalIntake: number;
}
