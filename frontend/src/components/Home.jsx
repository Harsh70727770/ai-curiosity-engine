export default function Home({ navigateTo }) {
    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen overflow-hidden bg-slate-950">
            
            {/* Left Section (Image Side) */}
            <div className="relative w-full md:w-1/2 h-[40vh] md:h-screen flex-shrink-0">
                {/* Dark overlay for aesthetics */}
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                
                <img 
                    src="../images/curosity_engine.png" 
                    alt="AI Curiosity Engine Background" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Right Section (Content Side) */}
            <div className="relative w-full md:w-1/2 min-h-[60vh] md:h-screen flex flex-col justify-center items-center p-8 md:p-12 lg:p-16 bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950">
                
                {/* Ambient glow effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto w-full">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-400 text-sm font-semibold mb-8 shadow-lg backdrop-blur-md">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                        </span>
                        Next-Gen Cognitive Platform
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                        AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Curiosity Engine</span>
                    </h1>
                    
                    {/* Description Paragraph */}
                    <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                        A cognitive modeling platform designed to convert abstract learning goals into highly personalized, actionable learning paths.
                    </p>

                    {/* CTA Button */}
                    <button 
                        onClick={() => navigateTo('login')}
                        className="group relative px-8 py-4 font-bold text-white rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                    >
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>

                        <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                            Enter Student Portal
                            <svg 
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

        </div>
    );
}