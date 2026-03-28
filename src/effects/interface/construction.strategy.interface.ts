export interface IConstructionStrategy {
    apply(payload: any): Promise<void>
}