"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import partnerService from '@/services/partner.service';
import Link from 'next/link';

export default function CreateHospitalPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
        departments: [] as string[],
        facilities: [] as string[],
        beds: 0,
    });
    const [deptInput, setDeptInput] = useState('');
    const [facilityInput, setFacilityInput] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await partnerService.createHospital(formData);
            alert('Tạo bệnh viện thành công!');
            router.push('/admin/partners/hospitals');
        } catch (error: any) {
            alert('Lỗi: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Thêm Bệnh viện</h1>
                <Link href="/admin/partners/hospitals" className="text-gray-600">← Quay lại</Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Tên bệnh viện *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Số điện thoại *</label>
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2">Địa chỉ *</label>
                        <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Số giường</label>
                        <input type="number" value={formData.beds} onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Mô tả</label>
                    <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Khoa</label>
                    <div className="flex gap-2 mb-2">
                        <input type="text" value={deptInput} onChange={(e) => setDeptInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), deptInput.trim() && (setFormData({ ...formData, departments: [...formData.departments, deptInput.trim()] }), setDeptInput('')))} placeholder="Nhập khoa..." className="flex-1 px-4 py-2 border rounded-lg" />
                        <button type="button" onClick={() => { if (deptInput.trim()) { setFormData({ ...formData, departments: [...formData.departments, deptInput.trim()] }); setDeptInput(''); } }} className="px-4 py-2 bg-primary text-white rounded-lg">Thêm</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.departments.map((d, i) => (
                            <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">{d}<button type="button" onClick={() => setFormData({ ...formData, departments: formData.departments.filter((_, idx) => idx !== i) })} className="hover:text-red-600">×</button></span>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Cơ sở vật chất</label>
                    <div className="flex gap-2 mb-2">
                        <input type="text" value={facilityInput} onChange={(e) => setFacilityInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), facilityInput.trim() && (setFormData({ ...formData, facilities: [...formData.facilities, facilityInput.trim()] }), setFacilityInput('')))} placeholder="Nhập cơ sở vật chất..." className="flex-1 px-4 py-2 border rounded-lg" />
                        <button type="button" onClick={() => { if (facilityInput.trim()) { setFormData({ ...formData, facilities: [...formData.facilities, facilityInput.trim()] }); setFacilityInput(''); } }} className="px-4 py-2 bg-primary text-white rounded-lg">Thêm</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.facilities.map((f, i) => (
                            <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">{f}<button type="button" onClick={() => setFormData({ ...formData, facilities: formData.facilities.filter((_, idx) => idx !== i) })} className="hover:text-red-600">×</button></span>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 pt-4 border-t">
                    <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50">{loading ? 'Đang lưu...' : 'Tạo bệnh viện'}</button>
                    <Link href="/admin/partners/hospitals" className="px-6 py-2 border rounded-lg hover:bg-gray-50">Hủy</Link>
                </div>
            </form>
        </div>
    );
}
