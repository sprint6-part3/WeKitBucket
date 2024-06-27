export interface ProfileList {
  id: number;
  code: string;
  image: null | string;
  city: string;
  nationality: string;
  job: string;
  updatedAt: string;
  name: string;
}

export interface ProfileData {
  list: ProfileList[] | [];
  totalCount?: number;
}
