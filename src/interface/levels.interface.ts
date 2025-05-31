export interface Levels {
  id: number;
  level_course: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface LevelsData {
  id: number;
  level_course: string;
}

export interface LevelsResponse {
  data: Levels[];
  total: number;
}
