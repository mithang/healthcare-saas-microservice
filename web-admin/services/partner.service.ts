import apiService from './api';

export interface Pharmacy {
    id: number;
    name: string;
    address: string;
    phone: string;
    email?: string;
    website?: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    thumbnail?: string;
    outletOwner?: string;
    gppNumber?: string;
    gppImage?: string;
    pointsCMEOnline?: number;
    memberRank?: string;
    status?: string;
    provinceCode?: string;
    districtCode?: string;
    wardCode?: string;
    streetName?: string;
    os?: string;
    token?: string;
    scName?: string;
    dynamicLink?: string;
    bannerLandingPage?: string;
    createdAt?: string;
}

export interface Clinic {
    id: number;
    name: string;
    address: string;
    phone: string;
    email?: string;
    website?: string;
    description?: string;
    rating?: number;
    specialty?: string;
    isVerified?: boolean;
    thumbnail?: string;
    status?: string;
    createdAt?: string;
}

export interface Hospital {
    id: number;
    name: string;
    address: string;
    phone: string;
    email?: string;
    website?: string;
    description?: string;
    rating?: number;
    level?: string;
    beds?: number;
    isVerified?: boolean;
    thumbnail?: string;
    status?: string;
    createdAt?: string;
}

export interface Pharmacist {
    id: number;
    fullName: string;
    phoneNumber: string;
    address: string;
    specialistly?: string;
    career?: string;
    provinceCode?: string;
    districtCode?: string;
    wardCode?: string;
    streetName?: string;
    os?: string;
    token?: string;
    scName?: string;
    pointsCMEOnline?: number;
    memberRank?: string;
    dynamicLink?: string;
    bannerLandingPage?: string;
    isVerified?: boolean;
    rating?: number;
    reviewCount?: number;
    status?: string;
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

export interface Patient {
    id: number;
    name: string;
    phone: string;
    email?: string;
    visits: number;
    lastVisit?: string;
    status: string;
    createdAt?: string;
}

class PartnerService {
    private readonly baseUrl = '/education/partners';

    // Clinics
    async getClinics(): Promise<Clinic[]> {
        const response = await apiService.get(`${this.baseUrl}/clinics`);
        return (response as any).data || response;
    }

    async getClinic(id: number): Promise<Clinic> {
        const response = await apiService.get(`${this.baseUrl}/clinics/${id}`);
        return (response as any).data || response;
    }

    async createClinic(data: Partial<Clinic>): Promise<Clinic> {
        const response = await apiService.post(`${this.baseUrl}/clinics`, data);
        return (response as any).data || response;
    }

    async updateClinic(id: number, data: Partial<Clinic>): Promise<Clinic> {
        const response = await apiService.put(`${this.baseUrl}/clinics/${id}`, data);
        return (response as any).data || response;
    }

    async deleteClinic(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/clinics/${id}`);
    }

    // Hospitals
    async getHospitals(): Promise<Hospital[]> {
        const response = await apiService.get(`${this.baseUrl}/hospitals`);
        return (response as any).data || response;
    }

    async getHospital(id: number): Promise<Hospital> {
        const response = await apiService.get(`${this.baseUrl}/hospitals/${id}`);
        return (response as any).data || response;
    }

    async createHospital(data: Partial<Hospital>): Promise<Hospital> {
        const response = await apiService.post(`${this.baseUrl}/hospitals`, data);
        return (response as any).data || response;
    }

    async updateHospital(id: number, data: Partial<Hospital>): Promise<Hospital> {
        const response = await apiService.put(`${this.baseUrl}/hospitals/${id}`, data);
        return (response as any).data || response;
    }

    async deleteHospital(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/hospitals/${id}`);
    }

    // Pharmacies
    async getPharmacies(): Promise<Pharmacy[]> {
        const response = await apiService.get(`${this.baseUrl}/pharmacies`);
        return (response as any).data || response;
    }

    async getPharmacy(id: number): Promise<Pharmacy> {
        const response = await apiService.get(`${this.baseUrl}/pharmacies/${id}`);
        return (response as any).data || response;
    }

    async createPharmacy(data: Partial<Pharmacy>): Promise<Pharmacy> {
        const response = await apiService.post(`${this.baseUrl}/pharmacies`, data);
        return (response as any).data || response;
    }

    async updatePharmacy(id: number, data: Partial<Pharmacy>): Promise<Pharmacy> {
        const response = await apiService.put(`${this.baseUrl}/pharmacies/${id}`, data);
        return (response as any).data || response;
    }

    async deletePharmacy(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/pharmacies/${id}`);
    }

    // --- Pharmacists ---
    async getPharmacists(): Promise<Pharmacist[]> {
        const response = await apiService.get(`${this.baseUrl}/pharmacists`);
        return (response as any).data || response;
    }

    async getPharmacist(id: number): Promise<Pharmacist> {
        const response = await apiService.get(`${this.baseUrl}/pharmacists/${id}`);
        return (response as any).data || response;
    }

    async createPharmacist(data: Partial<Pharmacist>): Promise<Pharmacist> {
        const response = await apiService.post(`${this.baseUrl}/pharmacists`, data);
        return (response as any).data || response;
    }

    async updatePharmacist(id: number, data: Partial<Pharmacist>): Promise<Pharmacist> {
        const response = await apiService.put(`${this.baseUrl}/pharmacists/${id}`, data);
        return (response as any).data || response;
    }

    async deletePharmacist(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/pharmacists/${id}`);
    }

    // Doctors
    async getDoctors(): Promise<Doctor[]> {
        const response = await apiService.get(`${this.baseUrl}/doctors`);
        return (response as any).data || response;
    }

    async getDoctor(id: number): Promise<Doctor> {
        const response = await apiService.get(`${this.baseUrl}/doctors/${id}`);
        return (response as any).data || response;
    }

    async createDoctor(data: Partial<Doctor>): Promise<Doctor> {
        const response = await apiService.post(`${this.baseUrl}/doctors`, data);
        return (response as any).data || response;
    }

    async updateDoctor(id: number, data: Partial<Doctor>): Promise<Doctor> {
        const response = await apiService.put(`${this.baseUrl}/doctors/${id}`, data);
        return (response as any).data || response;
    }

    async deleteDoctor(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/doctors/${id}`);
    }

    // Patients
    async getPatients(): Promise<Patient[]> {
        const response = await apiService.get(`${this.baseUrl}/patients`);
        return (response as any).data || response;
    }

    async getPatient(id: number): Promise<Patient> {
        const response = await apiService.get(`${this.baseUrl}/patients/${id}`);
        return (response as any).data || response;
    }

    async createPatient(data: Partial<Patient>): Promise<Patient> {
        const response = await apiService.post(`${this.baseUrl}/patients`, data);
        return (response as any).data || response;
    }

    async updatePatient(id: number, data: Partial<Patient>): Promise<Patient> {
        const response = await apiService.put(`${this.baseUrl}/patients/${id}`, data);
        return (response as any).data || response;
    }

    async deletePatient(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/patients/${id}`);
    }

    // Pending Partners
    async getPendingPartners(): Promise<any[]> {
        const response = await apiService.get(`${this.baseUrl}/pending`);
        return (response as any).data || response;
    }
}

export default new PartnerService();
