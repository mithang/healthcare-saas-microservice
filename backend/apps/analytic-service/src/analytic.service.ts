import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AnalyticService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        await this.seedData();
    }

    private async seedData() {
        const keywordCount = await this.searchKeyword.count();
        if (keywordCount === 0) {
            await this.searchKeyword.createMany({
                data: [
                    { keyword: 'dau-dau', keywordVN: 'đau đầu', times: 15420 },
                    { keyword: 'cam-cum', keywordVN: 'cảm cúm', times: 12350 },
                    { keyword: 'tieu-duong', keywordVN: 'tiểu đường', times: 9870 },
                    { keyword: 'huyet-ap', keywordVN: 'huyết áp', times: 8560 },
                    { keyword: 'dau-bung', keywordVN: 'đau bụng', times: 7230 },
                ],
            });
        }

        const hashtagCount = await this.searchHashtag.count();
        if (hashtagCount === 0) {
            await this.searchHashtag.createMany({
                data: [
                    { hashtag: 'suckhoe', hashtagVN: 'sức khỏe', times: 25600 },
                    { hashtag: 'duocsi', hashtagVN: 'dược sĩ', times: 18900 },
                    { hashtag: 'nhathuoc', hashtagVN: 'nhà thuốc', times: 14500 },
                    { hashtag: 'tuvan', hashtagVN: 'tư vấn', times: 12300 },
                    { hashtag: 'dieutri', hashtagVN: 'điều trị', times: 10800 },
                ],
            });
        }
    }

    async getKeywords() {
        return this.searchKeyword.findMany({
            orderBy: { times: 'desc' },
        });
    }

    async getHashtags() {
        return this.searchHashtag.findMany({
            orderBy: { times: 'desc' },
        });
    }

    async updateKeywordStatus(id: number, status: boolean) {
        return this.searchKeyword.update({
            where: { id },
            data: { status },
        });
    }

    async updateHashtagStatus(id: number, status: boolean) {
        return this.searchHashtag.update({
            where: { id },
            data: { status },
        });
    }
}
