export interface IProfile {
  code: string;
  id: number;
}

export interface IUser {
  profile: IProfile;
  updatedAt: string;
  createdAt: string;
  teamId: string;
  name: string;
  id: number;
}
