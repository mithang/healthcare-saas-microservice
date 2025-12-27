"use client"
import React, { Fragment, useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import _ from 'lodash';
import classNames from "classnames";
import Flaticon from '../common/Flaticon';
// Components
import SideMenu from "./SideMenu";

// Hooks
import { useViewport } from "@/components/common/Function";
import { useCart } from "@/store/CartContext";
import { useAuth } from '@/providers/AuthProvider';
interface SubNavItem {
  title: string;
  route: string;
  searchCount?: number;
}

interface MenuItem {
  title: string;
  route: string;
  hidden?: boolean;
  subNav?: SubNavItem[];
}

interface HeaderProps {
  title?: string;
  icon?: string;
}

const Header: React.FC<HeaderProps> = ({ title, icon }) => {
  const curPageRoute = '/';
  const { user, isAuthenticated } = useAuth();
  console.log(user);
  // Use try/catch for useCart safely as it might be used outside CartProvider in some contexts (though we wrapped it)
  // or handle hydration mismatch if necessary. 
  // For now simple usage:
  const { getTotalItems } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Update count only on client side to avoid hydration mismatch
    setCartItemCount(getTotalItems());
  }, [getTotalItems]);

  // Responsive
  const { width } = useViewport();
  const breakpoint = 1024;

  const menu: MenuItem[] = [
    {
      title: 'Trang chủ',
      route: '/'
    }, {
      title: 'Bệnh A-Z',
      route: '/search?type=disease'
    }, {
      title: 'Thuốc A-Z',
      route: '/search?type=medicine'
    }, {
      title: 'Đào tạo CME',
      route: '/education'
    }, {
      title: 'Bệnh thường gặp',
      route: '',
      hidden: true,
      subNav: []
    }, {
      title: 'Bệnh viện',
      route: '/search?type=hospital'
    }, {
      title: 'Phòng khám',
      route: '/search?type=clinic'
    }, {
      title: 'Bác sĩ',
      route: '/search?type=doctor'
    }, {
      title: 'Chuyên mục tin',
      route: '',
      hidden: true,
      subNav: []
    }, {
      title: 'Diễn đàn',
      route: '/search?type=forum'
    }, {
      title: 'Shop',
      route: '/shop'
    },
  ];

  return (
    <Fragment>
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm h-[70px] flex items-center transition-all duration-300">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link className="flex-shrink-0" href="/">
            <img src="/img/logo.png" alt="MediHub" className="h-[40px] w-auto object-contain" />
          </Link>

          {/* Desktop Menu */}
          {width > breakpoint ? (
            <div className="hidden lg:flex items-center space-x-6">
              <ul className="flex items-center gap-6 m-0 p-0 list-none">
                {_.map(menu, (item, i) => !item.hidden && (
                  <li key={i} className="relative group">
                    <Link
                      className={`text-[15px] font-medium transition-colors hover:text-primary ${curPageRoute === item.route ? 'text-primary' : 'text-gray-700'}`}
                      href={item.route}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/shop/cart" className="relative text-gray-600 hover:text-primary transition-colors">
              <i className="fi flaticon-shopping-cart text-2xl"></i>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Info when logged in */}
            {isAuthenticated ? (
              <Link href="/portal/profile" className="flex items-center gap-2 md:gap-3 hover:opacity-90 transition-opacity">
                <div className="text-right hidden sm:block">
                  <p className="text-xs md:text-sm font-medium text-gray-900 truncate max-w-[120px]">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500 truncate max-w-[120px]">
                    {(user as any)?.role === 'doctor' || user?.roleId === 2 ? 'Doctor' : (typeof (user as any)?.role === 'object' ? ((user as any)?.role as any)?.name : (user as any)?.role) || ''}
                  </p>
                </div>
                <div className="relative">
                  <img
                    src="/styles/img/user/user-1.jpg"
                    alt="User Avatar"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
              </Link>
            ) : (
              <>
                {/* Login */}
                <Link href="/login" className="flex items-center justify-center text-gray-700 font-medium hover:text-primary transition-colors text-xs md:text-sm px-1 md:px-0">
                  Login
                </Link>

                {/* Register */}
                <Link href="/register" className="flex items-center justify-center md:border md:border-primary text-primary px-2 md:px-5 py-1 md:py-2 md:rounded-full font-medium hover:bg-primary hover:text-white transition-all text-xs md:text-sm whitespace-nowrap">
                  Register
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            {width <= breakpoint && (
              <button className="text-gray-700 text-2xl lg:hidden">
                <i className="fi flaticon-menu"></i>
              </button>
            )}
          </div>
        </div>
      </header>
      {/* Spacer for Fixed Header */}
      <div className="h-[70px]"></div>
    </Fragment>
  );
};

export default Header;