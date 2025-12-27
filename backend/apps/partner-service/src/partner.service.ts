import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/partner';

@Injectable()
export class PartnerService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        await this.seedData();
    }

    private async seedData() {
        const doctorsCount = await this.doctor.count();
        if (doctorsCount === 0) {
            await this.doctor.createMany({
                data: [
                    { name: 'Dr. Nguyễn Văn A', specialty: 'Nội khoa', hospital: 'Bệnh viện Chợ Rẫy', phone: '0901234567', isVerified: true },
                    { name: 'Dr. Trần Thị B', specialty: 'Nhi khoa', hospital: 'Bệnh viện Nhi Đồng', phone: '0907654321', isVerified: false },
                ]
            });
        }

        const pharmaciesCount = await this.pharmacy.count();
        if (pharmaciesCount === 0) {
            await this.pharmacy.createMany({
                data: [
                    {
                        name: 'Nhà thuốc Long Châu',
                        address: '123 Nguyễn Văn Linh, Q7, TP.HCM',
                        phone: '0909123456',
                        outletOwner: 'Nguyễn Văn A',
                        memberRank: 'platinum',
                        status: 'active',
                        pointsCMEOnline: 15500,
                        isVerified: true,
                        gppNumber: 'GPP-2024-001'
                    },
                    {
                        name: 'Nhà thuốc Pharmacity',
                        address: '456 Lê Văn Việt, Q9, TP.HCM',
                        phone: '0909234567',
                        outletOwner: 'Trần Thị B',
                        memberRank: 'gold',
                        status: 'active',
                        pointsCMEOnline: 8200,
                        isVerified: true,
                        gppNumber: 'GPP-2024-002'
                    }
                ]
            });
        }

        const pharmacistsCount = await this.pharmacist.count();
        if (pharmacistsCount === 0) {
            await this.pharmacist.createMany({
                data: [
                    {
                        fullName: 'Dược sĩ Nguyễn Văn A',
                        phoneNumber: '0909111222',
                        address: '123 Lê Lợi, Q1, TP.HCM',
                        specialistly: 'Dược lâm sàng',
                        career: 'Dược sĩ chính',
                        pointsCMEOnline: 12000,
                        memberRank: 'gold',
                        status: 'active',
                        isVerified: true
                    },
                    {
                        fullName: 'Dược sĩ Trần Thị B',
                        phoneNumber: '0909333444',
                        address: '456 Nguyễn Huệ, Q1, TP.HCM',
                        specialistly: 'Dược học cổ truyền',
                        career: 'Dược sĩ tư vấn',
                        pointsCMEOnline: 18500,
                        memberRank: 'platinum',
                        status: 'active',
                        isVerified: true
                    }
                ]
            });
        }
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

    // --- Pharmacists ---
    async getPharmacists() {
        return this.pharmacist.findMany();
    }

    async getPharmacist(id: number) {
        return this.pharmacist.findUnique({ where: { id } });
    }

    async createPharmacist(data: any) {
        return this.pharmacist.create({ data });
    }

    async updatePharmacist(id: number, data: any) {
        return this.pharmacist.update({ where: { id }, data });
    }

    async deletePharmacist(id: number) {
        return this.pharmacist.delete({ where: { id } });
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
        const [doctors, clinics, hospitals, pharmacies, pharmacists] = await Promise.all([
            this.doctor.findMany({ where: { isVerified: false } }),
            this.clinic.findMany({ where: { isVerified: false } }),
            this.hospital.findMany({ where: { isVerified: false } }),
            this.pharmacy.findMany({ where: { isVerified: false } }),
            this.pharmacist.findMany({ where: { isVerified: false } }),
        ]);

        return [
            ...doctors.map(d => ({ ...d, type: 'Doctor' })),
            ...clinics.map(c => ({ ...c, type: 'Clinic' })),
            ...hospitals.map(h => ({ ...h, type: 'Hospital' })),
            ...pharmacies.map(p => ({ ...p, type: 'Pharmacy' })),
            ...pharmacists.map(ph => ({ ...ph, type: 'Pharmacist' })),
        ].sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());
    }
}
