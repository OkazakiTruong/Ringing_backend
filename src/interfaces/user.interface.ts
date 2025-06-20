export interface IRegisterUser {
  email: string;
  name: string;
  phone: string;
  password: string;
  birthDay: Date;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserData {
  _id?: string;
  email?: string;
  name?: string;
  phone?: string;
  password?: string;
  birthDay?: Date;
}
