import { Injectable } from "@nestjs/common";
import { dataCompare, HashInterface } from "../interfaces/hash.interface";
import * as bcrypt from "bcrypt"

@Injectable()
export class BcriptHash implements HashInterface{
    async create(data: string): Promise<string> {
        const salts = 10

        return await bcrypt.hash(data, salts);
    }

   async compare(data: dataCompare): Promise<boolean> {
        return await bcrypt.compare(data.password, data.userPassword);
    }

}