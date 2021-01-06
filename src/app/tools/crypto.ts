import bcrypt from "bcrypt";

function hashPassword(
  plainPassword: string,
  done: (err: Error, result: string) => void
) {
  bcrypt.hash(plainPassword, 10, done);
}

function hashPasswordSync(plainPassword: string): string {
  return bcrypt.hashSync(plainPassword, 10);
}

function comparePassword(
  plainPassword: string,
  hashPassword: string,
  done: (err: Error, same: boolean) => void
) {
  bcrypt.compare(plainPassword, hashPassword, done);
}

export { hashPassword, hashPasswordSync, comparePassword };
