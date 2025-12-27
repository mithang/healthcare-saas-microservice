import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PrismaService } from './prisma.service';

export enum EntityType {
    DOCTOR = 'DOCTOR',
    CLINIC = 'CLINIC',
    HOSPITAL = 'HOSPITAL',
    PHARMACY = 'PHARMACY',
    PHARMACIST = 'PHARMACIST',
}

@Injectable()
export class SearchService implements OnModuleInit {
    private readonly indexName = 'healthcare_entities';

    constructor(
        private readonly elasticsearchService: ElasticsearchService,
        private readonly prisma: PrismaService,
    ) { }

    async onModuleInit() {
        await this.createIndexIfNotExists();
    }

    private async createIndexIfNotExists() {
        const indexExists = await this.elasticsearchService.indices.exists({
            index: this.indexName,
        });

        if (!indexExists) {
            await this.elasticsearchService.indices.create({
                index: this.indexName,
                mappings: {
                    properties: {
                        entityType: { type: 'keyword' },
                        entityId: { type: 'keyword' },
                        name: { type: 'text', analyzer: 'standard' },
                        specialty: { type: 'text' },
                        qualifications: { type: 'text' },
                        location: { type: 'text' },
                        address: { type: 'text' },
                        phone: { type: 'keyword' },
                        services: { type: 'text' },
                        departments: { type: 'text' },
                        facilities: { type: 'text' },
                        hours: { type: 'text' },
                        pharmacy: { type: 'text' },
                        data: { type: 'object', enabled: false },
                    },
                },
            });
        }
    }

    async indexEntity(entityType: EntityType, entityId: string, name: string, data: any) {
        // Save to database
        const entity = await this.prisma.searchEntity.upsert({
            where: {
                entityType_entityId: {
                    entityType,
                    entityId,
                },
            },
            update: {
                name,
                data,
            },
            create: {
                entityType,
                entityId,
                name,
                data,
            },
        });

        // Index in Elasticsearch
        await this.elasticsearchService.index({
            index: this.indexName,
            id: `${entityType}_${entityId}`,
            document: {
                entityType,
                entityId,
                name,
                ...data,
            },
        });

        return entity;
    }

    async search(query: string, entityType?: EntityType, limit: number = 20) {
        const must: any[] = [
            {
                multi_match: {
                    query,
                    fields: ['name^3', 'specialty^2', 'location', 'address', 'services', 'departments'],
                    fuzziness: 'AUTO',
                },
            },
        ];

        if (entityType) {
            must.push({
                term: { entityType },
            });
        }

        const result = await this.elasticsearchService.search({
            index: this.indexName,
            query: {
                bool: {
                    must,
                },
            },
            size: limit,
        });

        return result.hits.hits.map((hit: any) => ({
            id: hit._id,
            score: hit._score,
            ...hit._source,
        }));
    }

    async autocomplete(query: string, entityType?: EntityType, limit: number = 10) {
        const must: any[] = [
            {
                match_phrase_prefix: {
                    name: {
                        query,
                        max_expansions: 10,
                    },
                },
            },
        ];

        if (entityType) {
            must.push({
                term: { entityType },
            });
        }

        const result = await this.elasticsearchService.search({
            index: this.indexName,
            query: {
                bool: {
                    must,
                },
            },
            size: limit,
        });

        return result.hits.hits.map((hit: any) => hit._source.name);
    }

    async deleteEntity(entityType: EntityType, entityId: string) {
        // Delete from database
        await this.prisma.searchEntity.delete({
            where: {
                entityType_entityId: {
                    entityType,
                    entityId,
                },
            },
        });

        // Delete from Elasticsearch
        await this.elasticsearchService.delete({
            index: this.indexName,
            id: `${entityType}_${entityId}`,
        });

        return { success: true };
    }

    async getAllEntities(entityType?: EntityType) {
        return this.prisma.searchEntity.findMany({
            where: entityType ? { entityType } : undefined,
            orderBy: { name: 'asc' },
        });
    }
}
