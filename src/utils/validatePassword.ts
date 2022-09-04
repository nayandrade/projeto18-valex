import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();
const KEY = process.env.CCV_KEY;

export default async function validatePassword(password: string, dbPassword: string) {
  const cryptr = new Cryptr(`${KEY}`);
  const decryptedPassword = cryptr.decrypt(dbPassword);
  if (decryptedPassword !== password) {
    return false;
  }
  return true;
}
