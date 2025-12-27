import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { PrismaModule } from './prisma.module';

@Module({
    imports: [
        PrismaModule,
        ElasticsearchModule.register({
            node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
        }),
    ],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule { }
