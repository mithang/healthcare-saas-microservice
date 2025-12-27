'use client';

import React, { Fragment, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import _ from 'lodash';
import Banner from '@/components/common/Banner';
import SearchCard from './components/SearchCard';
import DiseaseCard from './components/DiseaseCard';
import MedicineCard from './components/MedicineCard';
import HospitalCard, { HospitalData } from '@/components/common/HospitalCard';
import DoctorCard, { DoctorData } from '@/components/common/DoctorCard';
import TopicCard from './components/TopicCard';
import Aside from '@/components/layout/Aside';

// Interfaces
interface DiseaseItem {
  id: string;
  title: string;
  image: string;
  description: string;
  symptoms: string[];
  specialty: string;
}

interface MedicineItem {
  id: string;
  name: string;
  image: string;
  ingredients: string;
  price: number;
  packing: string;
  isPrescription: boolean;
}

interface TopicItem {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  stats: {
    views: number;
    replies: number;
    likes: number;
  };
  category: string;
  createdAt: string;
}

interface SearchResultData {
  doctor: DoctorData[];
  hospital: HospitalData[];
  clinic: HospitalData[];
  disease: DiseaseItem[];
  medicine: MedicineItem[];
  forum: TopicItem[];
}

// Mock Data
const searchResult: SearchResultData = {
  doctor: [
    {
      userId: 'doc-001',
      userType: 'doctor',
      name: 'Nguyễn Thế Dũng',
      degree: 'BS.CKII',
      avatar: '/img/user/thedung.png',
      speciality: 'Nội tổng hợp',
      address: '306 Nguyễn Sơn, Phường Phú Thọ Hòa, Quận Tân Phú, TP. HCM',
      traffic: { like: 10, search: 11, view: 21, visit: 123, post: 0 },
      statistic: { like: 120, feedback: 85, search: 0, view: 0, visit: 0, post: 0 }
    },
    {
      userId: 'doc-002',
      userType: 'doctor',
      name: 'Hoàng Ngọc Hải',
      degree: 'BS.CKII',
      avatar: '/img/user/ngochai.jpg',
      speciality: 'Sản khoa',
      address: '458 Minh Khai, Vĩnh Tuy, Hà Nội',
      traffic: { like: 10, search: 11, view: 21, visit: 100, post: 0 },
      statistic: { like: 90, feedback: 45, search: 0, view: 0, visit: 0, post: 0 }
    },
    {
      userId: 'doc-003',
      userType: 'doctor',
      name: 'Nghiêm Hoàng Lan Phương',
      degree: 'THS.BS.CKII',
      avatar: '/img/user/lanphuong.jpg',
      speciality: 'Tim mạch',
      address: '23 Nguyễn Văn Đậu, Phường 5, Quận Phú Nhuận, TP. HCM',
      traffic: { like: 10, search: 11, view: 21, visit: 80, post: 0 },
      statistic: { like: 60, feedback: 20, search: 0, view: 0, visit: 0, post: 0 }
    }
  ],
  hospital: [
    {
      userId: 'hos-001',
      userType: 'hospital',
      name: 'Bệnh viện Nhi đồng I',
      avatar: '/img/user/nhi-dong-1.png',
      speciality: 'Nhi khoa',
      address: '341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM',
      traffic: { visit: 1540, search: 302, view: 500, like: 120, post: 10 },
      statistic: { like: 120, feedback: 85 }
    },
    {
      userId: 'hos-002',
      userType: 'hospital',
      name: 'Bệnh viện Chợ Rẫy',
      avatar: 'https://bookingcare.vn/assets/icon/bookingcare-2020.svg',
      speciality: 'Đa khoa',
      address: '201B Nguyễn Chí Thanh, Phường 12, Quận 5, TP. HCM',
      traffic: { visit: 5200, search: 1200, view: 2100, like: 540, post: 50 },
      statistic: { like: 540, feedback: 320 }
    }
  ],
  clinic: [
    {
      userId: 'cli-001',
      userType: 'clinic',
      name: 'Phòng khám Đa khoa Golden Healthcare',
      avatar: 'https://bookingcare.vn/assets/icon/bookingcare-2020.svg',
      speciality: 'Đa khoa',
      address: '37 Hoàng Hoa Thám, Phường 13, Quận Tân Bình, TP. HCM',
      traffic: { visit: 450, search: 120, view: 300, like: 80, post: 5 },
      statistic: { like: 80, feedback: 45 }
    },
    {
      userId: 'cli-002',
      userType: 'clinic',
      name: 'Phòng khám Chuyên khoa Da liễu Táo Đỏ',
      avatar: 'https://cdn.bookingcare.vn/fr/w200/2020/05/29/140730-logo-tao-do-new.png',
      speciality: 'Da liễu',
      address: '30/1A Ngô Thời Nhiệm, Phường 7, Quận 3, TP. HCM',
      traffic: { visit: 320, search: 90, view: 200, like: 60, post: 3 },
      statistic: { like: 60, feedback: 25 }
    }
  ],
  disease: [
    {
      id: 'd-001',
      title: 'Viêm gan siêu vi B',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Viêm gan B là một bệnh nhiễm trùng gan do virus viêm gan B (HBV) gây ra. Bệnh có thể diễn biến cấp tính hoặc mãn tính, gây tổn thương gan nghiêm trọng.',
      symptoms: ['Vàng da', 'Mệt mỏi', 'Đau bụng'],
      specialty: 'Truyền nhiễm'
    },
    {
      id: 'd-002',
      title: 'Tiểu đường (Đái tháo đường)',
      image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Bệnh tiểu đường là bệnh rối loạn chuyển hóa không đồng nhất, có đặc điểm tăng glucose huyết do khiếm khuyết về tiết insulin, về tác động của insulin, hoặc cả hai.',
      symptoms: ['Khát nước', 'Đi tiểu nhiều', 'Sụt cân'],
      specialty: 'Nội tiết'
    },
    {
      id: 'd-003',
      title: 'Thoái hóa khớp gối',
      image: 'https://images.unsplash.com/photo-1584518969469-c2d99c7760a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Thoái hóa khớp gối là hậu quả của quá trình cơ học và sinh học làm mất cân bằng giữa tổng hợp và hủy hoại của sụn và xương dưới sụn.',
      symptoms: ['Đau khớp', 'Cứng khớp', 'Tiếng lục khục'],
      specialty: 'Cơ Xương Khớp'
    },
    {
      id: 'd-004',
      title: 'Rối loạn tiền đình',
      image: 'https://images.unsplash.com/photo-1628172828623-659728cb1190?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Rối loạn tiền đình là bệnh lý gây ra trạng thái mất cân bằng về tư thế làm cho người bệnh thường xuyên bị chóng mặt, quay cuồng, hoa mắt, ù tai, buồn nôn, đi đứng lảo đảo.',
      symptoms: ['Chóng mặt', 'Mất thăng bằng', 'Buồn nôn'],
      specialty: 'Thần kinh'
    }
  ],
  medicine: [
    {
      id: 'm-001',
      name: 'Panadol Extra',
      image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/DSC_04930_e0964e528d.jpg',
      ingredients: 'Paracetamol 500mg, Caffeine 65mg',
      price: 250000,
      packing: 'Hộp 15 vỉ x 12 viên',
      isPrescription: false
    },
    {
      id: 'm-002',
      name: 'Augmentin 625mg',
      image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/DSC_06536_9c7209705a.jpg',
      ingredients: 'Amoxicillin 500mg, Clavulanic acid 125mg',
      price: 180000,
      packing: 'Hộp 2 vỉ x 7 viên',
      isPrescription: true
    },
    {
      id: 'm-003',
      name: 'Berberin',
      image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/DSC_01358_2689622919.jpg',
      ingredients: 'Berberin clorid',
      price: 45000,
      packing: 'Lọ 100 viên',
      isPrescription: false
    },
    {
      id: 'm-004',
      name: 'Efferalgan 500mg',
      image: 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/DSC_03504_da1ef982c6.jpg',
      ingredients: 'Paracetamol 500mg',
      price: 68000,
      packing: 'Hộp 4 vỉ x 4 viên sủi',
      isPrescription: false
    }
  ],
  forum: [
    {
      id: '1',
      title: 'Có nên tiêm vắc xin cúm hàng năm không?',
      author: { name: 'Nguyễn Văn A', avatar: '/img/user/thedung.png' },
      stats: { views: 1250, replies: 45, likes: 32 },
      category: 'Tiêm chủng',
      createdAt: '2 giờ trước'
    },
    {
      id: '2',
      title: 'Chia sẻ kinh nghiệm giảm cân an toàn bằng chế độ Eat Clean',
      author: { name: 'Trần Thị B', avatar: '/img/user/lanphuong.jpg' },
      stats: { views: 5600, replies: 120, likes: 250 },
      category: 'Dinh dưỡng',
      createdAt: '1 ngày trước'
    },
    {
      id: '3',
      title: 'Triệu chứng sớm của bệnh tiểu đường type 2 là gì?',
      author: { name: 'Lê Văn C', avatar: '/img/user/ngochai.jpg' },
      stats: { views: 890, replies: 15, likes: 10 },
      category: 'Bệnh mãn tính',
      createdAt: '3 ngày trước'
    },
    {
      id: '4',
      title: 'Hỏi đáp về chi phí sinh mổ tại Bệnh viện Từ Dũ',
      author: { name: 'Phạm Thị D', avatar: '/img/user/hongnhung.jpg' },
      stats: { views: 3400, replies: 80, likes: 55 },
      category: 'Hỏi đáp viện phí',
      createdAt: '5 ngày trước'
    }
  ]
};

const SearchResult: React.FC = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [fixed, setFixed] = useState<boolean>(false);

  const handleScroll = () => {
    const header = document.querySelector('.header') as HTMLElement;
    const banner = document.querySelector('.banner') as HTMLElement;
    const aside = document.querySelector('.aside') as HTMLElement;

    if (header && banner && aside) {
      let limitBorderline = header.offsetHeight +
        banner.offsetHeight +
        aside.offsetHeight + 30;
      setFixed(window.pageYOffset >= limitBorderline);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  // Render logic
  const renderContent = () => {
    if (type === 'disease') {
      return (
        <div className="flex flex-col gap-0">
          {searchResult.disease.map((item, i) => (
            <DiseaseCard key={i} item={item} />
          ))}
        </div>
      );
    }

    if (type === 'medicine') {
      return (
        <div className="flex flex-col gap-0">
          {searchResult.medicine.map((item, i) => (
            <MedicineCard key={i} item={item} />
          ))}
        </div>
      );
    }

    if (type === 'hospital') {
      return (
        <div className="flex flex-col gap-6">
          {searchResult.hospital.map((item, i) => (
            <div key={i} className="h-full">
              <HospitalCard data={item} />
            </div>
          ))}
        </div>
      );
    }

    if (type === 'clinic') {
      return (
        <div className="flex flex-col gap-6">
          {searchResult.clinic.map((item, i) => (
            <div key={i} className="h-full">
              <HospitalCard data={item} />
            </div>
          ))}
        </div>
      );
    }

    if (type === 'forum') {
      return (
        <div className="flex flex-col gap-2">
          {searchResult.forum.map((item, i) => (
            <TopicCard key={i} item={item} />
          ))}
        </div>
      );
    }

    // Default: Doctor (Explicitly handled for type='doctor' or default)
    return (
      <div className="flex flex-col gap-6">
        {searchResult.doctor.map((item, i) =>
          <div key={i} className="h-full">
            <DoctorCard data={item} />
          </div>
        )}
      </div>
    );
  };

  const getTitle = () => {
    if (type === 'disease') return 'Kết quả tìm kiếm bệnh lý';
    if (type === 'medicine') return 'Kết quả tìm kiếm thuốc';
    if (type === 'hospital') return 'Bệnh viện & Cơ sở y tế';
    if (type === 'clinic') return 'Phòng khám';
    if (type === 'forum') return 'Thảo luận cộng đồng';
    return 'Bác sĩ phù hợp nhất';
  }

  const getCount = () => {
    if (type === 'disease') return searchResult.disease.length;
    if (type === 'medicine') return searchResult.medicine.length;
    if (type === 'hospital') return searchResult.hospital.length;
    if (type === 'clinic') return searchResult.clinic.length;
    if (type === 'forum') return searchResult.forum.length;
    return searchResult.doctor.length;
  }

  return (
    <Fragment>
      <Banner page='others' />
      <div className="news-container py-8 bg-gray-50/50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-9/12 px-4 order-2 lg:order-1">
              {/* Search Result Header */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  {getTitle()}
                </h2>
                <span className="text-sm text-gray-500">
                  {getCount()} kết quả
                </span>
              </div>

              {renderContent()}
            </div>

            <div className="w-full lg:w-3/12 px-4 order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="sticky top-24">
                <Aside isFixed={fixed} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SearchResult;