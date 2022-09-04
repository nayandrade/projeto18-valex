import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();
const KEY = process.env.CCV_KEY;

export default async function validateCard(dbSecurityCode: string, securityCode: string) {
  const cryptr = new Cryptr(`${KEY}`);
  const decryptedString = cryptr.decrypt(dbSecurityCode);
  console.log(decryptedString)
  if (decryptedString === securityCode) {

    return true;
  }
  throw "Card information is invalid";
}