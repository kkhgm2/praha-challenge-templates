import { sumOfArray } from '../functions'

describe('sumOfArray', () => {

    test("success sumOfArray", () => {
        expect(sumOfArray([1, 2, 3])).toBe(6);
    })
    
    test("input string array sumOfArray is going to throw", () => {
        //関数の中のコードはラップしてください。そうしなければエラーが補足されず、アサーションは失敗します。
        //https://jestjs.io/docs/ja/expect#tothrowerror
        // 元コード
        // expect(() => sumOfArray([])).toThrow();
        // 修正コード
        expect(sumOfArray([])).toBe(0);
    })
    
    //引数が１つの時は？
    test("input string array sumOfArray is going to throw", () => {
        expect(sumOfArray([1])).toBe(1);
    })
})

import { asyncSumOfArray } from '../functions'
test("success asyncSumOfArray", () => {
    return asyncSumOfArray([1, 2, 3]).then(sumeResult => {
        expect(sumeResult).toBe(6);
    })
})

import { asyncSumOfArraySometimesZero } from '../functions'
import { DatabaseMock } from '../util/index'
const database = new DatabaseMock();
describe('asyncSumOfArraySometimesZero test', () => {

    //通常時の想定（save メソッドがthrow しない時）
    test("success asyncSumOfArraySometimesZero", () => {
        // save をオーバーライド
        const dbMock = jest.spyOn(DatabaseMock.prototype, 'save').mockReturnValue();
        
        return  asyncSumOfArraySometimesZero([4,5,6], database)
        .then(sumeResult => {
            expect(sumeResult).toBe(15);
        })
    })
      
    // 例外を返すモックを作成
    test("faile asyncSumOfArraySometimesZero", () => {
        // save をオーバーライド
        const dbMock = jest.spyOn(DatabaseMock.prototype, 'save')
        .mockImplementation(() => { throw new Error('faile!')});
        
        // asyncSumOfArraySometimesZero 失敗時、resolve使用されており、rejectではない。
        // 失敗でなく、成功として返されている！！！
        return expect(asyncSumOfArraySometimesZero([1,2,3], database)).resolves.toBe(0);
    })
})
    
import { getFirstNameThrowIfLong } from '../functions'
import { NameApiService } from '../nameApiService'
const nameApiSerivce = new NameApiService();

describe('getFirstNameThrowIfLong test', () => {

    test("success getFirstNameThrowIfLong", () => {
        
        // NameApiService, getFirstNameThrowIfLong成功時
        // 成功時の値を想定
        const getNameMock = 
        jest.spyOn(NameApiService.prototype, 'getFirstName').mockResolvedValue("koki");
        
        return expect(getFirstNameThrowIfLong(5, nameApiSerivce)).resolves.toBe("koki");
    })

    test("failed getFirstNameThrowIfLong", () => {
        
        // NameApiService：成功, getFirstNameThrowIfLong：失敗時
        const getNameMock = 
        jest.spyOn(NameApiService.prototype, 'getFirstName').mockResolvedValue("koki");
        
        //getFirstNameThrowIfLongのif 文でthrow 想定
        return expect(getFirstNameThrowIfLong(3, nameApiSerivce)).rejects.toThrow('first_name too long');
    })
    
    test("failed NameApiService", () => {
        // 失敗の値を想定
        // NameApiService, getFirstNameThrowIfLong 失敗時
        // NameApiService getFirstName throw を想定
        const getNameMock = 
        jest.spyOn(NameApiService.prototype, 'getFirstName')
        .mockImplementation(() => { throw new Error('faile!')});
        
        return expect(getFirstNameThrowIfLong(5, nameApiSerivce)).rejects.toThrow('faile!');
    })
})
    