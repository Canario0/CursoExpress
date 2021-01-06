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
  hashPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashPassword);
}

export { hashPassword, hashPasswordSync, comparePassword };
