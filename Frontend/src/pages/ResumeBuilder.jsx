import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOff,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  User,
  Wrench,
} from "lucide-react";
import PersonalInfo from "../components/PersonalInfo";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

const ResumeBuilder = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBg, setRemoveBg] = useState(false);
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const { resumeId } = useParams();

  const sections = [
    {
      id: "personal",
      name: "Personal Information",
      icon: User,
    },
    {
      id: "summary",
      name: "Summary",
      icon: FileText,
    },
    {
      id: "experience",
      name: "Experience",
      icon: Briefcase,
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
    },
    {
      id: "projects",
      name: "Projects",
      icon: FolderIcon,
    },
    {
      id: "skills",
      name: "Skills",
      icon: Wrench,
    },
  ];

  const activeSection = sections[activeSectionIndex];

  const changeResumeVisibility = async () => {
    setResumeData((prev) => ({ ...prev, public: !prev.public }));
  };

  const handleShare = () => {
    const shareUrl = window.location.href.split("/app/")[0];
    const resumeUrl = shareUrl + "/view-resume/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "Check out my resume" });
    } else {
      alert("Share not supported on this device.");
    }
  };

  const handleDownload = () => {
    window.print();
  };

  useEffect(() => {
    const loadExistingResume = async () => {
      const resume = dummyResumeData.find((resume) => resume._id === resumeId);
      if (resume) {
        setResumeData(resume);
        document.title = resume.title;
      }
    };

    loadExistingResume();

    return () => {
      document.title = "ResumeForge";
    };
  }, [resumeId]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all duration-300"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Side panel - Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* activeSectionIndex progress bar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-200"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />
              {/* section navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      className="flex items-center gap-1 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1 && "opacity-50"
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1),
                      )
                    }
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
              {/* Form content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfo
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBg={removeBg}
                    setRemoveBg={setRemoveBg}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "experience" && (
                  <Experience
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "education" && (
                  <Education
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "projects" && (
                  <Projects
                    data={resumeData.projects}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        projects: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "skills" && (
                  <Skills
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
              </div>
              <button className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring  hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm">
                Save
              </button>
            </div>
          </div>
          {/* Right Side panel - Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              {/* Action Buttons */}
              <div className="absolute -top-10 right-0 flex items-center gap-2 z-10">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    type="button"
                    className="flex items-center px-4 py-2 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-1 ring-blue-300 hover:ring-2 transition"
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}

                <button
                  type="button"
                  onClick={changeResumeVisibility}
                  className="flex items-center px-4 py-2 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-1 ring-purple-300 hover:ring-2 transition"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-1 ring-green-300 hover:ring-2 transition"
                >
                  <DownloadIcon className="size-4" />
                  Download
                </button>
              </div>

              {/* Resume Preview */}
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
