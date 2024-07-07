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

export type ipInfo = {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  lat: number;
  lon: number;
  org: string;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
};
