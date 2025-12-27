'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

export default function ThreadDetail() {
    const params = useParams<{ id: string }>();
    // Determine content based on ID - ensuring "1" has the specific content requested
    // If ID is not 1, we can show generic mock or specific mocks for other IDs if needed.
    // For this task, we focus on ID 1.

    const isTopic1 = params.id === '1';

    const thread = isTopic1 ? {
        id: '1',
        title: 'Xin kinh nghiệm chăm sóc người già bị tiểu đường type 2',
        author: 'Minh Anh',
        avatar: '/styles/img/user/user-1.jpg',
        category: 'Sức khỏe chung',
        createdAt: '2 giờ trước',
        votes: 45,
        views: 1205,
        comments: [
            {
                id: 1,
                author: 'Bs. Nguyễn Văn Tuấn',
                avatar: '/img/doctor/doc-1.jpg',
                role: 'Bác sĩ',
                content: 'Chào bạn Minh Anh. Đối với bệnh nhân cao tuổi mắc tiểu đường Type 2, việc kiểm soát đường huyết cần sự phối hợp chặt chẽ giữa dinh dưỡng, vận động và thuốc.\n\n1. Về dinh dưỡng: Nên chia nhỏ bữa ăn (5-6 bữa/ngày) để tránh đường huyết tăng đột ngột sau ăn và hạ quá thấp khi xa bữa ăn. Ưu tiên các loại carb phức hợp (gạo lứt, ngũ cốc nguyên hạt, rau xanh) thay vì đường đơn.\n2. Về vận động: Người cao tuổi nên tập nhẹ nhàng như đi bộ, dưỡng sinh khoảng 30 phút mỗi ngày. Cần kiểm tra chân hàng ngày để tránh các vết thương nhỏ lâu lành.\n3. Theo dõi: Đo đường huyết mao mạch ít nhất 1-2 lần/ngày hoặc theo chỉ định của bác sĩ điều trị.\n\nNếu có dấu hiệu bất thường như mệt mỏi nhiều, khát nước liên tục, sụt cân nhanh, cần đưa bác đi tái khám ngay nhé.',
                votes: 89,
                createdAt: '1 giờ trước',
                replies: [
                    {
                        id: 2,
                        author: 'Minh Anh',
                        avatar: '/styles/img/user/user-1.jpg',
                        role: 'Thành viên',
                        content: 'Dạ con cảm ơn Bác sĩ nhiều ạ. Bố con hiện tại vẫn đi lại bình thường, nhưng hay bị đói vặt vào ban đêm thì nên cho ăn gì nhẹ bụng được ạ?',
                        votes: 5,
                        createdAt: '35 phút trước'
                    },
                    {
                        id: 3,
                        author: 'Bs. Nguyễn Văn Tuấn',
                        avatar: '/img/doctor/doc-1.jpg',
                        role: 'Bác sĩ',
                        content: 'Nếu đói vào ban đêm, bạn có thể cho bác dùng một cốc sữa dành riêng cho người tiểu đường (Glucerna, Diabetcare...) hoặc một ít hạt (óc chó, hạnh nhân) hoặc nửa quả táo. Tránh ăn đồ ngọt hay tinh bột nhiều vào giờ này nhé.',
                        votes: 12,
                        createdAt: '10 phút trước'
                    }
                ]
            },
            {
                id: 4,
                author: 'Trần Thu Hà',
                avatar: '/styles/img/user/user-2.jpg',
                role: 'Thành viên',
                content: 'Nhà mình cũng có bà bị tiểu đường. Kinh nghiệm là mua cái máy đo đường huyết tại nhà (mình dùng OneTouch thấy ổn) để sáng nào cũng đo. Với lại hạn chế tối đa hoa quả ngọt như mít, sầu riêng, vải nhé. Bà mình thèm ăn vụng mấy quả vải mà đường lên 15 chấm luôn đấy sợ lắm.',
                votes: 23,
                createdAt: '45 phút trước',
                replies: []
            },
            {
                id: 5,
                author: 'Phạm Hùng',
                avatar: '/styles/img/user/user-3.jpg',
                role: 'Thành viên',
                content: 'Bạn tham khảo gạo ST25 loại cho người tiểu đường ấy, hoặc gạo lứt tím than. Bố mình ăn thấy đường ổn định hơn gạo trắng. Chịu khó nấu cơm riêng cho cụ chút.',
                votes: 15,
                createdAt: '20 phút trước',
                replies: []
            }
        ]
    } : {
        // Generic content for other IDs to avoid empty page
        id: params.id,
        title: 'Thảo luận về vấn đề sức khỏe',
        author: 'Thành viên',
        avatar: '/styles/img/user/default.png',
        category: 'Thảo luận',
        createdAt: 'Vừa xong',
        votes: 0,
        views: 0,
        comments: []
    };

    return (
        <div className="space-y-6">
            {/* Thread Header & Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex">
                    {/* Vote Sidebar */}
                    <div className="w-16 bg-gray-50 flex flex-col items-center py-6 gap-2 border-r border-gray-100">
                        <button className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm text-gray-400 hover:text-orange-500 transition-all flex items-center justify-center">
                            <i className="fi flaticon-up-arrow font-bold text-xl"></i>
                        </button>
                        <span className="font-extrabold text-gray-900 text-lg">{thread.votes}</span>
                        <button className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm text-gray-400 hover:text-blue-500 transition-all flex items-center justify-center">
                            <i className="fi flaticon-down-arrow font-bold text-xl"></i>
                        </button>
                    </div>

                    <div className="flex-1 p-6 md:p-8">
                        {/* Breadcrumb / Meta */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Link href="/forum" className="hover:text-primary transition-colors">Diễn đàn</Link>
                            <i className="fi flaticon-next text-[10px]"></i>
                            <span className="text-primary font-medium">{thread.category}</span>
                        </div>

                        {/* Title & Author */}
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
                            {thread.title}
                        </h1>

                        <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full ring-2 ring-white shadow-sm overflow-hidden">
                                    <img src={thread.avatar} className="w-full h-full object-cover" alt={thread.author} />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-base">{thread.author}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                        <span>{thread.createdAt}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><i className="fi flaticon-eye"></i> {thread ? thread.views : 0} lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <button className="hidden md:flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors">
                                <i className="fi flaticon-share"></i> Chia sẻ
                            </button>
                        </div>

                        {/* Main Body */}
                        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-8">
                            {isTopic1 ? (
                                <>
                                    <p>Chào mọi người,</p>
                                    <p>Bố mình năm nay 65 tuổi vừa đi khám định kỳ và phát hiện chỉ số đường huyết lúc đói lên tới <strong>8.5 mmol/L</strong>, HbA1c là <strong>7.2%</strong>. Bác sĩ kết luận là bị <strong>tiểu đường type 2</strong> và đã kê đơn thuốc uống hàng ngày (Metformin).</p>
                                    <p>Gia đình mình đang khá lo lắng vì trước giờ cụ ăn uống cũng thoải mái, lại thích ăn ngọt. Bác sĩ có dặn phải điều chỉnh chế độ ăn và sinh hoạt nhưng mình vẫn còn mông lung quá.</p>
                                    <p>Mọi người trong diễn đàn ai có kinh nghiệm chăm sóc người nhà bị bệnh này cho mình xin ít lời khuyên với ạ:</p>
                                    <ul>
                                        <li>Thực đơn ăn uống hàng ngày nên như thế nào? Có phải kiêng hoàn toàn cơm trắng không?</li>
                                        <li>Các bài tập thể dục nào phù hợp cho người già ạ? Bố mình bị khớp nhẹ nên ngại đi lại nhiều.</li>
                                        <li>Có nên cho cụ uống thêm sữa dành cho người tiểu đường không? Loại nào tốt ạ?</li>
                                    </ul>
                                    <p>Mình cảm ơn mọi người rất nhiều!</p>
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4 text-sm text-blue-800">
                                        <strong>Đính kèm:</strong> Kết quả xét nghiệm máu ngày 18/12/2024.jpg (Đã ẩn vì lý do riêng tư)
                                    </div>
                                </>
                            ) : (
                                <p>Nội dung đang cập nhật...</p>
                            )}
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all transform hover:-translate-y-0.5">
                                <i className="fi flaticon-speech-bubble"></i> Bình luận
                            </button>
                            <button className="flex items-center gap-2 bg-gray-100 text-gray-700 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors">
                                <i className="fi flaticon-bookmark"></i> Lưu
                            </button>
                            <button className="md:hidden flex items-center gap-2 bg-gray-50 text-gray-600 font-medium px-4 py-2.5 rounded-xl ml-auto">
                                <i className="fi flaticon-menu"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-gray-900 border-l-4 border-primary pl-3">
                        Bình luận <span className="text-gray-400 font-normal ml-1">({thread.comments.length})</span>
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Sắp xếp theo:</span>
                        <select className="border-none bg-transparent font-bold text-gray-900 focus:ring-0 cursor-pointer">
                            <option>Hay nhất</option>
                            <option>Mới nhất</option>
                            <option>Cũ nhất</option>
                        </select>
                    </div>
                </div>

                {/* Input Area */}
                <div className="flex gap-4 mb-10">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0">
                        <img src="/img/user/default.png" alt="User" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <div className="relative">
                            <textarea
                                rows={3}
                                className="w-full border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none shadow-inner bg-gray-50 focus:bg-white"
                                placeholder="Chia sẻ kinh nghiệm hoặc đặt câu hỏi..."
                            ></textarea>
                            <div className="absolute right-3 bottom-3 flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Chèn ảnh"><i className="fi flaticon-picture"></i></button>
                                <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Emoji"><i className="fi flaticon-smile"></i></button>
                            </div>
                        </div>
                        <div className="flex justify-end mt-3">
                            <button className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-dark transition-colors">Gửi bình luận</button>
                        </div>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-8">
                    {thread.comments.map((comment) => (
                        <div key={comment.id} className="group animate-fade-in-up">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <img src={comment.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm" alt={comment.author} />
                                </div>
                                <div className="flex-1">
                                    <div className="bg-gray-50 rounded-2xl p-4 md:p-5 relative group-hover:bg-gray-50/80 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-900">{comment.author}</span>
                                                {comment.role === 'Bác sĩ' && (
                                                    <span className="bg-blue-100 text-blue-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        <i className="fi flaticon-medical hover:animate-spin"></i> Bác sĩ
                                                    </span>
                                                )}
                                                <span className="text-gray-300">•</span>
                                                <span className="text-xs text-gray-500">{comment.createdAt}</span>
                                            </div>
                                        </div>
                                        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                                            {comment.content}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-5 mt-2 ml-4 text-xs font-bold text-gray-500">
                                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                            <i className="fi flaticon-like"></i> Thích ({comment.votes})
                                        </button>
                                        <button className="hover:text-gray-900 transition-colors">Trả lời</button>
                                        <button className="hover:text-gray-900 transition-colors">Chia sẻ</button>
                                        <button className="ml-auto text-gray-300 hover:text-red-500 font-normal">Báo cáo</button>
                                    </div>

                                    {/* Replies */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="mt-4 space-y-4 pl-4 md:pl-8 border-l-2 border-gray-100">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="flex gap-3">
                                                    <img src={reply.avatar} className="w-8 h-8 rounded-full object-cover mt-1" alt={reply.author} />
                                                    <div className="flex-1">
                                                        <div className="bg-gray-50 rounded-2xl p-3 px-4">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-bold text-gray-900 text-sm">{reply.author}</span>
                                                                {reply.role === 'Bác sĩ' && (
                                                                    <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">Bác sĩ</span>
                                                                )}
                                                            </div>
                                                            <div className="text-gray-800 text-sm leading-relaxed">
                                                                {reply.content}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4 mt-1 ml-3 text-xs font-bold text-gray-500">
                                                            <span className="text-[10px] font-normal text-gray-400">{reply.createdAt}</span>
                                                            <button className="hover:text-primary">Thích ({reply.votes})</button>
                                                            <button className="hover:text-gray-900">Trả lời</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
