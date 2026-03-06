import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  Code,
  FileText,
  GraduationCap,
  User,
  Wrench,
} from "lucide-react";

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personalInfo: {},
    professionalSummary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accentColor: "#3B82F6",
    public: false,
  });

  const { resumeId } = useParams();

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((res) => res._id === resumeId);

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  const sections = [
    {
      id: "personalInfo",
      title: "Personal Information",
      icon: User,
    },
    {
      id: "professionalSummary",
      title: "Professional Summary",
      icon: FileText,
    },
    {
      id: "experience",
      title: "Experience",
      icon: Briefcase,
    },
    {
      id: "education",
      title: "Education",
      icon: GraduationCap,
    },
    {
      id: "projects",
      title: "Projects",
      icon: Code,
    },
    {
      id: "skills",
      title: "Skills",
      icon: Wrench,
    },
  ];

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8"></div>
        {/* Left Side */}
        <div></div>

        {/* Right Side */}
        <div></div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
