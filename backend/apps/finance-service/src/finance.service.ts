import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FinanceService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    // --- Commissions ---
    async getCommissions() {
        return this.commission.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async createCommission(data: any) {
        return this.commission.create({ data });
    }

    async updateCommission(id: number, data: any) {
        return this.commission.update({
            where: { id },
            data,
        });
    }

    async deleteCommission(id: number) {
        return this.commission.delete({
            where: { id },
        });
    }

    // --- Revenue ---
    async getRevenue() {
        return this.revenue.findMany({
            orderBy: { timestamp: 'desc' },
        });
    }

    async createRevenue(data: any) {
        return this.revenue.create({ data });
    }

    async updateRevenue(id: number, data: any) {
        return this.revenue.update({
            where: { id },
            data,
        });
    }

    async deleteRevenue(id: number) {
        return this.revenue.delete({
            where: { id },
        });
    }

    // --- Withdrawals ---
    async getWithdrawals() {
        return this.withdrawal.findMany({
            orderBy: { requestDate: 'desc' },
        });
    }

    async getWithdrawalById(id: number) {
        return this.withdrawal.findUnique({
            where: { id },
        });
    }

    async createWithdrawal(data: any) {
        return this.withdrawal.create({ data });
    }

    async updateWithdrawal(id: number, data: any) {
        return this.withdrawal.update({
            where: { id },
            data,
        });
    }

    async deleteWithdrawal(id: number) {
        return this.withdrawal.delete({
            where: { id },
        });
    }
}
