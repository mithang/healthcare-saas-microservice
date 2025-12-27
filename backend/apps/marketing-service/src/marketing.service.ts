import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/marketing';

@Injectable()
export class MarketingService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    // --- Campaigns ---
    async getCampaigns() {
        return this.campaign.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createCampaign(data: any) {
        return this.campaign.create({ data });
    }

    async updateCampaign(id: number, data: any) {
        return this.campaign.update({ where: { id }, data });
    }

    async deleteCampaign(id: number) {
        return this.campaign.delete({ where: { id } });
    }

    // --- Email Campaigns ---
    async getEmailCampaigns() {
        return this.emailCampaign.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createEmailCampaign(data: any) {
        return this.emailCampaign.create({ data });
    }

    async updateEmailCampaign(id: number, data: any) {
        return this.emailCampaign.update({ where: { id }, data });
    }

    async deleteEmailCampaign(id: number) {
        return this.emailCampaign.delete({ where: { id } });
    }

    // --- Promotions ---
    async getPromotions() {
        return this.promotion.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createPromotion(data: any) {
        return this.promotion.create({ data });
    }

    async updatePromotion(id: number, data: any) {
        return this.promotion.update({ where: { id }, data });
    }

    async deletePromotion(id: number) {
        return this.promotion.delete({ where: { id } });
    }

    // --- Push Notifications ---
    async getPushNotifications() {
        return this.pushNotification.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createPushNotification(data: any) {
        return this.pushNotification.create({ data });
    }

    async updatePushNotification(id: number, data: any) {
        return this.pushNotification.update({ where: { id }, data });
    }

    async deletePushNotification(id: number) {
        return this.pushNotification.delete({ where: { id } });
    }

    // --- Vouchers ---
    async getVouchers() {
        return this.voucher.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createVoucher(data: any) {
        return this.voucher.create({ data });
    }

    async updateVoucher(id: number, data: any) {
        return this.voucher.update({ where: { id }, data });
    }

    async deleteVoucher(id: number) {
        return this.voucher.delete({ where: { id } });
    }
}
