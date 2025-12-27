import apiService from './api';

export interface Appointment {
    id: number;
    patientId: string;
    patientName: string;
    patientPhone: string;
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
    service: string;
    status: string;
    createdAt: string;
}

export interface LabTest {
    id: number;
    orderCode: string;
    patientId: string;
    patientName: string;
    patientPhone: string;
    testType: string;
    hospital: string;
    fee: number;
    testDate: string;
    status: string;
    createdAt: string;
}

export interface PharmacyOrder {
    id: number;
    code: string;
    customerId: string;
    customerName: string;
    customerPhone: string;
    pharmacy: string;
    itemsCount: number;
    totalAmount: number;
    date: string;
    status: string;
    createdAt: string;
}

export interface RefundRequest {
    id: number;
    orderCode: string;
    customerId: string;
    customerName: string;
    originalOrder: string;
    amount: number;
    reason: string;
    requestDate: string;
    status: string;
    createdAt: string;
}

class BookingService {
    private readonly baseUrl = '/bookings';

    // Appointments
    async getAppointments(): Promise<Appointment[]> {
        return apiService.get<Appointment[]>(`${this.baseUrl}/appointments`);
    }

    async getAppointment(id: number): Promise<Appointment> {
        return apiService.get<Appointment>(`${this.baseUrl}/appointments/${id}`);
    }

    async createAppointment(data: Partial<Appointment>): Promise<Appointment> {
        return apiService.post<Appointment>(`${this.baseUrl}/appointments`, data);
    }

    async updateAppointment(id: number, data: Partial<Appointment>): Promise<Appointment> {
        return apiService.put<Appointment>(`${this.baseUrl}/appointments/${id}`, data);
    }

    async deleteAppointment(id: number): Promise<void> {
        return apiService.delete(`${this.baseUrl}/appointments/${id}`);
    }

    // Lab Tests
    async getLabTests(): Promise<LabTest[]> {
        return apiService.get<LabTest[]>(`${this.baseUrl}/lab-tests`);
    }

    async createLabTest(data: Partial<LabTest>): Promise<LabTest> {
        return apiService.post<LabTest>(`${this.baseUrl}/lab-tests`, data);
    }

    async updateLabTest(id: number, data: Partial<LabTest>): Promise<LabTest> {
        return apiService.put<LabTest>(`${this.baseUrl}/lab-tests/${id}`, data);
    }

    async deleteLabTest(id: number): Promise<void> {
        return apiService.delete(`${this.baseUrl}/lab-tests/${id}`);
    }

    // Pharmacy Orders
    async getPharmacyOrders(): Promise<PharmacyOrder[]> {
        return apiService.get<PharmacyOrder[]>(`${this.baseUrl}/pharmacy-orders`);
    }

    async updatePharmacyOrder(id: number, data: Partial<PharmacyOrder>): Promise<PharmacyOrder> {
        return apiService.put<PharmacyOrder>(`${this.baseUrl}/pharmacy-orders/${id}`, data);
    }

    async deletePharmacyOrder(id: number): Promise<void> {
        return apiService.delete(`${this.baseUrl}/pharmacy-orders/${id}`);
    }

    // Refunds
    async getRefundRequests(): Promise<RefundRequest[]> {
        return apiService.get<RefundRequest[]>(`${this.baseUrl}/refunds`);
    }

    async updateRefundRequest(id: number, data: Partial<RefundRequest>): Promise<RefundRequest> {
        return apiService.put<RefundRequest>(`${this.baseUrl}/refunds/${id}`, data);
    }

    async deleteRefundRequest(id: number): Promise<void> {
        return apiService.delete(`${this.baseUrl}/refunds/${id}`);
    }
}

export default new BookingService();
