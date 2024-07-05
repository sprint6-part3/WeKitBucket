export type DateType = Date | string;
export type ImageType = string | null;
export type CodeType = string | undefined;

export type ChangeProfilesFormData = {
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string | File | ImageType;
  content: string;
};

// get 요청 시 Response 정의
export type UserResponse = {
  profile: {
    code: string;
    id: number;
  };
  updatedAt: DateType;
  createdAt: DateType;
  teamId: string;
  name: string;
  id: number;
};

export type PingFormData = {
  securityAnswer: string;
};

export interface DetailProfileResponse {
  id: number;
  code: string;
  image: ImageType;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: DateType;
  name: string;
}
