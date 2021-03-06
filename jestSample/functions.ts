import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";
import { Factory } from "./factory"

export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number => a + b, 0);
};

export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

export const asyncSumOfArraySometimesZero = (
  numbers: number[]
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      const databaseFactory = Factory.getDatabaseMock();
      // const database = new DatabaseMock(); // fixme: この関数をテストするには、DatabaseMockの使い方を変える必要がありそう！ヒント：依存性の注入
      databaseFactory.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};

export const getFirstNameThrowIfLong = async (
  maxNameLength: number
): Promise<string> => {
  // const nameApiSerivce = new NameApiService(); // fixme: この関数をテストするには、NameApiServiceの使い方を変える必要がありそう！ヒント：依存性の注入
  const nameApiServiceFactory = Factory.getNameApiService();
  const firstName = await nameApiServiceFactory.getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return firstName;
  
//   let firstName = "";
//   try {
//       firstName = await nameApiSerivce.getFirstName();
    
//       return firstName;
//     } catch (error) {
//       console.log("thorwww")
//       console.log(firstName)
//       console.log(firstName.length)
// }
// console.log("I arraived!")
// return firstName;

};
