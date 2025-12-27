"use client";
import React, { useState } from 'react';

const Tabs = [
    { id: 'general', label: 'Cài đặt chung', icon: 'flaticon-settings' },
    { id: 'notification', label: 'Thông báo', icon: 'flaticon-alarm' },
    { id: 'interest', label: 'Sở thích & Theo dõi', icon: 'flaticon-like' }
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    // General State
    const [emailNotif, setEmailNotif] = useState(true);
    const [smsNotif, setSmsNotif] = useState(false);
    const [publicProfile, setPublicProfile] = useState(true);

    // Notification Detail State
    const [notifSettings, setNotifSettings] = useState({
        news: true,
        promotions: false,
        reminders: true,
        community: true
    });

    // Interests State
    const [keywords, setKeywords] = useState(['Tim mạch', 'Dược lâm sàng', 'Tiểu đường', 'Công nghệ Y tế']);
    const [newKeyword, setNewKeyword] = useState('');
    const [following, setFollowing] = useState([
        { id: 1, name: 'BV Chợ Rẫy', type: 'Hospital', image: '/img/hospital-1.jpg' },
        { id: 2, name: 'Dr. Nguyen Van A', type: 'Doctor', image: '/img/doctor-1.jpg' },
        { id: 3, name: 'Nhà thuốc Long Châu', type: 'Pharmacy', image: '/img/pharmacy-1.jpg' }
    ]);

    const handleAddKeyword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
            setKeywords([...keywords, newKeyword.trim()]);
            setNewKeyword('');
        }
    };

    const removeKeyword = (tag: string) => {
        setKeywords(keywords.filter(k => k !== tag));
    };

    const handleUnfollow = (id: number) => {
        setFollowing(following.filter(f => f.id !== id));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Cài đặt & Tùy chỉnh</h1>
                <p className="text-gray-500 text-sm mt-1">Quản lý tài khoản, thông báo và sở thích cá nhân</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
                {Tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${activeTab === tab.id
                                ? 'border-primary text-primary bg-primary/5'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <i className={`fi ${tab.icon}`}></i>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="animate-fade-in-up">
                {activeTab === 'general' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Account Security */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="fi flaticon-locked text-primary"></i> Bảo mật tài khoản
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email đăng nhập</label>
                                    <input type="email" value="thedung@medihub.com" disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                                    <input type="password" value="********" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                                    <input type="password" placeholder="Nhập mật khẩu mới..." className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none" />
                                </div>
                                <button className="w-full py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-primary hover:text-white transition">Đổi mật khẩu</button>
                            </div>
                        </div>

                        {/* Privacy & Quick Notification */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fi flaticon-eye text-primary"></i> Quyền riêng tư
                                </h3>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div>
                                        <p className="font-medium text-gray-800">Hiển thị hồ sơ công khai</p>
                                        <p className="text-sm text-gray-500">Cho phép tìm kiếm thông tin của bạn</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={publicProfile} onChange={() => setPublicProfile(!publicProfile)} />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'notification' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-6">Cấu hình nhận thông báo</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div>
                                    <p className="font-bold text-gray-800">Tin tức & Sự kiện</p>
                                    <p className="text-sm text-gray-500">Nhận thông báo về các bài viết mới, sự kiện y khoa</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={notifSettings.news} onChange={() => setNotifSettings({ ...notifSettings, news: !notifSettings.news })} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div>
                                    <p className="font-bold text-gray-800">Ưu đãi & Khuyến mãi</p>
                                    <p className="text-sm text-gray-500">Thông báo về các voucher, chương trình khuyến mãi thuốc</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={notifSettings.promotions} onChange={() => setNotifSettings({ ...notifSettings, promotions: !notifSettings.promotions })} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div>
                                    <p className="font-bold text-gray-800">Nhắc nhở lịch trình</p>
                                    <p className="text-sm text-gray-500">Nhắc nhở lịch khám, lịch học, hạn đóng phí</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={notifSettings.reminders} onChange={() => setNotifSettings({ ...notifSettings, reminders: !notifSettings.reminders })} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-gray-800">Tương tác cộng đồng</p>
                                    <p className="text-sm text-gray-500">Khi có người bình luận hoặc trả lời câu hỏi của bạn</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={notifSettings.community} onChange={() => setNotifSettings({ ...notifSettings, community: !notifSettings.community })} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'interest' && (
                    <div className="space-y-8">
                        {/* Keywords */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="fi flaticon-price-tag text-primary"></i> Quản lý Từ khóa quan tâm
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">Hệ thống sẽ ưu tiên hiển thị nội dung liên quan đến các từ khóa này.</p>

                            <form onSubmit={handleAddKeyword} className="flex gap-2 mb-6">
                                <input
                                    type="text"
                                    value={newKeyword}
                                    onChange={(e) => setNewKeyword(e.target.value)}
                                    placeholder="Nhập từ khóa (VD: Tim mạch, Nhi khoa)..."
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none"
                                />
                                <button type="submit" className="px-6 py-2 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition">
                                    Thêm
                                </button>
                            </form>

                            <div className="flex flex-wrap gap-2">
                                {keywords.map((tag) => (
                                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                        # {tag}
                                        <button onClick={() => removeKeyword(tag)} className="hover:text-red-500 ml-1">
                                            <i className="fi flaticon-close text-xs"></i>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Followed Entities */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="fi flaticon-user text-primary"></i> Đang theo dõi
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {following.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:shadow-sm transition">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                                {/* <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> */}
                                                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold">{item.name[0]}</div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.type}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleUnfollow(item.id)}
                                            className="px-3 py-1 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-red-500 transition"
                                        >
                                            Bỏ theo dõi
                                        </button>
                                    </div>
                                ))}
                                {following.length === 0 && (
                                    <p className="text-gray-500 text-sm col-span-2 text-center py-4">Bạn chưa theo dõi ai.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition">Hủy bỏ</button>
                <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-dark transition transform hover:-translate-y-0.5">Lưu thay đổi</button>
            </div>
        </div>
    );
}
