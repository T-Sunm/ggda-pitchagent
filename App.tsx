
import React, { useState, useEffect, useRef } from 'react';

// --- Helper Hook for Scroll Animations ---
const useIntersectionObserver = <T extends HTMLElement,>(options: IntersectionObserverInit) => {
    const containerRef = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [containerRef, options]);

    return [containerRef, isVisible] as const;
};

// --- Animated Wrapper Component ---
interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '' }) => {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    });

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${className} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            {children}
        </div>
    );
};


// --- Icon Components ---
const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 01-2.288 0m16.572 0a2 2 0 012.288 0m-18.858 0a2 2 0 00-2.288 0m12.016-5.634a2 2 0 01.547 1.022l.477 2.387a6 6 0 01-.517 3.86l-.158.318a6 6 0 00-.517 3.86l-2.387.477a2 2 0 01-1.022.547M16.572 9.794a2 2 0 00-.547-1.022l-.477-2.387a6 6 0 00-3.86-.517l-.318-.158a6 6 0 01-3.86-.517l-2.387-.477a2 2 0 00-1.022-.547m16.572 0a2 2 0 00-2.288 0M5.428 15.428a2 2 0 01-1.022.547l-2.387.477a6 6 0 01-3.86-.517l-.318-.158a6 6 0 00-3.86-.517l2.387-.477a2 2 0 011.022-.547m16.572 0a2 2 0 012.288 0m-18.858 0a2 2 0 00-2.288 0" />
    </svg>
);

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const TargetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

