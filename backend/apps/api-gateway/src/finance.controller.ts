import { Controller, Get, Post, Put, Delete, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('finance')
export class FinanceController {
    constructor(@Inject('FINANCE_SERVICE') private readonly client: ClientProxy) { }

    // --- Commissions ---
    @Get('commissions')
    getCommissions() {
        return this.client.send({ cmd: 'get_commissions' }, {});
    }

    @Post('commissions')
    createCommission(@Body() data: any) {
        return this.client.send({ cmd: 'create_commission' }, data);
    }

    @Put('commissions/:id')
    updateCommission(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_commission' }, { id: parseInt(id), data });
    }

    @Delete('commissions/:id')
    deleteCommission(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_commission' }, parseInt(id));
    }

    // --- Revenue ---
    @Get('revenue')
    getRevenue() {
        return this.client.send({ cmd: 'get_revenue' }, {});
    }

    @Post('revenue')
    createRevenue(@Body() data: any) {
        return this.client.send({ cmd: 'create_revenue' }, data);
    }

    @Put('revenue/:id')
    updateRevenue(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_revenue' }, { id: parseInt(id), data });
    }

    @Delete('revenue/:id')
    deleteRevenue(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_revenue' }, parseInt(id));
    }

    // --- Withdrawals ---
    @Get('withdrawals')
    getWithdrawals() {
        return this.client.send({ cmd: 'get_withdrawals' }, {});
    }

    @Get('withdrawals/:id')
    getWithdrawalById(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_withdrawal_by_id' }, parseInt(id));
    }

    @Post('withdrawals')
    createWithdrawal(@Body() data: any) {
        return this.client.send({ cmd: 'create_withdrawal' }, data);
    }

    @Put('withdrawals/:id')
    updateWithdrawal(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_withdrawal' }, { id: parseInt(id), data });
    }

    @Delete('withdrawals/:id')
    deleteWithdrawal(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_withdrawal' }, parseInt(id));
    }
}
