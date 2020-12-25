export type UserType = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
};

export type UserState = {
  users: UserType[];
};

export type RootState = {
  userState: UserState;
};
