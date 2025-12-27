"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/portal/ui';
import { useRouter, useParams } from 'next/navigation';
import { educationService, Course } from '@/services/education.service';

// Types
type LessonType = 'video' | 'quiz';

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index of correct option
}

interface Lesson {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    type: LessonType;
    videoUrl?: string; // Mock URL
    quizData?: QuizQuestion[];
}

interface Chapter {
    title: string;
    lessons: Lesson[];
}

export default function CourseLearningPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const { id } = params;

    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentLesson, setCurrentLesson] = useState<any>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            if (!id) return;
            try {
                const data = await educationService.getCourse(id);
                // Map backend data to UI structure
                const mappedCourse = {
                    ...data,
                    progress: 0,
                    chapters: [
                        {
                            title: 'Nội dung khóa học',
                            lessons: (data.lessons || []).map((l: any) => ({
                                id: l.id,
                                title: l.title,
                                duration: '15:00', // Placeholder
                                completed: false,
                                type: 'video',
                                videoUrl: l.videoUrl,
                                quizData: undefined
                            })).concat((data.quizzes || []).map((q: any) => ({
                                id: q.id,
                                title: q.title,
                                duration: '10:00',
                                completed: false,
                                type: 'quiz',
                                videoUrl: undefined,
                                quizData: (q.questions || []).map((quest: any) => ({
                                    id: quest.id,
                                    question: quest.content,
                                    options: Array.isArray(quest.options) ? quest.options : JSON.parse(quest.options || '[]'),
                                    correctAnswer: quest.correctOption
                                }))
                            })))
                        }
                    ]
                };
                setCourse(mappedCourse);
                if (mappedCourse.chapters[0].lessons.length > 0) {
                    setCurrentLesson(mappedCourse.chapters[0].lessons[0]);
                }
            } catch (error) {
                console.error('Failed to fetch course details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    // Flatten lessons for easier navigation
    const allLessons = useMemo(() => course?.chapters?.flatMap((c: any) => c.lessons) || [], [course]);

    // Quiz State
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizScore, setQuizScore] = useState(0);

    // --- Logic ---
    const handleLessonSelect = (lesson: any) => {
        setCurrentLesson(lesson);
        // Reset quiz state when switching lessons
        if (lesson.type === 'quiz') {
            setQuizAnswers({});
            setQuizSubmitted(false);
            setQuizScore(0);
        }
    };

    const handleQuizOptionSelect = (questionId: string, optionIdx: number) => {
        if (quizSubmitted) return;
        setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
    };

    const submitQuiz = () => {
        if (!currentLesson.quizData) return;

        let correctCount = 0;
        currentLesson.quizData.forEach((q: any) => {
            if (quizAnswers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        setQuizScore(correctCount);
        setQuizSubmitted(true);
    };

    const isPass = currentLesson?.quizData && (quizScore / currentLesson.quizData.length) >= 0.7;

    if (loading) return <div className="p-12 text-center text-gray-500">Đang tải nội dung khóa học...</div>;
    if (!course) return <div className="p-12 text-center text-red-500">Không tìm thấy khóa học.</div>;

    return (
        <div className="space-y-6">
            <Button variant="ghost" icon="arrow-left" onClick={() => router.back()}>
                Quay lại
            </Button>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 border-b border-gray-100 pb-8">
                    <div>
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold mb-2 inline-block">
                            {currentLesson?.type === 'video' ? 'Bài giảng Video' : 'Bài kiểm tra'}
                        </span>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.name}</h1>
                        <p className="text-gray-500">Đang học: {currentLesson?.title}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        {currentLesson?.type === 'video' ? (
                            <div>
                                <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden shadow-lg">
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white text-2xl z-10 group-hover:scale-110 transition-transform">
                                        <i className="fi flaticon-play-button"></i>
                                    </div>
                                    {currentLesson.videoUrl && <video src={currentLesson.videoUrl} className="hidden" />}
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-xl font-bold mb-2">Nội dung bài học</h2>
                                    <p className="text-gray-600">
                                        {course.description || "Mô tả chi tiết nội dung video bài giảng hoặc tài liệu đi kèm sẽ hiển thị ở đây."}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-blue-100 p-8 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">📝 Bài kiểm tra trắc nghiệm</h2>
                                    <div className="text-sm font-medium text-gray-500">
                                        {Object.keys(quizAnswers).length} / {currentLesson?.quizData?.length || 0} câu hỏi
                                    </div>
                                </div>

                                {quizSubmitted && (
                                    <div className={`mb-8 p-6 rounded-xl border ${isPass ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                        <h3 className={`font-bold text-lg mb-2 ${isPass ? 'text-green-700' : 'text-red-700'}`}>
                                            {isPass ? '🎉 Chúc mừng! Bạn đã vượt qua bài kiểm tra.' : '⚠️ Bạn chưa đạt yêu cầu. Vui lòng thử lại.'}
                                        </h3>
                                        <p className="text-gray-600">
                                            Điểm số của bạn: <span className="font-bold">{quizScore}/{currentLesson?.quizData?.length}</span>
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-8">
                                    {currentLesson?.quizData?.map((q: any, idx: number) => {
                                        const userAnswer = quizAnswers[q.id];
                                        return (
                                            <div key={q.id} className="space-y-3">
                                                <h3 className="font-bold text-gray-800">Câu {idx + 1}: {q.question}</h3>
                                                <div className="space-y-2">
                                                    {q.options.map((opt: string, optIdx: number) => {
                                                        let optionClass = "border-gray-200 hover:bg-gray-50 hover:border-gray-300";
                                                        if (quizSubmitted) {
                                                            if (optIdx === q.correctAnswer) optionClass = "bg-green-100 border-green-500 text-green-800";
                                                            else if (userAnswer === optIdx && userAnswer !== q.correctAnswer) optionClass = "bg-red-100 border-red-500 text-red-800";
                                                            else optionClass = "border-gray-100 opacity-60";
                                                        } else if (userAnswer === optIdx) {
                                                            optionClass = "bg-blue-50 border-blue-500 text-blue-700 shadow-sm";
                                                        }
                                                        return (
                                                            <div
                                                                key={optIdx}
                                                                onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                                                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${optionClass}`}
                                                            >
                                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                                                    ${quizSubmitted && optIdx === q.correctAnswer ? 'border-green-600 bg-green-600 text-white' :
                                                                        userAnswer === optIdx ? 'border-blue-600' : 'border-gray-300'}`}>
                                                                    {quizSubmitted && optIdx === q.correctAnswer && <i className="fi flaticon-checked text-xs"></i>}
                                                                    {!quizSubmitted && userAnswer === optIdx && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                                                                </div>
                                                                <span className="font-medium">{opt}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {!quizSubmitted ? (
                                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                                        <Button
                                            size="lg"
                                            onClick={submitQuiz}
                                            disabled={Object.keys(quizAnswers).length < (currentLesson?.quizData?.length || 0)}
                                        >
                                            Nộp bài
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                                        {!isPass && <Button variant="outline" onClick={() => {
                                            setQuizAnswers({});
                                            setQuizSubmitted(false);
                                            setQuizScore(0);
                                        }}>Làm lại</Button>}
                                        {isPass && <Button size="lg" icon="arrow-right" onClick={() => {
                                            const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson.id);
                                            if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
                                                handleLessonSelect(allLessons[currentIndex + 1]);
                                            } else {
                                                alert("Bạn đã hoàn thành tất cả các bài học!");
                                            }
                                        }}>Bài tiếp theo</Button>}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Syllabus Sidebar */}
                    <div className="bg-gray-50 rounded-2xl p-6 h-fit max-h-[700px] overflow-y-auto">
                        <h3 className="font-bold text-gray-900 mb-4">Danh sách bài học</h3>
                        <div className="space-y-4">
                            {course.chapters.map((chapter: any, idx: number) => (
                                <div key={idx}>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">{chapter.title}</h4>
                                    <div className="space-y-2">
                                        {chapter.lessons.map((lesson: any) => {
                                            const isActive = currentLesson?.id === lesson.id;
                                            return (
                                                <div
                                                    key={lesson.id}
                                                    onClick={() => handleLessonSelect(lesson)}
                                                    className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${isActive
                                                        ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500'
                                                        : lesson.completed
                                                            ? 'bg-blue-50/50 border-transparent text-gray-700'
                                                            : 'bg-white border-gray-100 hover:border-blue-200'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <i className={`fi ${lesson.type === 'quiz' ? 'flaticon-edit' :
                                                            lesson.completed ? 'flaticon-checked text-blue-600' : 'flaticon-play-button text-gray-400'
                                                            }`}></i>
                                                        <span className={`text-sm font-medium line-clamp-1 ${isActive ? 'text-blue-700' : ''}`}>
                                                            {lesson.title}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs opacity-70">{lesson.duration}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
