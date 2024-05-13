import { hashSync } from 'bcryptjs';

export const encryptPwd = (password: string, saltRounds: number = 10) => {
  return hashSync(password, saltRounds);
};
