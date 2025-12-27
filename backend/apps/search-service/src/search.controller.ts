import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService, EntityType } from './search.service';

@Controller()
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @MessagePattern({ cmd: 'search.index' })
    indexEntity(@Payload() payload: { entityType: EntityType; entityId: string; name: string; data: any }) {
        return this.searchService.indexEntity(payload.entityType, payload.entityId, payload.name, payload.data);
    }

    @MessagePattern({ cmd: 'search.query' })
    search(@Payload() payload: { query: string; entityType?: EntityType; limit?: number }) {
        return this.searchService.search(payload.query, payload.entityType, payload.limit);
    }

    @MessagePattern({ cmd: 'search.autocomplete' })
    autocomplete(@Payload() payload: { query: string; entityType?: EntityType; limit?: number }) {
        return this.searchService.autocomplete(payload.query, payload.entityType, payload.limit);
    }

    @MessagePattern({ cmd: 'search.delete' })
    deleteEntity(@Payload() payload: { entityType: EntityType; entityId: string }) {
        return this.searchService.deleteEntity(payload.entityType, payload.entityId);
    }

    @MessagePattern({ cmd: 'search.getAll' })
    getAllEntities(@Payload() entityType?: EntityType) {
        return this.searchService.getAllEntities(entityType);
    }
}