// --- Section Components ---
const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-white tracking-wider">
                    <span className="text-cyan-400">Study</span>
                    <span className="text-white">Buddy</span>
                    <span className="text-violet-400"> AI</span>
                </div>
                <a href="#demo" className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                    Xem Demo
                </a>
            </div>
        </header>
    );
};

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center bg-slate-900 pt-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                        <AnimatedSection>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                                Không còn ôn thi một mình.
                                <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
                                    Tìm bạn học lý tưởng với AI.
                                </span>
                            </h1>
                        </AnimatedSection>
                        <AnimatedSection className="delay-200">
                            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto md:mx-0">
                                Study Buddy AI giúp sinh viên Việt Nam kết nối với bạn học phù hợp nhất dựa trên phong cách học tập, chuyên ngành, lịch trình và mục tiêu.
                            </p>
                        </AnimatedSection>
                        <AnimatedSection className="delay-300">
                            <a href="#demo" className="inline-block bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30">
                                Dùng thử MVP
                            </a>
                        </AnimatedSection>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                         <AnimatedSection className="delay-200">
                            <img src="https://picsum.photos/id/24/500/500" alt="Students studying together" className="rounded-2xl shadow-2xl shadow-violet-500/20 transform hover:scale-105 transition-transform duration-500" />
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProblemSolution = () => {
    const features = [
        { icon: <BrainIcon />, title: "Phong cách học tập", description: "Kết nối với người có cùng phương pháp học hiệu quả." },
        { icon: <BookIcon />, title: "Môn học & Chuyên ngành", description: "Tìm bạn cùng lớp, cùng ngành để dễ dàng trao đổi." },
        { icon: <CalendarIcon />, title: "Lịch trình linh hoạt", description: "Sắp xếp thời gian học chung một cách thuận tiện." },
        { icon: <TargetIcon />, title: "Mục tiêu chung", description: "Cùng nhau phấn đấu đạt điểm cao và hoàn thành khoá học." },
    ];

    return (
        <section className="py-20 bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <AnimatedSection>
                        <h2 className="text-3xl font-bold text-white mb-4">Vấn đề?</h2>
                        <p className="text-slate-300 text-lg mb-6">
                            Tìm được một người bạn học "hợp cạ" ở đại học thật sự rất khó. Sự khác biệt về lịch học, phương pháp tiếp cận và mục tiêu học tập thường dẫn đến việc học nhóm kém hiệu quả và tốn thời gian.
                        </p>
                        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                            <p className="text-slate-200 font-medium text-lg italic">
                                "Mình đã tốn cả một học kỳ để tìm người học chung môn Xác suất thống kê nhưng không thành công."
                            </p>
                            <p className="text-right text-cyan-400 mt-2">- Một sinh viên năm 2</p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection className="delay-200">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">Giải pháp của chúng tôi</span>
                        </h2>
                        <p className="text-slate-300 text-lg mb-8">
                            Study Buddy AI sử dụng thuật toán thông minh của Gemini để phân tích và matching sinh viên, đảm bảo sự tương thích tối đa.
                        </p>
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 bg-slate-800 p-3 rounded-full">{feature.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                                        <p className="text-slate-400">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

const Demo = () => {
    return (
        <section id="demo" className="py-20 bg-slate-900">
            <div className="container mx-auto px-6 text-center">
                <AnimatedSection>
                    <h2 className="text-4xl font-extrabold text-white mb-4">Xem Study Buddy AI hoạt động</h2>
                    <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-12">
                        Đây là bản demo MVP của chúng tôi, thể hiện luồng hoạt động chính từ việc tạo hồ sơ đến khi tìm được bạn học thành công.
                    </p>
                </AnimatedSection>
                <AnimatedSection className="delay-200">
                    <div className="relative aspect-video max-w-4xl mx-auto bg-slate-800 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden border-2 border-slate-700 group">
                        <img src="https://picsum.photos/seed/studydemo/1280/720" alt="Demo video placeholder" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300">
                            <button className="bg-white/20 backdrop-blur-sm p-8 rounded-full group-hover:bg-white/30 transform group-hover:scale-110 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="absolute bottom-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                            PITCH VIDEO (3 phút)
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const TechStack = () => {
    return (
        <section className="py-20 bg-slate-950">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Công nghệ sử dụng</h2>
                    <p className="text-slate-400 mb-12">Chúng tôi xây dựng sản phẩm trên nền tảng công nghệ hiện đại và mạnh mẽ.</p>
                    <div className="flex justify-center items-center gap-10 md:gap-16 flex-wrap">
                        {/* Gemini AI */}
                        <div className="flex flex-col items-center gap-2 text-slate-300 hover:text-white transition-colors">
                             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16">
                                <path d="M7.49988 12.0001L9.49988 14.0001L7.49988 16.0001L5.49988 14.0001L7.49988 12.0001Z" fill="#A4C2F4"/>
                                <path d="M11.9999 7.50012L13.9999 9.50012L11.9999 11.5001L9.99988 9.50012L11.9999 7.50012Z" fill="#A4C2F4"/>
                                <path d="M11.9999 12.5001L13.9999 14.5001L11.9999 16.5001L9.99988 14.5001L11.9999 12.5001Z" fill="#FFFFFF"/>
                                <path d="M16.4999 12.0001L18.4999 14.0001L16.4999 16.0001L14.4999 14.0001L16.4999 12.0001Z" fill="#A4C2F4"/>
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#FFFFFF"/>
                            </svg>
                            <span className="font-semibold text-lg">Gemini AI</span>
                        </div>
                        {/* React */}
                        <div className="flex flex-col items-center gap-2 text-slate-300 hover:text-white transition-colors">
                            <svg width="64" height="64" viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 animate-[spin_8s_linear_infinite]">
                                <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
                                <g stroke="#61DAFB" strokeWidth="1" fill="none">
                                    <ellipse rx="11" ry="4.2"/>
                                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                                </g>
                            </svg>
                            <span className="font-semibold text-lg">React</span>
                        </div>
                        {/* Firebase */}
                        <div className="flex flex-col items-center gap-2 text-slate-300 hover:text-white transition-colors">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16">
                                <path d="M9.81348 51.9688L32.0001 5.0625L54.1868 51.9688L32.0001 64L9.81348 51.9688Z" fill="#FFCA28"/>
                                <path d="M9.81348 51.9688L32.0001 44.1562V5.0625L9.81348 51.9688Z" fill="#FFA000"/>
                                <path d="M54.1865 51.9688L31.9999 64V5.0625L54.1865 51.9688Z" fill="#F57F17"/>
                                <path d="M9.81348 38.625L23.4068 45.0938L32.0001 44.1562L9.81348 38.625Z" fill="#FFC107"/>
                                <path d="M54.1865 38.625L40.5932 45.0938L31.9999 44.1562L54.1865 38.625Z" fill="#FFECB3"/>
                            </svg>
                            <span className="font-semibold text-lg">Firebase</span>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const CTA = () => {
    return (
        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="bg-gradient-to-r from-cyan-500 to-violet-600 rounded-2xl p-10 md:p-16 text-center shadow-2xl shadow-violet-500/30">
                        <h2 className="text-4xl font-extrabold text-white mb-4">Sẵn sàng để học tập hiệu quả hơn?</h2>
                        <p className="text-slate-100 text-lg max-w-2xl mx-auto mb-8">
                           Tham gia cùng chúng tôi để thay đổi cách bạn học và kết nối. Tìm kiếm study buddy hoàn hảo ngay hôm nay!
                        </p>
                        <a href="#demo" className="inline-block bg-white text-violet-600 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Trải nghiệm Demo
                        </a>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-400">
            <div className="container mx-auto px-6 py-8 text-center">
                <p>&copy; {new Date().getFullYear()} Study Buddy AI. A Hackathon Project.</p>
                <p>Built with ❤️ for students in Vietnam.</p>
            </div>
        </footer>
    );
};


export default function App() {
  return (
    <div className="bg-slate-900 selection:bg-cyan-300 selection:text-cyan-900">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Demo />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
