import { PlayerResource } from '../model/player_resource.model';
import { CreateDataPlayerResource } from './player_resource.typess';

export const PLAYER_RESOURCE_REPOSITORY = 'PLAYER_RESOURCE_REPOSITORY';

export interface IPlayerResourceRepository {
    findByPlayerAndResource(playerId: number, resourceId: string): Promise<PlayerResource | null>;
    save(playerResource: PlayerResource): Promise<PlayerResource>;
    create(playerResource: CreateDataPlayerResource): Promise<PlayerResource>
}
