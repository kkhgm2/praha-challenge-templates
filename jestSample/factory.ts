import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";

export class Factory{
    static getDatabaseMock(){
        return new DatabaseMock();
    }
    static getNameApiService(){
        return new NameApiService();
    }
}
