import bcrypt from 'bcrypt';

const saltRounds = 10;

export function hashAPassword(password: string) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}

export function comparePassword(hashPassword: string, comparePassword: string) {
  if (!hashAPassword || !comparePassword) return false;
  return bcrypt.compareSync(comparePassword, hashPassword);
}
