export interface AccessToken{
    accessToken: any
}

export interface TokenAuthInterface {
    sign(payload: any): Promise<AccessToken>
}