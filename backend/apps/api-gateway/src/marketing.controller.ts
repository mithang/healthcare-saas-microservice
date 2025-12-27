import { Controller, Get, Post, Put, Delete, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('marketing')
export class MarketingController {
    constructor(@Inject('MARKETING_SERVICE') private readonly client: ClientProxy) { }

    // --- Campaigns ---
    @Get('campaigns')
    getCampaigns() {
        return this.client.send({ cmd: 'get_campaigns' }, {});
    }

    @Post('campaigns')
    createCampaign(@Body() data: any) {
        return this.client.send({ cmd: 'create_campaign' }, data);
    }

    @Put('campaigns/:id')
    updateCampaign(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_campaign' }, { id: parseInt(id), data });
    }

    @Delete('campaigns/:id')
    deleteCampaign(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_campaign' }, parseInt(id));
    }

    // --- Emails ---
    @Get('emails')
    getEmailCampaigns() {
        return this.client.send({ cmd: 'get_email_campaigns' }, {});
    }

    @Post('emails')
    createEmailCampaign(@Body() data: any) {
        return this.client.send({ cmd: 'create_email_campaign' }, data);
    }

    @Put('emails/:id')
    updateEmailCampaign(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_email_campaign' }, { id: parseInt(id), data });
    }

    @Delete('emails/:id')
    deleteEmailCampaign(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_email_campaign' }, parseInt(id));
    }

    // --- Promotions ---
    @Get('promotions')
    getPromotions() {
        return this.client.send({ cmd: 'get_promotions' }, {});
    }

    @Post('promotions')
    createPromotion(@Body() data: any) {
        return this.client.send({ cmd: 'create_promotion' }, data);
    }

    @Put('promotions/:id')
    updatePromotion(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_promotion' }, { id: parseInt(id), data });
    }

    @Delete('promotions/:id')
    deletePromotion(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_promotion' }, parseInt(id));
    }

    // --- Push Notifications ---
    @Get('push-notifications')
    getPushNotifications() {
        return this.client.send({ cmd: 'get_push_notifications' }, {});
    }

    @Post('push-notifications')
    createPushNotification(@Body() data: any) {
        return this.client.send({ cmd: 'create_push_notification' }, data);
    }

    @Put('push-notifications/:id')
    updatePushNotification(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_push_notification' }, { id: parseInt(id), data });
    }

    @Delete('push-notifications/:id')
    deletePushNotification(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_push_notification' }, parseInt(id));
    }

    // --- Vouchers ---
    @Get('vouchers')
    getVouchers() {
        return this.client.send({ cmd: 'get_vouchers' }, {});
    }

    @Post('vouchers')
    createVoucher(@Body() data: any) {
        return this.client.send({ cmd: 'create_voucher' }, data);
    }

    @Put('vouchers/:id')
    updateVoucher(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_voucher' }, { id: parseInt(id), data });
    }

    @Delete('vouchers/:id')
    deleteVoucher(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_voucher' }, parseInt(id));
    }
}
