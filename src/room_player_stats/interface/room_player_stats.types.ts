export enum PlayerStatus {
    DEF = 'def',
    ATK = 'atk',
    NOISE = 'noise'
}

export type UpdatedStats = {
    roomPlayerId: number;
    status: PlayerStatus;
    value: number;
    effectType?: string
}
