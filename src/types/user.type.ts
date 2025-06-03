export type TUserRegister = {
  email: string;
  name: string;
  birth_day: Date;
  phone: number;
  password: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};
