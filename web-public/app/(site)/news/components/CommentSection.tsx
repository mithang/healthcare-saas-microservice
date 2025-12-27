import React, { useState } from 'react';

interface Comment {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    content: string;
    date: string;
    likes: number;
    replies?: Comment[];
}

const MOCK_COMMENTS: Comment[] = [
    {
        id: '1',
        user: { name: 'Nguyễn Văn A', avatar: '/img/user/thedung.png' },
        content: 'Bài viết rất hữu ích, cảm ơn bác sĩ đã chia sẻ!',
        date: '2 giờ trước',
        likes: 12,
        replies: [
            {
                id: '1-1',
                user: { name: 'Lê Thị C', avatar: '/img/user/hongnhung.jpg' },
                content: 'Đồng quan điểm ạ.',
                date: '1 giờ trước',
                likes: 2
            }
        ]
    },
    {
        id: '2',
        user: { name: 'Trần Thị B', avatar: '/img/user/lanphuong.jpg' },
        content: 'Mình đang gặp tình trạng tương tự, mong được tư vấn thêm.',
        date: '5 giờ trước',
        likes: 8
    }
];

const CommentSection: React.FC = () => {
    const [commentText, setCommentText] = useState('');

    return (
        <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                Bình luận <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">3</span>
            </h3>

            {/* Input */}
            <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                    <img src="/img/user/default.png" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <textarea
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm"
                        rows={3}
                        placeholder="Viết bình luận của bạn..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end mt-2">
                        <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                            Gửi bình luận
                        </button>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="space-y-6">
                {MOCK_COMMENTS.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                            <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="bg-gray-50 p-4 rounded-lg rounded-tl-none">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-sm text-gray-900">{comment.user.name}</span>
                                    <span className="text-xs text-gray-500">{comment.date}</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                            </div>

                            <div className="flex items-center gap-4 mt-2 ml-1">
                                <button className="text-xs font-semibold text-gray-500 hover:text-primary flex items-center gap-1">
                                    <i className="fi flaticon-like"></i> Thích ({comment.likes})
                                </button>
                                <button className="text-xs font-semibold text-gray-500 hover:text-primary">
                                    Trả lời
                                </button>
                            </div>

                            {/* Replies */}
                            {comment.replies && (
                                <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                                    {comment.replies.map(reply => (
                                        <div key={reply.id} className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                                <img src={reply.user.avatar} alt={reply.user.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="bg-gray-50 p-3 rounded-lg rounded-tl-none">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-bold text-xs text-gray-900">{reply.user.name}</span>
                                                        <span className="text-[10px] text-gray-500">{reply.date}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-700 leading-relaxed">{reply.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
