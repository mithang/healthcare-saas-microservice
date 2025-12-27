import apiService from './api';

export interface Clinic {
    id: number;
    name: string;
    address: string;
    phone: string;
    email?: string;
    description?: string;
    specialties?: string[];
    rating?: number;
    isVerified?: boolean;
    image?: string;
    openingHours?: any;
    createdAt?: string;
}

export interface Hospital {
    id: number;
    name: string;
    address: string;
    phone: string;
    website?: string;
    description?: string;
    departments?: string[];
    beds?: number;
    rating?: number;
    isVerified?: boolean;
    image?: string;
    createdAt?: string;
}

class PartnerService {
    // Clinics
    async getClinics(): Promise<Clinic[]> {
        return apiService.get<Clinic[]>('/clinics');
    }

    async getClinic(id: number): Promise<Clinic> {
        return apiService.get<Clinic>(`/clinics/${id}`);
    }

    async createClinic(data: Partial<Clinic>): Promise<Clinic> {
        return apiService.post<Clinic>('/clinics', data);
    }

    async updateClinic(id: number, data: Partial<Clinic>): Promise<Clinic> {
        return apiService.put<Clinic>(`/clinics/${id}`, data);
    }

    async deleteClinic(id: number): Promise<void> {
        return apiService.delete(`/clinics/${id}`);
    }

    // Hospitals
    async getHospitals(): Promise<Hospital[]> {
        return apiService.get<Hospital[]>('/hospitals');
    }

    async getHospital(id: number): Promise<Hospital> {
        return apiService.get<Hospital>(`/hospitals/${id}`);
    }

    async createHospital(data: Partial<Hospital>): Promise<Hospital> {
        return apiService.post<Hospital>('/hospitals', data);
    }

    async updateHospital(id: number, data: Partial<Hospital>): Promise<Hospital> {
        return apiService.put<Hospital>(`/hospitals/${id}`, data);
    }

    async deleteHospital(id: number): Promise<void> {
        return apiService.delete(`/hospitals/${id}`);
    }

    // Pharmacies
    async getPharmacies(): Promise<Pharmacy[]> {
        return apiService.get<Pharmacy[]>('/pharmacies');
    }

    async getPharmacy(id: number): Promise<Pharmacy> {
        return apiService.get<Pharmacy>(`/pharmacies/${id}`);
    }

    async createPharmacy(data: Partial<Pharmacy>): Promise<Pharmacy> {
        return apiService.post<Pharmacy>('/pharmacies', data);
    }

    async updatePharmacy(id: number, data: Partial<Pharmacy>): Promise<Pharmacy> {
        return apiService.put<Pharmacy>(`/pharmacies/${id}`, data);
    }

    async deletePharmacy(id: number): Promise<void> {
        return apiService.delete(`/pharmacies/${id}`);
    }

    // Doctors
    async getDoctors(): Promise<Doctor[]> {
        return apiService.get<Doctor[]>('/doctors');
    }

    async getDoctor(id: number): Promise<Doctor> {
        return apiService.get<Doctor>(`/doctors/${id}`);
    }

    async createDoctor(data: Partial<Doctor>): Promise<Doctor> {
        return apiService.post<Doctor>('/doctors', data);
    }

    async updateDoctor(id: number, data: Partial<Doctor>): Promise<Doctor> {
        return apiService.put<Doctor>(`/doctors/${id}`, data);
    }

    async deleteDoctor(id: number): Promise<void> {
        return apiService.delete(`/doctors/${id}`);
    }
}

export interface Pharmacy {
    id: number;
    name: string;
    address: string;
    phone: string;
    email?: string;
    website?: string;
    description?: string;
    rating?: number;
    isVerified?: boolean;
    image?: string;
    createdAt?: string;
}

export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    hospital?: string;
    phone: string;
    email?: string;
    description?: string;
    rating?: number;
    isVerified?: boolean;
    image?: string;
    createdAt?: string;
}

export default new PartnerService();
