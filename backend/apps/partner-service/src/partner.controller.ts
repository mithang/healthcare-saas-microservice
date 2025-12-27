import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PartnerService } from './partner.service';

@Controller()
export class PartnerController {
    constructor(private readonly partnerService: PartnerService) { }

    // --- Doctors ---
    @MessagePattern({ cmd: 'get_doctors' })
    getDoctors() {
        return this.partnerService.getDoctors();
    }

    @MessagePattern({ cmd: 'get_doctor' })
    getDoctor(@Payload() id: number) {
        return this.partnerService.getDoctor(id);
    }

    @MessagePattern({ cmd: 'create_doctor' })
    createDoctor(@Payload() data: any) {
        return this.partnerService.createDoctor(data);
    }

    @MessagePattern({ cmd: 'update_doctor' })
    updateDoctor(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updateDoctor(id, data);
    }

    @MessagePattern({ cmd: 'delete_doctor' })
    deleteDoctor(@Payload() id: number) {
        return this.partnerService.deleteDoctor(id);
    }

    // --- Clinics ---
    @MessagePattern({ cmd: 'get_clinics' })
    getClinics() {
        return this.partnerService.getClinics();
    }

    @MessagePattern({ cmd: 'get_clinic' })
    getClinic(@Payload() id: number) {
        return this.partnerService.getClinic(id);
    }

    @MessagePattern({ cmd: 'create_clinic' })
    createClinic(@Payload() data: any) {
        return this.partnerService.createClinic(data);
    }

    @MessagePattern({ cmd: 'update_clinic' })
    updateClinic(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updateClinic(id, data);
    }

    @MessagePattern({ cmd: 'delete_clinic' })
    deleteClinic(@Payload() id: number) {
        return this.partnerService.deleteClinic(id);
    }

    // --- Hospitals ---
    @MessagePattern({ cmd: 'get_hospitals' })
    getHospitals() {
        return this.partnerService.getHospitals();
    }

    @MessagePattern({ cmd: 'get_hospital' })
    getHospital(@Payload() id: number) {
        return this.partnerService.getHospital(id);
    }

    @MessagePattern({ cmd: 'create_hospital' })
    createHospital(@Payload() data: any) {
        return this.partnerService.createHospital(data);
    }

    @MessagePattern({ cmd: 'update_hospital' })
    updateHospital(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updateHospital(id, data);
    }

    @MessagePattern({ cmd: 'delete_hospital' })
    deleteHospital(@Payload() id: number) {
        return this.partnerService.deleteHospital(id);
    }

    // --- Pharmacies ---
    @MessagePattern({ cmd: 'get_pharmacies' })
    getPharmacies() {
        return this.partnerService.getPharmacies();
    }

    @MessagePattern({ cmd: 'get_pharmacy' })
    getPharmacy(@Payload() id: number) {
        return this.partnerService.getPharmacy(id);
    }

    @MessagePattern({ cmd: 'create_pharmacy' })
    createPharmacy(@Payload() data: any) {
        return this.partnerService.createPharmacy(data);
    }

    @MessagePattern({ cmd: 'update_pharmacy' })
    updatePharmacy(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updatePharmacy(id, data);
    }

    @MessagePattern({ cmd: 'delete_pharmacy' })
    deletePharmacy(@Payload() id: number) {
        return this.partnerService.deletePharmacy(id);
    }

    // --- Pharmacists ---
    @MessagePattern({ cmd: 'get_pharmacists' })
    getPharmacists() {
        return this.partnerService.getPharmacists();
    }

    @MessagePattern({ cmd: 'get_pharmacist' })
    getPharmacist(@Payload() id: number) {
        return this.partnerService.getPharmacist(id);
    }

    @MessagePattern({ cmd: 'create_pharmacist' })
    createPharmacist(@Payload() data: any) {
        return this.partnerService.createPharmacist(data);
    }

    @MessagePattern({ cmd: 'update_pharmacist' })
    updatePharmacist(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updatePharmacist(id, data);
    }

    @MessagePattern({ cmd: 'delete_pharmacist' })
    deletePharmacist(@Payload() id: number) {
        return this.partnerService.deletePharmacist(id);
    }

    // --- Patients ---
    @MessagePattern({ cmd: 'get_patients' })
    getPatients() {
        return this.partnerService.getPatients();
    }

    @MessagePattern({ cmd: 'get_patient' })
    getPatient(@Payload() id: number) {
        return this.partnerService.getPatient(id);
    }

    @MessagePattern({ cmd: 'create_patient' })
    createPatient(@Payload() data: any) {
        return this.partnerService.createPatient(data);
    }

    @MessagePattern({ cmd: 'update_patient' })
    updatePatient(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updatePatient(id, data);
    }

    @MessagePattern({ cmd: 'delete_patient' })
    async deletePatient(@Payload() id: number) {
        return this.partnerService.deletePatient(id);
    }

    @MessagePattern({ cmd: 'get_pending_partners' })
    async getPendingPartners() {
        return this.partnerService.getPendingPartners();
    }
}
