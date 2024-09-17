export interface User {
  id: number,
  name: string,
  uuid: string,
  profileUrl?: string,
  email: string,
  isAdmin: string
}

export interface ProfileDetails {
  name: string;
  email: string;
  uuid: string;
  profileUrl?: string;
  self?: boolean;
  contactNo?: string;
}
