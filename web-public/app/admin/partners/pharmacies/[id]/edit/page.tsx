"use client";
import React, { useState, useEffect, use } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import partnerService from '@/services/partner.service';

export default function EditPharmacy({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const id = parseInt(resolvedParams.id);
    const [loading, setLoading] = useState(true);
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        const fetchPharmacy = async () => {
            try {
                const pharmacy = await partnerService.getPharmacy(id);
                setInitialValues({
                    name: pharmacy.name || '',
                    address: pharmacy.address || '',
                    phone: pharmacy.phone || '',
                    email: pharmacy.email || '',
                    website: pharmacy.website || '',
                    description: pharmacy.description || '',
                    // license is missing in interface, assuming it might be needed or ignored if not in backend
                });
            } catch (error) {
                console.error('Failed to fetch pharmacy', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPharmacy();
    }, [id]);

    const fields = [
        { name: 'name', label: 'Tên nhà thuốc', type: 'text' as const, required: true },
        { name: 'address', label: 'Địa chỉ', type: 'textarea' as const, required: true, rows: 3 },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true },
        { name: 'email', label: 'Email', type: 'email' as const, required: true },
        { name: 'website', label: 'Website', type: 'text' as const },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, rows: 4 },
    ];

    const handleSubmit = async (data: any) => {
        try {
            await partnerService.updatePharmacy(id, data);
            alert('Cập nhật nhà thuốc thành công!');
            router.push('/admin/partners/pharmacies');
        } catch (error: any) {
            alert('Lỗi: ' + (error.message || 'Unknown error'));
        }
    };

    if (loading) return <div className="p-8 text-center">Đang tải...</div>;
    if (!initialValues) return <div className="p-8 text-center">Không tìm thấy nhà thuốc</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Nhà thuốc</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
