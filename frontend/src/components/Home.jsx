import aiImage from '../images/curosity_engine.png';

export default function Home({ navigateTo }) {
    return (
      <div className="flex w-full h-full bg-slate-950">
      
        {/* LEFT - IMAGE (50%) */}
        <div className="w-1/2 h-full relative">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
      
          <img
            src={aiImage}
            alt="AI Curiosity Engine"
            className="w-full h-full object-cover"
          />
        </div>
      
        {/* RIGHT - CONTENT (50%) */}
        <div className="w-1/2 h-full flex items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-950 overflow-y-auto">
      
          <div className="max-w-lg text-center">
      
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6">
              AI <span className="text-cyan-400">Curiosity Engine</span>
            </h1>
      
            <p className="text-lg text-slate-300 mb-8">
              Learn smarter, fill knowledge gaps, and master the future.
            </p>
      
            <button
              onClick={() => navigateTo('login')}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold"
            >
              Enter Student Portal →
            </button>
      
          </div>
        </div>
      </div>
    );
}