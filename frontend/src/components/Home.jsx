export default function Home({ navigateTo }) {
    return (
        <div 
            className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-end"
            style={{ 
                backgroundImage: `url('../images/curosity_engine.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent z-0"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center p-6 md:p-12 mb-12 w-full max-w-3xl mx-auto">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-cyan-400 text-sm font-semibold mb-6 shadow-lg backdrop-blur-md">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </span>
                    Next-Gen Cognitive Platform
                </div>
                
                {/* Text */}
                <p className="text-lg md:text-xl text-white mb-8 leading-relaxed drop-shadow-lg font-medium">
                    A cognitive modeling platform designed to convert abstract learning goals into highly personalized, actionable learning paths.
                </p>

                {/* Call to Action Button */}
                <button 
                    onClick={() => navigateTo('login')}
                    className="group relative px-8 py-4 font-bold text-white rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] transition-all duration-300 transform hover:-translate-y-1"
                >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>

                    <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                        Enter Student Portal
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
}