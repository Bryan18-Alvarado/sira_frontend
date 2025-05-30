export interface MaritalStatus {
  id: number;
  marital_status: string;
  createAt: string;
  updateAt: string;
  deleteAt: string;
}

export interface MaritalStatusData {
  id: string;
  marital_status: string;
}

export interface MaritalStatusResponse {
  data: MaritalStatus[];
  total: number;
}
