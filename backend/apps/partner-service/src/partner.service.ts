import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/partner';

@Injectable()
export class PartnerService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    // --- Doctors ---
    async getDoctors() {
        return this.doctor.findMany();
    }

    async getDoctor(id: number) {
        return this.doctor.findUnique({ where: { id } });
    }

    async createDoctor(data: any) {
        return this.doctor.create({ data });
    }

    async updateDoctor(id: number, data: any) {
        return this.doctor.update({ where: { id }, data });
    }

    async deleteDoctor(id: number) {
        return this.doctor.delete({ where: { id } });
    }

    // --- Clinics ---
    async getClinics() {
        return this.clinic.findMany();
    }

    async getClinic(id: number) {
        return this.clinic.findUnique({ where: { id } });
    }

    async createClinic(data: any) {
        return this.clinic.create({ data });
    }

    async updateClinic(id: number, data: any) {
        return this.clinic.update({ where: { id }, data });
    }

    async deleteClinic(id: number) {
        return this.clinic.delete({ where: { id } });
    }

    // --- Hospitals ---
    async getHospitals() {
        return this.hospital.findMany();
    }

    async getHospital(id: number) {
        return this.hospital.findUnique({ where: { id } });
    }

    async createHospital(data: any) {
        return this.hospital.create({ data });
    }

    async updateHospital(id: number, data: any) {
        return this.hospital.update({ where: { id }, data });
    }

    async deleteHospital(id: number) {
        return this.hospital.delete({ where: { id } });
    }

    // --- Pharmacies ---
    async getPharmacies() {
        return this.pharmacy.findMany();
    }

    async getPharmacy(id: number) {
        return this.pharmacy.findUnique({ where: { id } });
    }

    async createPharmacy(data: any) {
        return this.pharmacy.create({ data });
    }

    async updatePharmacy(id: number, data: any) {
        return this.pharmacy.update({ where: { id }, data });
    }

    async deletePharmacy(id: number) {
        return this.pharmacy.delete({ where: { id } });
    }

    // --- Patients ---
    async getPatients() {
        return this.patient.findMany();
    }

    async getPatient(id: number) {
        return this.patient.findUnique({ where: { id } });
    }

    async createPatient(data: any) {
        return this.patient.create({ data });
    }

    async updatePatient(id: number, data: any) {
        return this.patient.update({ where: { id }, data });
    }

    async deletePatient(id: number) {
        return this.patient.delete({ where: { id } });
    }

    // --- Pending Partners (Cross-entity) ---
    async getPendingPartners() {
        const [doctors, clinics, hospitals, pharmacies] = await Promise.all([
            this.doctor.findMany({ where: { isVerified: false } }),
            this.clinic.findMany({ where: { isVerified: false } }),
            this.hospital.findMany({ where: { isVerified: false } }),
            this.pharmacy.findMany({ where: { isVerified: false } }),
        ]);

        return [
            ...doctors.map(d => ({ ...d, type: 'Doctor' })),
            ...clinics.map(c => ({ ...c, type: 'Clinic' })),
            ...hospitals.map(h => ({ ...h, type: 'Hospital' })),
            ...pharmacies.map(p => ({ ...p, type: 'Pharmacy' })),
        ].sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());
    }
}
