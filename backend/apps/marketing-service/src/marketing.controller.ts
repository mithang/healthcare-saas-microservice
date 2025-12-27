import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MarketingService } from './marketing.service';

@Controller()
export class MarketingController {
    constructor(private readonly marketingService: MarketingService) { }

    // --- Campaigns ---
    @MessagePattern({ cmd: 'get_campaigns' })
    getCampaigns() {
        return this.marketingService.getCampaigns();
    }

    @MessagePattern({ cmd: 'create_campaign' })
    createCampaign(@Payload() data: any) {
        return this.marketingService.createCampaign(data);
    }

    @MessagePattern({ cmd: 'update_campaign' })
    updateCampaign(@Payload() payload: { id: number, data: any }) {
        return this.marketingService.updateCampaign(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_campaign' })
    deleteCampaign(@Payload() id: number) {
        return this.marketingService.deleteCampaign(id);
    }

    // --- Email Campaigns ---
    @MessagePattern({ cmd: 'get_email_campaigns' })
    getEmailCampaigns() {
        return this.marketingService.getEmailCampaigns();
    }

    @MessagePattern({ cmd: 'create_email_campaign' })
    createEmailCampaign(@Payload() data: any) {
        return this.marketingService.createEmailCampaign(data);
    }

    @MessagePattern({ cmd: 'update_email_campaign' })
    updateEmailCampaign(@Payload() payload: { id: number, data: any }) {
        return this.marketingService.updateEmailCampaign(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_email_campaign' })
    deleteEmailCampaign(@Payload() id: number) {
        return this.marketingService.deleteEmailCampaign(id);
    }

    // --- Promotions ---
    @MessagePattern({ cmd: 'get_promotions' })
    getPromotions() {
        return this.marketingService.getPromotions();
    }

    @MessagePattern({ cmd: 'create_promotion' })
    createPromotion(@Payload() data: any) {
        return this.marketingService.createPromotion(data);
    }

    @MessagePattern({ cmd: 'update_promotion' })
    updatePromotion(@Payload() payload: { id: number, data: any }) {
        return this.marketingService.updatePromotion(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_promotion' })
    deletePromotion(@Payload() id: number) {
        return this.marketingService.deletePromotion(id);
    }

    // --- Push Notifications ---
    @MessagePattern({ cmd: 'get_push_notifications' })
    getPushNotifications() {
        return this.marketingService.getPushNotifications();
    }

    @MessagePattern({ cmd: 'create_push_notification' })
    createPushNotification(@Payload() data: any) {
        return this.marketingService.createPushNotification(data);
    }

    @MessagePattern({ cmd: 'update_push_notification' })
    updatePushNotification(@Payload() payload: { id: number, data: any }) {
        return this.marketingService.updatePushNotification(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_push_notification' })
    deletePushNotification(@Payload() id: number) {
        return this.marketingService.deletePushNotification(id);
    }

    // --- Vouchers ---
    @MessagePattern({ cmd: 'get_vouchers' })
    getVouchers() {
        return this.marketingService.getVouchers();
    }

    @MessagePattern({ cmd: 'create_voucher' })
    createVoucher(@Payload() data: any) {
        return this.marketingService.createVoucher(data);
    }

    @MessagePattern({ cmd: 'update_voucher' })
    updateVoucher(@Payload() payload: { id: number, data: any }) {
        return this.marketingService.updateVoucher(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_voucher' })
    deleteVoucher(@Payload() id: number) {
        return this.marketingService.deleteVoucher(id);
    }
}
