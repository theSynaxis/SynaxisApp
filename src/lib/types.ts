import { type USER_ROLES } from "./constants";

export interface USER {
  id: string;
  role: USER_ROLES;
  username: string;
  email: string;
  emailVerified: boolean;
  // no password
  firstName: string;
  lastName: string;
  patron: string;
  bio: string | undefined;
  birthday: Date;
  nameday: Date;
  location: string;
  jurisdiction: string;
  denomination: string;
  sex: string;
  joinedDate: Date;
  updatedDate: Date;
  isBanned: boolean;
  bannedUntil: Date | undefined;
  isDeleted: boolean;
}
