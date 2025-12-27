"use client";
import React from 'react';
import _ from 'lodash';
import { useParams } from 'next/navigation';
// @ts-ignore
import { USERS, API_GET_TOP_HOSPITAL } from '@/components/common/Constant';
import { ADDITIONAL_USERS } from '@/components/profile/layouts/MockData';

import DoctorProfile from '@/components/profile/layouts/DoctorProfile';
import HospitalProfile from '@/components/profile/layouts/HospitalProfile';
import ClinicProfile from '@/components/profile/layouts/ClinicProfile';
import PharmacyProfile from '@/components/profile/layouts/PharmacyProfile';
import PharmacistProfile from '@/components/profile/layouts/PharmacistProfile';
import UserProfile from '@/components/profile/layouts/UserProfile';

const ALL_USERS = [...(USERS || []), ...ADDITIONAL_USERS];

const ProfilePage = () => {
    const params = useParams();
    const userId = params?.id as string;

    // Find user
    // Find user
    // Combine all sources including top hospitals explicitly if not in USERS
    // @ts-ignore
    const userProfile = _.find([...ALL_USERS, ...(API_GET_TOP_HOSPITAL?.data || [])], (u) => u.userId === userId);

    if (!userProfile) {
        return (
            <div className="container py-5 text-center">
                <h3>Không tìm thấy thông tin người dùng / đơn vị y tế</h3>
                <p>Vui lòng kiểm tra lại đường dẫn hoặc thử lại sau.</p>
            </div>
        );
    }

    // Render based on userType
    switch (userProfile.userType) {
        case 'doctor':
            return <DoctorProfile data={userProfile} />;
        case 'hospital':
            return <HospitalProfile data={userProfile} />;
        case 'clinic':
            return <ClinicProfile data={userProfile} />;
        case 'pharmacy':
            return <PharmacyProfile data={userProfile} />;
        case 'pharmacist':
            return <PharmacistProfile data={userProfile} />;
        case 'user':
            return <UserProfile data={userProfile} />;
        default:
            return (
                <div className="container py-5">
                    <h3>Loại tài khoản chưa được hỗ trợ: {userProfile.userType}</h3>
                    <pre>{JSON.stringify(userProfile, null, 2)}</pre>
                </div>
            );
    }
};

export default ProfilePage;
