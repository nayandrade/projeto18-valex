import * as companyRepository from "../repositories/companyRepository";

export default async function validateCompany(apiKey: string) {
  try {
    const company = await companyRepository.findByApiKey(apiKey);
    if (company.id) {
      return true;
    }
  } catch (error) {
    throw "Company not found";
  }
}
