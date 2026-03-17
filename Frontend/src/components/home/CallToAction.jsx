import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, FileText, CheckCircle } from "lucide-react";

const CallToAction = () => {
  return (
    <div
      id="cta"
      className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 mt-32 mb-20 scroll-mt-24"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-lg group">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-50 rounded-full blur-[80px] pointer-events-none group-hover:bg-green-100 transition-colors duration-500"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-50 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-100 transition-colors duration-500"></div>

        {/* Floating Icons (Decorative) */}
        <div className="absolute top-12 left-12 p-3 bg-white/80 backdrop-blur shadow-sm rounded-2xl border border-gray-100 text-green-500 animate-[bounce_4s_infinite] hidden md:block">
          <FileText className="size-6" />
        </div>
        <div className="absolute bottom-16 right-16 p-3 bg-white/80 backdrop-blur shadow-sm rounded-2xl border border-gray-100 text-emerald-500 animate-[bounce_5s_infinite] hidden md:block">
          <CheckCircle className="size-6" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 sm:p-24 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mb-8">
            <Sparkles className="size-4" />
            <span>Land your dream job today</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6 tracking-tight max-w-3xl leading-tight">
            Stop struggling with formatting.
            <br />
            <span className="text-green-600">
              Start building a winning resume.
            </span>
          </h2>

          <p className="text-lg text-slate-600 mb-10 max-w-2xl font-normal leading-relaxed">
            Join thousands of professionals who successfully boosted their
            interview callbacks using ResumeForge AI. It's fast, ATS-friendly,
            and completely free to start.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/app?state=register"
              className="group/btn flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Build My Resume Now</span>
              <ArrowRight className="size-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-500 font-medium">
            No credit card required • Instant PDF Download
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
