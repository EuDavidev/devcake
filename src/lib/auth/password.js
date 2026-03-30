import bcrypt from "bcryptjs";

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
