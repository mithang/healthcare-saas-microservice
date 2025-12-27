import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class AnalyticService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() {
        await this.seedData();
    }

    private async seedData() {
        const keywordCount = await this.prisma.searchKeyword.count();
        if (keywordCount === 0) {
            await this.prisma.searchKeyword.createMany({
                data: [
                    { keyword: 'dau-dau', keywordVN: 'đau đầu', times: 15420 },
                    { keyword: 'cam-cum', keywordVN: 'cảm cúm', times: 12350 },
                    { keyword: 'tieu-duong', keywordVN: 'tiểu đường', times: 9870 },
                    { keyword: 'huyet-ap', keywordVN: 'huyết áp', times: 8560 },
                    { keyword: 'dau-bung', keywordVN: 'đau bụng', times: 7230 },
                ],
            });
        }

        const hashtagCount = await this.prisma.searchHashtag.count();
        if (hashtagCount === 0) {
            await this.prisma.searchHashtag.createMany({
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
        return this.prisma.searchKeyword.findMany({
            orderBy: { times: 'desc' },
        });
    }

    async getHashtags() {
        return this.prisma.searchHashtag.findMany({
            orderBy: { times: 'desc' },
        });
    }

    async updateKeywordStatus(id: number, status: boolean) {
        return this.prisma.searchKeyword.update({
            where: { id },
            data: { status },
        });
    }

    async updateHashtagStatus(id: number, status: boolean) {
        return this.prisma.searchHashtag.update({
            where: { id },
            data: { status },
        });
    }
}
