import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingService } from './booking.service';

@Controller()
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    // --- Appointments ---
    @MessagePattern({ cmd: 'get_appointments' })
    getAppointments() {
        return this.bookingService.getAppointments();
    }

    @MessagePattern({ cmd: 'get_appointment' })
    getAppointment(@Payload() id: number) {
        return this.bookingService.getAppointment(id);
    }

    @MessagePattern({ cmd: 'create_appointment' })
    createAppointment(@Payload() data: any) {
        return this.bookingService.createAppointment(data);
    }

    @MessagePattern({ cmd: 'update_appointment' })
    updateAppointment(@Payload() payload: { id: number, data: any }) {
        return this.bookingService.updateAppointment(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_appointment' })
    deleteAppointment(@Payload() id: number) {
        return this.bookingService.deleteAppointment(id);
    }

    // --- Lab Tests ---
    @MessagePattern({ cmd: 'get_lab_tests' })
    getLabTests() {
        return this.bookingService.getLabTests();
    }

    @MessagePattern({ cmd: 'get_lab_test' })
    getLabTest(@Payload() id: number) {
        return this.bookingService.getLabTest(id);
    }

    @MessagePattern({ cmd: 'create_lab_test' })
    createLabTest(@Payload() data: any) {
        return this.bookingService.createLabTest(data);
    }

    @MessagePattern({ cmd: 'update_lab_test' })
    updateLabTest(@Payload() payload: { id: number, data: any }) {
        return this.bookingService.updateLabTest(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_lab_test' })
    deleteLabTest(@Payload() id: number) {
        return this.bookingService.deleteLabTest(id);
    }

    // --- Pharmacy Orders ---
    @MessagePattern({ cmd: 'get_pharmacy_orders' })
    getPharmacyOrders() {
        return this.bookingService.getPharmacyOrders();
    }

    @MessagePattern({ cmd: 'get_pharmacy_order' })
    getPharmacyOrder(@Payload() id: number) {
        return this.bookingService.getPharmacyOrder(id);
    }

    @MessagePattern({ cmd: 'create_pharmacy_order' })
    createPharmacyOrder(@Payload() data: any) {
        return this.bookingService.createPharmacyOrder(data);
    }

    @MessagePattern({ cmd: 'update_pharmacy_order' })
    updatePharmacyOrder(@Payload() payload: { id: number, data: any }) {
        return this.bookingService.updatePharmacyOrder(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_pharmacy_order' })
    deletePharmacyOrder(@Payload() id: number) {
        return this.bookingService.deletePharmacyOrder(id);
    }

    // --- Refunds ---
    @MessagePattern({ cmd: 'get_refund_requests' })
    getRefundRequests() {
        return this.bookingService.getRefundRequests();
    }

    @MessagePattern({ cmd: 'get_refund_request' })
    getRefundRequest(@Payload() id: number) {
        return this.bookingService.getRefundRequest(id);
    }

    @MessagePattern({ cmd: 'create_refund_request' })
    createRefundRequest(@Payload() data: any) {
        return this.bookingService.createRefundRequest(data);
    }

    @MessagePattern({ cmd: 'update_refund_request' })
    updateRefundRequest(@Payload() payload: { id: number, data: any }) {
        return this.bookingService.updateRefundRequest(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_refund_request' })
    deleteRefundRequest(@Payload() id: number) {
        return this.bookingService.deleteRefundRequest(id);
    }
}
