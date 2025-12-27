import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class BookingService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {    }

    // --- Appointments ---
    async getAppointments() {
        return this.prisma.appointment.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getAppointment(id: number) {
        return this.prisma.appointment.findUnique({ where: { id } });
    }

    async createAppointment(data: any) {
        return this.prisma.appointment.create({ data });
    }

    async updateAppointment(id: number, data: any) {
        return this.prisma.appointment.update({ where: { id }, data });
    }

    async deleteAppointment(id: number) {
        return this.prisma.appointment.delete({ where: { id } });
    }

    // --- Lab Tests ---
    async getLabTests() {
        return this.prisma.labTest.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getLabTest(id: number) {
        return this.prisma.labTest.findUnique({ where: { id } });
    }

    async createLabTest(data: any) {
        return this.prisma.labTest.create({ data });
    }

    async updateLabTest(id: number, data: any) {
        return this.prisma.labTest.update({ where: { id }, data });
    }

    async deleteLabTest(id: number) {
        return this.prisma.labTest.delete({ where: { id } });
    }

    // --- Pharmacy Orders ---
    async getPharmacyOrders() {
        return this.prisma.pharmacyOrder.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getPharmacyOrder(id: number) {
        return this.prisma.pharmacyOrder.findUnique({ where: { id } });
    }

    async createPharmacyOrder(data: any) {
        return this.prisma.pharmacyOrder.create({ data });
    }

    async updatePharmacyOrder(id: number, data: any) {
        return this.prisma.pharmacyOrder.update({ where: { id }, data });
    }

    async deletePharmacyOrder(id: number) {
        return this.prisma.pharmacyOrder.delete({ where: { id } });
    }

    // --- Refunds ---
    async getRefundRequests() {
        return this.prisma.refundRequest.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getRefundRequest(id: number) {
        return this.prisma.refundRequest.findUnique({ where: { id } });
    }

    async createRefundRequest(data: any) {
        return this.prisma.refundRequest.create({ data });
    }

    async updateRefundRequest(id: number, data: any) {
        return this.prisma.refundRequest.update({ where: { id }, data });
    }

    async deleteRefundRequest(id: number) {
        return this.prisma.refundRequest.delete({ where: { id } });
    }
}
