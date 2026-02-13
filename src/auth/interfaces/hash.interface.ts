export interface dataCompare {
    userPassword: string
    password: string
}

export interface HashInterface {
    create(data: string): Promise<string>,
    compare(data: dataCompare): Promise<boolean>
}