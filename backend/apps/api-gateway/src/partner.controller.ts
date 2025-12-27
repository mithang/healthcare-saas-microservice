import { Controller, Get, Post, Put, Delete, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('education/partners')
export class PartnerController {
    constructor(@Inject('PARTNER_SERVICE') private readonly client: ClientProxy) { }

    // --- Doctors ---
    @Get('doctors')
    getDoctors() {
        return this.client.send({ cmd: 'get_doctors' }, {});
    }

    @Get('doctors/:id')
    getDoctor(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_doctor' }, parseInt(id));
    }

    @Post('doctors')
    createDoctor(@Body() data: any) {
        return this.client.send({ cmd: 'create_doctor' }, data);
    }

    @Put('doctors/:id')
    updateDoctor(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_doctor' }, { id: parseInt(id), data });
    }

    @Delete('doctors/:id')
    deleteDoctor(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_doctor' }, parseInt(id));
    }

    // --- Clinics ---
    @Get('clinics')
    getClinics() {
        return this.client.send({ cmd: 'get_clinics' }, {});
    }

    @Get('clinics/:id')
    getClinic(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_clinic' }, parseInt(id));
    }

    @Post('clinics')
    createClinic(@Body() data: any) {
        return this.client.send({ cmd: 'create_clinic' }, data);
    }

    @Put('clinics/:id')
    updateClinic(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_clinic' }, { id: parseInt(id), data });
    }

    @Delete('clinics/:id')
    deleteClinic(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_clinic' }, parseInt(id));
    }

    // --- Hospitals ---
    @Get('hospitals')
    getHospitals() {
        return this.client.send({ cmd: 'get_hospitals' }, {});
    }

    @Get('hospitals/:id')
    getHospital(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_hospital' }, parseInt(id));
    }

    @Post('hospitals')
    createHospital(@Body() data: any) {
        return this.client.send({ cmd: 'create_hospital' }, data);
    }

    @Put('hospitals/:id')
    updateHospital(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_hospital' }, { id: parseInt(id), data });
    }

    @Delete('hospitals/:id')
    deleteHospital(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_hospital' }, parseInt(id));
    }

    // --- Pharmacies ---
    @Get('pharmacies')
    getPharmacies() {
        return this.client.send({ cmd: 'get_pharmacies' }, {});
    }

    @Get('pharmacies/:id')
    getPharmacy(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_pharmacy' }, parseInt(id));
    }

    @Post('pharmacies')
    createPharmacy(@Body() data: any) {
        return this.client.send({ cmd: 'create_pharmacy' }, data);
    }

    @Put('pharmacies/:id')
    updatePharmacy(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_pharmacy' }, { id: parseInt(id), data });
    }

    @Delete('pharmacies/:id')
    deletePharmacy(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_pharmacy' }, parseInt(id));
    }

    // --- Pharmacists ---
    @Get('pharmacists')
    getPharmacists() {
        return this.client.send({ cmd: 'get_pharmacists' }, {});
    }

    @Get('pharmacists/:id')
    getPharmacist(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_pharmacist' }, parseInt(id));
    }

    @Post('pharmacists')
    createPharmacist(@Body() data: any) {
        return this.client.send({ cmd: 'create_pharmacist' }, data);
    }

    @Put('pharmacists/:id')
    updatePharmacist(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_pharmacist' }, { id: parseInt(id), data });
    }

    @Delete('pharmacists/:id')
    deletePharmacist(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_pharmacist' }, parseInt(id));
    }

    // --- Patients ---
    @Get('patients')
    getPatients() {
        return this.client.send({ cmd: 'get_patients' }, {});
    }

    @Get('patients/:id')
    getPatient(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_patient' }, parseInt(id));
    }

    @Post('patients')
    createPatient(@Body() data: any) {
        return this.client.send({ cmd: 'create_patient' }, data);
    }

    @Put('patients/:id')
    updatePatient(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_patient' }, { id: parseInt(id), data });
    }

    @Delete('patients/:id')
    deletePatient(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_patient' }, parseInt(id));
    }

    @Get('pending')
    getPendingPartners() {
        return this.client.send({ cmd: 'get_pending_partners' }, {});
    }
}
