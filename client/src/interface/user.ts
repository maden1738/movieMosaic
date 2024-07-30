export interface ISignupData {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  avatarUrl: string;
  bio: null | string;
  email: string;
}

export interface IUpdateUserProfile {
  name: string;
  bio: string;
  email: string;
}
