import { Wand2, LayoutTemplate, Share2, Sparkles } from "lucide-react";
import Title from "./Title";

const Feature = () => {
  return (
    <div
      id="features"
      className="flex flex-col items-center my-10 scroll-mt-24 px-4 sm:px-6 lg:px-16"
    >
      <div className="flex items-center gap-2 text-sm text-green-700 font-normal bg-green-100 border border-green-200 rounded-full px-6 py-1.5 mb-6 shadow-sm">
        <Sparkles className="size-4 text-green-600" />
        <span>Powerful Features</span>
      </div>
      <Title
        title="Everything you need for a perfect resume"
        description="Our AI-powered platform gives you the tools to create a standout professional resume that gets you hired faster."
      />

      <div className="flex flex-col lg:flex-row items-center justify-center mt-12 lg:mt-24 gap-12 lg:gap-20 px-6 sm:px-12 lg:px-24 max-w-7xl mb-24 mx-auto w-full">
        {/* Image side */}
        <div className="flex-1 w-full max-w-2xl flex justify-center lg:justify-start group relative perspective-1000">
          <img
            className="relative w-full sm:w-[85%] rounded-2xl shadow-2xl border border-gray-100 bg-white hover:scale-[1.02] transition-transform duration-500 ease-in-out"
            src="/feature-mockup.png"
            alt="Resume Builder Preview"
          />
        </div>

        {/* Features side */}
        <div className="flex-1 w-full space-y-10 lg:space-y-12 px-2">
          <div className="flex items-start gap-4 sm:gap-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-300 ">
            <div className="p-4 bg-violet-50 group-hover:bg-violet-100 rounded-2xl shadow-sm border border-violet-100 transition-colors">
              <Wand2 className="size-8 text-violet-600" />
            </div>
            <div className="space-y-2 mt-1">
              <h3 className="text-xl font-normal text-slate-800">
                AI-Powered Writing
              </h3>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Generate professional summaries, tailor your job descriptions,
                and fix grammar instantly using our advanced AI engine.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 sm:gap-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-green-50 group-hover:bg-green-100 rounded-2xl shadow-sm border border-green-100 transition-colors">
              <LayoutTemplate className="size-8 text-green-600" />
            </div>
            <div className="space-y-2 mt-1">
              <h3 className="text-xl font-normal text-slate-800">
                Premium Templates
              </h3>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Choose from dozens of beautifully designed, ATS-friendly
                templates that grab recruiters' attention instantly.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 sm:gap-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-orange-50 group-hover:bg-orange-100 rounded-2xl shadow-sm border border-orange-100 transition-colors">
              <Share2 className="size-8 text-orange-600" />
            </div>
            <div className="space-y-2 mt-1">
              <h3 className="text-xl font-normal text-slate-800">
                Easy Export & Share
              </h3>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Download your resume as a pixel-perfect PDF or share it with a
                live public link in just one click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feature;
