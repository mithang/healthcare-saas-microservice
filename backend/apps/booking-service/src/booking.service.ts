import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/booking';

@Injectable()
export class BookingService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    // --- Appointments ---
    async getAppointments() {
        return this.appointment.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getAppointment(id: number) {
        return this.appointment.findUnique({ where: { id } });
    }

    async createAppointment(data: any) {
        return this.appointment.create({ data });
    }

    async updateAppointment(id: number, data: any) {
        return this.appointment.update({ where: { id }, data });
    }

    async deleteAppointment(id: number) {
        return this.appointment.delete({ where: { id } });
    }

    // --- Lab Tests ---
    async getLabTests() {
        return this.labTest.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getLabTest(id: number) {
        return this.labTest.findUnique({ where: { id } });
    }

    async createLabTest(data: any) {
        return this.labTest.create({ data });
    }

    async updateLabTest(id: number, data: any) {
        return this.labTest.update({ where: { id }, data });
    }

    async deleteLabTest(id: number) {
        return this.labTest.delete({ where: { id } });
    }

    // --- Pharmacy Orders ---
    async getPharmacyOrders() {
        return this.pharmacyOrder.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getPharmacyOrder(id: number) {
        return this.pharmacyOrder.findUnique({ where: { id } });
    }

    async createPharmacyOrder(data: any) {
        return this.pharmacyOrder.create({ data });
    }

    async updatePharmacyOrder(id: number, data: any) {
        return this.pharmacyOrder.update({ where: { id }, data });
    }

    async deletePharmacyOrder(id: number) {
        return this.pharmacyOrder.delete({ where: { id } });
    }

    // --- Refunds ---
    async getRefundRequests() {
        return this.refundRequest.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getRefundRequest(id: number) {
        return this.refundRequest.findUnique({ where: { id } });
    }

    async createRefundRequest(data: any) {
        return this.refundRequest.create({ data });
    }

    async updateRefundRequest(id: number, data: any) {
        return this.refundRequest.update({ where: { id }, data });
    }

    async deleteRefundRequest(id: number) {
        return this.refundRequest.delete({ where: { id } });
    }
}
