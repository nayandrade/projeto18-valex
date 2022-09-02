import * as cardRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import { faker } from '@faker-js/faker';

export async function createCard(employeeId: number, type: string) {
  const employee = await getEmployeeData(employeeId);
  //console.log(employee);
  if (employee) {
    const cardholderName: string = handleEmployeeName(employee);
    const creditcardNumber: string = faker.finance.creditCardNumber('################')
    const securityCode: string = faker.finance.creditCardCVV()
    const expirationDate: string = handleExpirationDate()
    console.log(cardholderName, creditcardNumber, securityCode, expirationDate)
    return employee
    }
}

async function getEmployeeData(employeeId: number) {
  const employee = await employeeRepository.findById(employeeId);
  //   if (!employee) {
  //     return 'não achou';
  //   }
  return employee;
}

// function handleEmployeeName(employee: employeeRepository.Employee) {

// }
function handleEmployeeName({ fullName }: { fullName: string }) {
    //console.log(fullName)
    const sanitizedArray = []
    const fullNameArray = fullName.split(' ')
    for(let i = 0; i < fullNameArray.length; i++) {
        if(i === 0 || i === fullNameArray.length - 1) {
            sanitizedArray.push(fullNameArray[i])
        } else {
            if(fullNameArray[i].length > 3) {
                sanitizedArray.push(fullNameArray[i][0])
            }
        } 
    }
    const sanitizedName = sanitizedArray.join(' ')
    return sanitizedName
}

function handleExpirationDate() {
    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const expiration: string = new Date(year + 1, month, day).toDateString();
    console.log(expiration, today)
    return expiration.toString()
}
