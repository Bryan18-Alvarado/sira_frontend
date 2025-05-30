export interface Genders {
  id: number;
  name: string;
  code?: string;
  isActive: Boolean;
}

export interface GendersData {
  id: string;
  name: string;
  code?: string;
}

export interface GendersResponse {
  data: Genders[];
  total: number;
}
