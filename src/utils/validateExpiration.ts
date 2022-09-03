import dayjs from "dayjs";

export default async function validateExpiration(expirationDate: string) {
  const today = dayjs(new Date()).format("MM/YY").toString();
  const todayArray = today.split("/");
  const expirationDateArray = expirationDate.split("/");
  if (parseInt(todayArray[1]) < parseInt(expirationDateArray[1])) {
    return false;
  }
  if (
    parseInt(todayArray[0]) < parseInt(expirationDateArray[0]) &&
    parseInt(todayArray[1]) === parseInt(expirationDateArray[1])
  ) {
    return false;
  }
  return true;
}
