"use client"
import React, { Fragment } from 'react';

const Footer: React.FC = () => {
  return (
    <Fragment>
      <footer className="bg-white border-t border-gray-100 py-12 text-sm text-gray-600 font-sans mt-auto">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo */}
            <div className="flex flex-col">
              <img className="h-12 w-auto object-contain mb-4" src="/img/logo.png" alt="MediHub" />
            </div>

            {/* About */}
            <div className="space-y-3">
              <strong className="block text-gray-900 text-base">Mạng xã hội truyền thông Y tế</strong>
              <p>Giấy phép Mạng xã hội số 145/GP-BTTTT do Bộ Thông tin và Truyền thông cấp 11/04/2017</p>
              <p>Chịu trách nhiệm nội dung: Nguyễn Thế Dinh</p>
              <p>Thông tin cung cấp trên MediHub.vn có ý nghĩa tham khảo hoặc bổ sung, và không thay thế cho việc chẩn đoán hoặc điều trị.</p>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <p><b>Địa chỉ:</b> Tòa nhà MediGroup, 58/10 Thành Thái, Phường 12, Quận 10, TP.HCM</p>
              <p><b>Hotline:</b> (028) 73 099 939</p>
              <p><b>Email:</b> lienhe@medihub.com.vn</p>
              <div className="flex flex-col gap-1 mt-2">
                <a href="#" className="hover:text-primary transition-colors">Liên hệ</a>
                <a href="#" className="hover:text-primary transition-colors">Tuyển dụng</a>
                <a href="#" className="hover:text-primary transition-colors">Quảng cáo</a>
                <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
              </div>
              <p className="text-xs text-gray-400 mt-2">Ghi rõ nguồn medihub.vn khi sử dụng lại thông tin từ website này.</p>
            </div>

            {/* Apps & Social */}
            <div className="space-y-6">
              <div>
                <strong className="block text-gray-900 text-base mb-3">Ứng dụng</strong>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                    <img src="/img/pharmacom-logo.png" alt="Pharmacom" className="h-8 object-contain" />
                    <img src="/img/pharmacom-qr.png" alt="QR" className="h-20 w-20 border p-1 rounded" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <img src="/img/mdcom-logo.png" alt="MDCom" className="h-8 object-contain" />
                    <img src="/img/mdcom-qr.png" alt="QR" className="h-20 w-20 border p-1 rounded" />
                  </div>
                </div>
              </div>

              <div>
                <strong className="block text-gray-900 text-base mb-3">Kết nối</strong>
                <div className="flex gap-4">
                  <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:opacity-90 transition-opacity"><i className="fi flaticon-facebook"></i></a>
                  <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white hover:opacity-90 transition-opacity"><i className="fi flaticon-youtube"></i></a>
                  <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-700 text-white hover:opacity-90 transition-opacity"><i className="fi flaticon-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-500">
            <p><span>©</span>2021 Toàn bộ bản quyền thuộc MediHub</p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;