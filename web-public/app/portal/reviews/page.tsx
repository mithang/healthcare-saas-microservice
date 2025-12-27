"use client";
import React, { useState } from 'react';
import { Review, RatingStats, calculateAverageRating, getRatingDistribution, getStarPercentage, formatRating, getRatingColor } from '@/types/rating';

export default function ReviewsPage() {
    const [showResponseModal, setShowResponseModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    // Mock data
    const reviews: Review[] = [
        {
            id: '1',
            targetId: 'pharmacy-001',
            targetType: 'pharmacy',
            targetName: 'Nhà thuốc Long Châu',
            userId: 'user-001',
            userName: 'Nguyễn Văn A',
            userAvatar: '/img/user1.jpg',
            rating: 5,
            comment: 'Dược sĩ tư vấn rất nhiệt tình, thuốc chất lượng tốt. Sẽ quay lại!',
            createdDate: '2024-12-18',
            status: 'approved',
            helpful: 12
        },
        {
            id: '2',
            targetId: 'pharmacy-001',
            targetType: 'pharmacy',
            targetName: 'Nhà thuốc Long Châu',
            userId: 'user-002',
            userName: 'Trần Thị B',
            rating: 4,
            comment: 'Nhà thuốc sạch sẽ, giá cả hợp lý. Chỉ có điều thời gian chờ hơi lâu.',
            createdDate: '2024-12-17',
            status: 'approved',
            helpful: 8,
            response: {
                text: 'Cảm ơn anh/chị đã góp ý. Chúng tôi sẽ cải thiện thời gian phục vụ.',
                respondedBy: 'Nhà thuốc Long Châu',
                respondedDate: '2024-12-17'
            }
        },
        {
            id: '3',
            targetId: 'pharmacy-001',
            targetType: 'pharmacy',
            targetName: 'Nhà thuốc Long Châu',
            userId: 'user-003',
            userName: 'Lê Văn C',
            rating: 3,
            comment: 'Bình thường, không có gì đặc biệt.',
            createdDate: '2024-12-16',
            status: 'pending',
            helpful: 2
        }
    ];

    const avgRating = calculateAverageRating(reviews);
    const distribution = getRatingDistribution(reviews);
    const totalReviews = reviews.length;

    const stats: RatingStats = {
        averageRating: avgRating,
        totalReviews: totalReviews,
        ratingDistribution: distribution
    };

    const handleRespond = (review: Review) => {
        setSelectedReview(review);
        setShowResponseModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Đánh giá & Nhận xét</h1>
                    <p className="text-gray-500 mt-1">Quản lý đánh giá từ khách hàng</p>
                </div>

                {/* Rating Overview */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Average Rating */}
                        <div className="text-center">
                            <div className={`text-6xl font-bold ${getRatingColor(avgRating)} mb-2`}>
                                {formatRating(avgRating)}
                            </div>
                            <div className="text-4xl text-yellow-500 mb-2">
                                {'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}
                            </div>
                            <p className="text-gray-600">{totalReviews} đánh giá</p>
                        </div>

                        {/* Rating Distribution */}
                        <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-700 w-8">{star} ★</span>
                                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-500"
                                            style={{ width: `${getStarPercentage(distribution[star as keyof typeof distribution], totalReviews)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 w-12 text-right">
                                        {distribution[star as keyof typeof distribution]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                            <option>Tất cả đánh giá</option>
                            <option>5 sao</option>
                            <option>4 sao</option>
                            <option>3 sao</option>
                            <option>2 sao</option>
                            <option>1 sao</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                            <option>Tất cả trạng thái</option>
                            <option>Đã duyệt</option>
                            <option>Chờ duyệt</option>
                            <option>Đã phản hồi</option>
                            <option>Chưa phản hồi</option>
                        </select>
                        <input type="text" placeholder="Tìm kiếm..." className="px-4 py-2 border border-gray-200 rounded-xl" />
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">👤</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <p className="font-bold text-gray-900">{review.userName}</p>
                                            <p className="text-xs text-gray-500">{new Date(review.createdDate).toLocaleDateString('vi-VN')}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${review.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                    review.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {review.status === 'approved' ? 'Đã duyệt' :
                                                    review.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="text-yellow-500 text-xl">
                                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">{review.rating}.0</span>
                                    </div>

                                    {/* Comment */}
                                    <p className="text-gray-700 mb-3">{review.comment}</p>

                                    {/* Response */}
                                    {review.response && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3">
                                            <p className="text-sm font-bold text-blue-900 mb-1">
                                                Phản hồi từ {review.response.respondedBy}
                                            </p>
                                            <p className="text-sm text-blue-800">{review.response.text}</p>
                                            <p className="text-xs text-blue-600 mt-1">
                                                {new Date(review.response.respondedDate).toLocaleDateString('vi-VN')}
                                            </p>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex items-center gap-3">
                                        <button className="text-sm text-gray-600 hover:text-gray-900">
                                            👍 Hữu ích ({review.helpful})
                                        </button>
                                        {!review.response && (
                                            <button
                                                onClick={() => handleRespond(review)}
                                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-200"
                                            >
                                                Phản hồi
                                            </button>
                                        )}
                                        {review.status === 'pending' && (
                                            <>
                                                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-bold hover:bg-green-200">
                                                    Duyệt
                                                </button>
                                                <button className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-bold hover:bg-red-200">
                                                    Từ chối
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Response Modal */}
                {showResponseModal && selectedReview && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Phản hồi đánh giá</h3>

                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <p className="font-bold text-gray-900 mb-1">{selectedReview.userName}</p>
                                <div className="text-yellow-500 mb-2">
                                    {'★'.repeat(selectedReview.rating)}{'☆'.repeat(5 - selectedReview.rating)}
                                </div>
                                <p className="text-gray-700">{selectedReview.comment}</p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung phản hồi</label>
                                <textarea
                                    placeholder="Nhập phản hồi của bạn..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl h-32"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowResponseModal(false)}
                                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl"
                                >
                                    Hủy
                                </button>
                                <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl">
                                    Gửi phản hồi
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
