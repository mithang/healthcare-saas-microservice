"use client";
import React, { useState } from 'react';

const Tabs = ['Thông tin chung', 'Chuyên môn', 'Dịch vụ & Bảng giá', 'Lịch làm việc', 'Thư viện ảnh'];

export default function ProfileSettings() {
    const [activeTab, setActiveTab] = useState(0);
    const [degrees, setDegrees] = useState([
        { id: 1, name: 'Bằng Tốt nghiệp Đại học Y Dược TP.HCM', issuer: 'Đại học Y Dược TP.HCM', year: '1998', status: 'Verified', image: '/img/certificate-1.jpg' },
        { id: 2, name: 'Chứng chỉ hành nghề khám chữa bệnh', issuer: 'Sở Y tế TP.HCM', year: '2000', status: 'Verified', image: '/img/certificate-2.jpg' },
        { id: 3, name: 'Chứng nhận Đào tạo liên tục Tim mạch', issuer: 'Hội Tim mạch học VN', year: '2023', status: 'Pending', image: '/img/certificate-3.jpg' }
    ]);
    const [gallery, setGallery] = useState([1, 2, 3, 4, 5].map(i => ({ id: i, url: `/img/gallery/pic-${i}.jpg` })));
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const degreeInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'gallery' | 'degree') => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Mock upload - create object URL
        const url = URL.createObjectURL(file);

        if (type === 'gallery') {
            setGallery(prev => [...prev, { id: Date.now(), url }]);
        } else {
            const newDegree = {
                id: Date.now(),
                name: file.name.split('.')[0], // Auto-fill name from filename
                issuer: 'Chờ cập nhật',
                year: new Date().getFullYear().toString(),
                status: 'Pending',
                image: url
            };
            setDegrees(prev => [...prev, newDegree]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hồ sơ của tôi</h1>
                    <p className="text-gray-500 text-sm">Quản lý và cập nhật thông tin hiển thị trên ứng dụng.</p>
                </div>
                <button className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition shadow-sm flex items-center gap-2">
                    <i className="fi flaticon-diskette"></i> Lưu thay đổi
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs Header */}
                <div className="flex border-b border-gray-100 overflow-x-auto">
                    {Tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${activeTab === index
                                ? 'border-primary text-primary bg-primary/5'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-8">

                    {/* TAB 1: GENERAL INFO */}
                    {activeTab === 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-md overflow-hidden relative group">
                                    <img src="/img/user/thedung.png" alt="Avatar" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer">
                                        <i className="fi flaticon-camera text-white text-xl"></i>
                                    </div>
                                </div>
                                <button className="text-primary text-sm font-bold hover:underline">Thay đổi ảnh đại diện</button>
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                                    <input type="text" defaultValue="Nguyễn Thế Dũng" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                    <input type="text" defaultValue="090 365 2829" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input type="email" defaultValue="thedung@medihub.com" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Chức vụ</label>
                                    <input type="text" defaultValue="Trưởng khoa" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ phòng khám</label>
                                    <input type="text" defaultValue="306 Nguyễn Sơn, Phường Phú Thọ Hòa, Quận Tân Phú, TP. HCM" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: PROFESSIONAL */}
                    {activeTab === 1 && (
                        <div className="space-y-8">
                            {/* Degree Section */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Bằng cấp & Chứng chỉ hành nghề</label>
                                    <button
                                        onClick={() => degreeInputRef.current?.click()}
                                        className="text-primary text-sm font-bold flex items-center gap-1 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition"
                                    >
                                        <i className="fi flaticon-add"></i> Thêm chứng chỉ
                                    </button>
                                    <input
                                        type="file"
                                        ref={degreeInputRef}
                                        className="hidden"
                                        accept="image/*,.pdf"
                                        onChange={(e) => handleFileUpload(e, 'degree')}
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {degrees.map((degree) => (
                                        <div key={degree.id} className="flex gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                                            <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                                <img src={degree.image} alt="Certificate" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/64?text=CERT')} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-sm">{degree.name}</h4>
                                                        <p className="text-xs text-gray-500">{degree.issuer} • {degree.year}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${degree.status === 'Verified' ? 'bg-green-100 text-green-700' :
                                                        degree.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {degree.status === 'Verified' ? 'Đã xác thực' :
                                                            degree.status === 'Pending' ? 'Chờ duyệt' : 'Từ chối'}
                                                    </span>
                                                </div>
                                                {degree.status !== 'Verified' && (
                                                    <p className="text-xs text-red-500 mt-1 italic">
                                                        {degree.status === 'Pending' ? '* Đang chờ quản trị viên phê duyệt' : '* Vui lòng cập nhật lại hình ảnh rõ nét hơn'}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr className="border-gray-100" />

                            {/* Existing Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Học hàm / Học vị</label>
                                    <input type="text" defaultValue="BS.CKII" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Chuyên khoa chính</label>
                                    <input type="text" defaultValue="Nội tổng hợp" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Giới thiệu bản thân (Bio)</label>
                                <textarea rows={6} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none" defaultValue="BS Nguyễn Thế Dũng nguyên là Giám đốc Sở Y tế TP. HCM từ 2002 đến 2007..." />
                                <p className="text-right text-xs text-gray-400 mt-1">0/500 ký tự</p>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: SERVICES */}
                    {activeTab === 2 && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-gray-800">Danh sách dịch vụ</h3>
                                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition"><i className="fi flaticon-add"></i> Thêm dịch vụ</button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'Khám chuyên khoa - lần đầu', price: '150.000đ' },
                                    { name: 'Khám chuyên khoa - tái khám', price: '100.000đ' },
                                    { name: 'Phí khám cấp cứu', price: '170.000đ' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-sm transition group">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" defaultValue={item.name} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-transparent group-hover:bg-gray-50 focus:bg-white transition" />
                                            <input type="text" defaultValue={item.price} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-transparent group-hover:bg-gray-50 focus:bg-white transition md:w-40" />
                                        </div>
                                        <button className="text-gray-400 hover:text-red-500 transition"><i className="fi flaticon-garbage"></i></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 4: SCHEDULE */}
                    {activeTab === 3 && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-4 border-b border-gray-100 text-gray-500 text-sm font-medium">Ca làm việc</th>
                                        {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'].map(d => (
                                            <th key={d} className="p-4 border-b border-gray-100 text-gray-900 text-sm font-bold text-center">{d}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Sáng (7:00 - 11:30)', id: 'morning' },
                                        { name: 'Chiều (13:30 - 17:00)', id: 'afternoon' },
                                        { name: 'Tối (17:00 - 20:00)', id: 'evening' },
                                    ].map((shift) => (
                                        <tr key={shift.id} className="hover:bg-gray-50 transition">
                                            <td className="p-4 border-b border-gray-50 text-sm font-medium text-gray-700">{shift.name}</td>
                                            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                                                <td key={day} className="p-4 border-b border-gray-50 text-center">
                                                    <input type="checkbox" defaultChecked={day < 5} className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary" />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-6 flex justify-end">
                                <p className="text-sm text-gray-500 italic">* Lưu ý: Lịch này sẽ được hiển thị cho bệnh nhân đặt khám.</p>
                            </div>
                        </div>
                    )}

                    {/* TAB 5: GALLERY */}
                    {activeTab === 4 && (
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleFileUpload(e, 'gallery')}
                            />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition cursor-pointer"
                                >
                                    <i className="fi flaticon-add text-2xl mb-2"></i>
                                    <span className="text-sm font-medium">Thêm ảnh</span>
                                </div>
                                {gallery.map((img) => (
                                    <div key={img.id} className="aspect-square rounded-xl overflow-hidden relative group">
                                        <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                            <button className="w-8 h-8 rounded-full bg-white text-gray-800 hover:text-red-500 flex items-center justify-center"><i className="fi flaticon-garbage text-xs"></i></button>
                                            <button className="w-8 h-8 rounded-full bg-white text-gray-800 hover:text-blue-500 flex items-center justify-center"><i className="fi flaticon-view text-xs"></i></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
