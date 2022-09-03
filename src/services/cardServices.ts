import dotenv from "dotenv";
import * as cardRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as companyRepository from "../repositories/companyRepository";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";

dotenv.config();

export async function createCard(
  employeeId: number,
  type: cardRepository.TransactionTypes,
  apiKey: string
) {
  try {
    const isValidCompany = await validateCompany(apiKey);
    const employee = await getEmployeeData(employeeId);
    if (employee && isValidCompany) {
      const creditcardNumber: string =
        faker.finance.creditCardNumber("################");
      const cardholderName: string = handleEmployeeName(employee);
      const securityCode: string = handleCCV();
      const expirationDate: string = handleExpirationDate();
      const cardData = {
        employeeId: employeeId,
        number: creditcardNumber,
        cardholderName: cardholderName,
        securityCode: securityCode,
        expirationDate: expirationDate,
        isVirtual: false,
        isBlocked: true,
        type: type,
      };
      await cardRepository.insert(cardData);
      return cardData;
    }
  } catch (error) {
    throw error;
  }
}

async function validateCompany(apiKey: string) {
  try {
    const company = await companyRepository.findByApiKey(apiKey);
    if (company.id) {
      console.log(company);
      return true;
    }
  } catch (error) {
    throw "Company not found";
  }
}

async function getEmployeeData(employeeId: number) {
  try {
    const employee = await employeeRepository.findById(employeeId);
    return employee;
  } catch (error) {
    throw "employee not found";
  }
}

function handleEmployeeName({ fullName }: { fullName: string }) {
  const sanitizedArray = [];
  const fullNameArray = fullName.split(" ");
  for (let i = 0; i < fullNameArray.length; i++) {
    if (i === 0 || i === fullNameArray.length - 1) {
      sanitizedArray.push(fullNameArray[i]);
    } else {
      if (fullNameArray[i].length > 3) {
        sanitizedArray.push(fullNameArray[i][0]);
      }
    }
  }
  const sanitizedName = sanitizedArray.join(" ");
  return sanitizedName;
}

function handleExpirationDate() {
  const today = new Date();
  const expiration = dayjs(today).add(5, "year").format("MM-YY").toString();
  return expiration;
}

function handleCCV() {
  const cryptr = new Cryptr("chave_super_secreta");
  const CCV = faker.finance.creditCardCVV();
  const encriptedCCV = cryptr.encrypt(CCV);
  //console.log(process.env.PORT, process.env.CCV_KEY);
  return encriptedCCV.toString();
}
