import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class FinanceService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {    }

    // --- Commissions ---
    async getCommissions() {
        return this.prisma.commission.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async createCommission(data: any) {
        return this.prisma.commission.create({ data });
    }

    async updateCommission(id: number, data: any) {
        return this.prisma.commission.update({
            where: { id },
            data,
        });
    }

    async deleteCommission(id: number) {
        return this.prisma.commission.delete({
            where: { id },
        });
    }

    // --- Revenue ---
    async getRevenue() {
        return this.prisma.revenue.findMany({
            orderBy: { timestamp: 'desc' },
        });
    }

    async createRevenue(data: any) {
        return this.prisma.revenue.create({ data });
    }

    async updateRevenue(id: number, data: any) {
        return this.prisma.revenue.update({
            where: { id },
            data,
        });
    }

    async deleteRevenue(id: number) {
        return this.prisma.revenue.delete({
            where: { id },
        });
    }

    // --- Withdrawals ---
    async getWithdrawals() {
        return this.prisma.withdrawal.findMany({
            orderBy: { requestDate: 'desc' },
        });
    }

    async getWithdrawalById(id: number) {
        return this.prisma.withdrawal.findUnique({
            where: { id },
        });
    }

    async createWithdrawal(data: any) {
        return this.prisma.withdrawal.create({ data });
    }

    async updateWithdrawal(id: number, data: any) {
        return this.prisma.withdrawal.update({
            where: { id },
            data,
        });
    }

    async deleteWithdrawal(id: number) {
        return this.prisma.withdrawal.delete({
            where: { id },
        });
    }
}
