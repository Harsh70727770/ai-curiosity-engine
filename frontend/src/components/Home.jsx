import bgImage from "../images/curosity_engine.png";

export default function Home({ navigateTo }) {
    return (
        <div 
            className="relative w-full h-[calc(100vh-70px)] overflow-hidden flex items-center"
            style={{ 
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

            {/* Content LEFT aligned (premium look) */}
            <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12">
                
                <div className="max-w-2xl">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-sm font-semibold mb-6 backdrop-blur-md shadow-lg">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        Next-Gen Cognitive Platform
                    </div>

                    {/* Heading (NEW 🔥) */}
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                        Transform Your Learning <br />
                        <span className="text-cyan-400">With AI Intelligence</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
                        A cognitive modeling platform designed to convert abstract learning goals into highly personalized, actionable learning paths.
                    </p>

                    {/* Button */}
                    <button 
                        onClick={() => navigateTo('login')}
                        className="group relative px-8 py-4 font-semibold text-white rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                        <span className="relative z-10 flex items-center gap-2 text-lg">
                            Enter Student Portal
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}