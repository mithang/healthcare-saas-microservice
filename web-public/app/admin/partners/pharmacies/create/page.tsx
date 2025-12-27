"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import partnerService from '@/services/partner.service';
import Link from 'next/link';

export default function CreatePharmacyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', address: '', phone: '', email: '', description: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await partnerService.createPharmacy(formData);
            alert('Tạo nhà thuốc thành công!');
            router.push('/admin/partners/pharmacies');
        } catch (error: any) {
            alert('Lỗi: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Thêm Nhà thuốc</h1>
                <Link href="/admin/partners/pharmacies" className="text-gray-600">← Quay lại</Link>
            </div>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-bold mb-2">Tên nhà thuốc *</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></div>
                    <div><label className="block text-sm font-bold mb-2">Số điện thoại *</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-bold mb-2">Địa chỉ *</label><input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></div>
                    <div><label className="block text-sm font-bold mb-2">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></div>
                </div>
                <div><label className="block text-sm font-bold mb-2">Mô tả</label><textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" /></div>
                <div className="flex gap-4 pt-4 border-t">
                    <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50">{loading ? 'Đang lưu...' : 'Tạo nhà thuốc'}</button>
                    <Link href="/admin/partners/pharmacies" className="px-6 py-2 border rounded-lg hover:bg-gray-50">Hủy</Link>
                </div>
            </form>
        </div>
    );
}
