import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class MarketingService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {    }

    // --- Campaigns ---
    async getCampaigns() {
        return this.prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createCampaign(data: any) {
        return this.prisma.campaign.create({ data });
    }

    async updateCampaign(id: number, data: any) {
        return this.prisma.campaign.update({ where: { id }, data });
    }

    async deleteCampaign(id: number) {
        return this.prisma.campaign.delete({ where: { id } });
    }

    // --- Email Campaigns ---
    async getEmailCampaigns() {
        return this.prisma.emailCampaign.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createEmailCampaign(data: any) {
        return this.prisma.emailCampaign.create({ data });
    }

    async updateEmailCampaign(id: number, data: any) {
        return this.prisma.emailCampaign.update({ where: { id }, data });
    }

    async deleteEmailCampaign(id: number) {
        return this.prisma.emailCampaign.delete({ where: { id } });
    }

    // --- Promotions ---
    async getPromotions() {
        return this.prisma.promotion.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createPromotion(data: any) {
        return this.prisma.promotion.create({ data });
    }

    async updatePromotion(id: number, data: any) {
        return this.prisma.promotion.update({ where: { id }, data });
    }

    async deletePromotion(id: number) {
        return this.prisma.promotion.delete({ where: { id } });
    }

    // --- Push Notifications ---
    async getPushNotifications() {
        return this.prisma.pushNotification.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createPushNotification(data: any) {
        return this.prisma.pushNotification.create({ data });
    }

    async updatePushNotification(id: number, data: any) {
        return this.prisma.pushNotification.update({ where: { id }, data });
    }

    async deletePushNotification(id: number) {
        return this.prisma.pushNotification.delete({ where: { id } });
    }

    // --- Vouchers ---
    async getVouchers() {
        return this.prisma.voucher.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createVoucher(data: any) {
        return this.prisma.voucher.create({ data });
    }

    async updateVoucher(id: number, data: any) {
        return this.prisma.voucher.update({ where: { id }, data });
    }

    async deleteVoucher(id: number) {
        return this.prisma.voucher.delete({ where: { id } });
    }
}
