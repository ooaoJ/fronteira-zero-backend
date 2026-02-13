import { JwtService } from "@nestjs/jwt";
import { AccessToken, TokenAuthInterface } from "../interfaces/token.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtAuthService implements TokenAuthInterface{

    constructor(private readonly jwtToken: JwtService){}

    async sign(payload: any): Promise<AccessToken> {
        const accessToken = await this.jwtToken.sign(payload);

        return {accessToken: accessToken}
    }
}