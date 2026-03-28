import { PlayerResource } from '../model/player_resource.model';

export const PLAYER_RESOURCE_REPOSITORY = 'PLAYER_RESOURCE_REPOSITORY';

export interface IPlayerResourceRepository {
    findByPlayerAndResource(playerId: number, resourceId: string): Promise<PlayerResource | null>;
    save(playerResource: PlayerResource): Promise<PlayerResource>;
}
