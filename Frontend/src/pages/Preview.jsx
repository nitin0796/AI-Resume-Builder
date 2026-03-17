import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../configs/api";
import { ArrowLeftIcon } from "lucide-react";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";

const Preview = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { resumeId } = useParams();

  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await api.get(`/api/resumes/public/${resumeId}`);
        if (data.resume) {
          setResumeData(data.resume);
          document.title = data.resume.title;
        }
      } catch (error) {
        console.error("Error loading resume:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();

    return () => {
      document.title = "ResumeForge";
    };
  }, [resumeId]);

  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto  py-10">
        <ResumePreview
          className="py-4 bg-white"
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-center text-6xl text-slate-400 font-medium">
            Resume not found
          </p>
          <Link
            to="/app"
            className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            go to dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Preview;
