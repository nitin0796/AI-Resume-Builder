import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  UploadCloud,
  XIcon,
  Clock,
  FileText,
  SearchIcon,
  LoaderCircleIcon,
  PlusCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [createResume, setCreateResume] = useState(false);
  const [uploadResume, setUploadResume] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [newResume, setNewResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [deleteResumeId, setDeleteResumeId] = useState("");
  const [deleteConfirmationTitle, setDeleteConfirmationTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const colors = ["#14B8A6", "#F59E0B", "#EF4444", "#3B82F6", "#6366F1"];

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!resumeTitle || !resumeTitle.trim()) {
      toast.error("Please enter a resume title");
      return;
    }

    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title: resumeTitle.trim() },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setResumes([...resumes, data.resume]);
      setResumeTitle("");
      setCreateResume(false);
      navigate(`/app/build/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleUploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(newResume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { resumeText, title: resumeTitle },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setResumes([...resumes, data.resume]);
      setResumeTitle("");
      setNewResume(null);
      setUploadResume(false);
      navigate(`/app/build/${data.resume._id}`);
      setIsLoading(false);
      toast.success("Resume uploaded successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      setIsLoading(false);
    }
  };

  const handleEditResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.put(
        `/api/resumes/update`,
        { resumeId: editResumeId, resumeData: { title: resumeTitle } },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setResumes(
        resumes.map((resume) =>
          resume._id === editResumeId
            ? { ...resume, title: resumeTitle }
            : resume,
        ),
      );
      setResumeTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDeleteResume = async (e) => {
    e.preventDefault();
    const resumeToDelete = resumes.find((r) => r._id === deleteResumeId);

    if (deleteConfirmationTitle !== resumeToDelete.title) {
      toast.error("Resume title does not match!");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.delete(
        `/api/resumes/delete/${deleteResumeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setResumes((prev) =>
        prev.filter((resume) => resume._id !== deleteResumeId),
      );
      setFilteredResumes((prev) =>
        prev.filter((resume) => resume._id !== deleteResumeId),
      );
      setDeleteResumeId("");
      setDeleteConfirmationTitle("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await api.get("/api/users/resumes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setResumes(data.resumes);
        setFilteredResumes(data.resumes);
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    };

    fetchResumes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResumes(resumes);
    } else {
      const filtered = resumes.filter((resume) =>
        resume.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredResumes(filtered);
    }
  }, [searchQuery, resumes]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-between flex-wrap gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-100/50 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Welcome,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                {user.name.split(" ")[0]}
              </span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium">
              Manage and create professional resumes with AI-powered tools
            </p>
          </div>
          <div className="relative z-10 hidden sm:flex items-center gap-4">
            <div className="text-center px-6 py-3 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
              <p className="text-3xl font-bold text-green-600">
                {resumes.length}
              </p>
              <p className="text-xs font-semibold text-green-800 uppercase tracking-wider mt-1">
                Resumes
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-2xl">
            <button
              onClick={() => setCreateResume(true)}
              className="group bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-indigo-100 border-2 border-gray-200 hover:border-green-400 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-lg group-hover:scale-110 transition-transform">
                  <PlusIcon className="size-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    Create New Resume
                  </h3>
                  <p className="text-sm text-gray-500">Start from scratch</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setUploadResume(true)}
              className="group bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 border-2 border-gray-200 hover:border-purple-400 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <UploadCloud className="size-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    Upload Resume
                  </h3>
                  <p className="text-sm text-gray-500">Import existing PDF</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* My Resumes Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                My Resumes
              </h2>
              <p className="text-sm text-gray-500">
                {filteredResumes.length}{" "}
                {filteredResumes.length === 1 ? "resume" : "resumes"}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500 focus:border-transparent text-sm w-64 bg-white"
              />
            </div>
          </div>

          {/* Resumes Grid */}
          {filteredResumes.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <FileText className="size-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {searchQuery ? "No resumes found" : "No resumes yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? "Try a different search term"
                  : "Create your first resume to get started"}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setCreateResume(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                >
                  <PlusIcon className="size-5" />
                  Create Resume
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredResumes.map((resume, index) => {
                const baseColor = colors[index % colors.length];

                return (
                  <div
                    key={resume._id}
                    onClick={() => navigate(`/app/build/${resume._id}`)}
                    className="group relative bg-white rounded-xl border-2 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{
                      borderColor: baseColor + "40",
                    }}
                  >
                    {/* Color accent bar */}
                    <div
                      className="h-2 w-full opacity-50"
                      style={{
                        background: `linear-gradient(90deg, ${baseColor}, ${baseColor}88)`,
                      }}
                    />

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300"
                          style={{
                            backgroundColor: baseColor + "15",
                            color: baseColor,
                          }}
                        >
                          <FileText className="size-6" />
                        </div>
                        {/* Action buttons */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2"
                        >
                          <button
                            onClick={() => {
                              setEditResumeId(resume._id);
                              setResumeTitle(resume.title);
                            }}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                            title="Edit Title"
                          >
                            <PencilIcon className="size-4" />
                          </button>
                          <button
                            onClick={() => setDeleteResumeId(resume._id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2Icon className="size-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {resume.title}
                      </h3>

                      <div className="mt-auto pt-6 flex items-center justify-between text-xs text-slate-500 font-medium border-t border-gray-50">
                        <div className="flex items-center gap-1.5">
                          <Clock className="size-3.5" />
                          <span>
                            {new Date(resume.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex items-center text-slate-400 group-hover:text-green-600 transition-colors">
                          <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            Open
                          </span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Create Resume Modal */}
        {createResume && (
          <div
            onClick={() => {
              setCreateResume(false);
              setResumeTitle("");
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <form
              onSubmit={handleCreateResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 relative"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 flex gap-2 items-center">
                    {isLoading && (
                      <LoaderCircleIcon className="animate-spin size-6 text-green-500" />
                    )}
                    Create New Resume
                  </h2>

                  {/* Close button in header */}
                  <button
                    type="button"
                    onClick={() => {
                      setCreateResume(false);
                      setResumeTitle("");
                    }}
                    disabled={isLoading}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XIcon className="size-5" />
                  </button>
                </div>

                <p className="text-sm text-gray-500">
                  Start from scratch and build your perfect resume
                </p>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  onChange={(e) => setResumeTitle(e.target.value)}
                  value={resumeTitle}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                  type="text"
                  placeholder="e.g., Marketing Manager Resume"
                  required
                  autoFocus
                  maxLength={100}
                />

                {/* Character count */}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    {resumeTitle ? (
                      <span className="text-green-600">
                        ✓ Great! This will be your resume title
                      </span>
                    ) : (
                      "Choose a descriptive name for easy identification"
                    )}
                  </p>
                  <p className="text-xs text-gray-400">
                    {resumeTitle.length}/100
                  </p>
                </div>

                {/* Suggestions */}
                {!resumeTitle && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs font-medium text-blue-800 mb-2">
                      💡 Naming tips:
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
                      <li>Include your target role or industry</li>
                      <li>Add version or date if you have multiple</li>
                      <li>Keep it professional and descriptive</li>
                    </ul>
                  </div>
                )}

                {/* Loading State */}
                {isLoading && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <LoaderCircleIcon className="animate-spin size-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Creating your resume...
                        </p>
                        <p className="text-xs text-green-600 mt-0.5">
                          Just a moment
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="p-6 pt-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCreateResume(false);
                    setResumeTitle("");
                  }}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !resumeTitle.trim()}
                  className={`flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg shadow-lg transition-all ${
                    isLoading || !resumeTitle.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-green-600 hover:to-green-700 hover:shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoaderCircleIcon className="animate-spin size-4" />
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <PlusCircleIcon className="size-5" />
                      Create Resume
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Upload Resume Modal */}
        {uploadResume && (
          <div
            onClick={() => {
              setUploadResume(false);
              setResumeTitle("");
              setNewResume(null);
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <form
              onSubmit={handleUploadResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 flex gap-2 items-center">
                    {isLoading && (
                      <LoaderCircleIcon className="animate-spin size-6 text-purple-500" />
                    )}
                    {isLoading ? "Processing..." : "Upload Resume"}
                  </h2>

                  {/* Close button - moved here for better UX */}
                  <button
                    type="button"
                    onClick={() => {
                      setUploadResume(false);
                      setResumeTitle("");
                      setNewResume(null);
                    }}
                    disabled={isLoading}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XIcon className="size-5" />
                  </button>
                </div>

                <p className="text-sm text-gray-500">
                  Import your existing resume and let AI extract the information
                </p>
              </div>

              {/* Form Fields */}
              <div className="p-6 space-y-4">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    onChange={(e) => setResumeTitle(e.target.value)}
                    value={resumeTitle}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                    type="text"
                    placeholder="e.g., Software Engineer Resume"
                  />
                  {resumeTitle && (
                    <p className="text-xs text-purple-600 mt-1">
                      ✓ Will save as "{resumeTitle}"
                    </p>
                  )}
                  {!resumeTitle && (
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty to use default title
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PDF File
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <label
                    htmlFor="resumeFile"
                    className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-lg p-8 cursor-pointer transition-all ${
                      isLoading
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                        : newResume
                          ? "border-purple-300 bg-purple-50/30"
                          : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/30"
                    }`}
                  >
                    {newResume ? (
                      <>
                        <FileText className="size-12 text-purple-600" />
                        <div className="text-center">
                          <p className="font-medium text-purple-700">
                            {newResume.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {(newResume.size / 1024).toFixed(2)} KB
                          </p>
                          {!isLoading && (
                            <p className="text-xs text-purple-600 mt-1">
                              Click to change file
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="size-12 text-gray-400 group-hover:text-purple-500 transition-colors" />
                        <div className="text-center">
                          <p className="font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                            Choose a PDF file
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Click to browse or drag and drop
                          </p>
                        </div>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id="resumeFile"
                    accept=".pdf"
                    hidden
                    disabled={isLoading}
                    onChange={(e) => setNewResume(e.target.files[0])}
                  />

                  {/* Error state (if needed) */}
                  {newResume && !newResume.type.includes("pdf") && (
                    <p className="text-xs text-red-600 mt-2">
                      ⚠️ Please select a PDF file only
                    </p>
                  )}
                </div>

                {/* Upload Progress (if loading) */}
                {isLoading && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <LoaderCircleIcon className="animate-spin size-5 text-purple-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-purple-800">
                          Processing your resume...
                        </p>
                        <p className="text-xs text-purple-600 mt-0.5">
                          AI is extracting information
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="p-6 pt-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setUploadResume(false);
                    setResumeTitle("");
                    setNewResume(null);
                  }}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !newResume}
                  className={`flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg shadow-lg transition-all ${
                    isLoading || !newResume
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-purple-600 hover:to-purple-700 hover:shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoaderCircleIcon className="animate-spin size-5" />
                      Processing...
                    </span>
                  ) : (
                    "Upload Resume"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Resume Modal */}
        {editResumeId && (
          <div
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <form
              onSubmit={handleEditResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Resume Title
                </h2>
                <p className="text-sm text-gray-500 mt-1">Rename your resume</p>
              </div>

              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Title
                </label>
                <input
                  onChange={(e) => setResumeTitle(e.target.value)}
                  value={resumeTitle}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                  type="text"
                  placeholder="Enter new title"
                  required
                  autoFocus
                />
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditResumeId("");
                    setResumeTitle("");
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Update Title
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditResumeId("");
                  setResumeTitle("");
                }}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <XIcon className="size-5" />
              </button>
            </form>
          </div>
        )}

        {/* Delete Resume Modal */}
        {deleteResumeId && (
          <div
            onClick={() => {
              setDeleteResumeId("");
              setDeleteConfirmationTitle("");
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <form
              onSubmit={handleDeleteResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 relative overflow-hidden"
            >
              <div className="h-2 w-full bg-red-500" />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <Trash2Icon className="size-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Delete Resume?
                    </h2>
                    <p className="text-sm text-gray-500">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
                  <p className="text-sm text-red-800 leading-relaxed">
                    To confirm, please type the title of the resume: <br />
                    <span className="font-bold select-none">
                      "
                      {
                        resumes.find((resume) => resume._id === deleteResumeId)
                          ?.title
                      }
                      "
                    </span>
                  </p>
                </div>

                <input
                  onChange={(e) => setDeleteConfirmationTitle(e.target.value)}
                  value={deleteConfirmationTitle}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all disabled:bg-gray-50"
                  type="text"
                  placeholder="Type resume title here"
                  required
                  autoFocus
                />
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteResumeId("");
                    setDeleteConfirmationTitle("");
                  }}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    deleteConfirmationTitle !==
                      resumes.find((r) => r._id === deleteResumeId)?.title
                  }
                  className={`flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg shadow-lg transition-all ${
                    isLoading ||
                    deleteConfirmationTitle !==
                      resumes.find((r) => r._id === deleteResumeId)?.title
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-700 hover:shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LoaderCircleIcon className="animate-spin size-4" />
                      Deleting...
                    </span>
                  ) : (
                    "Delete Permanently"
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDeleteResumeId("");
                  setDeleteConfirmationTitle("");
                }}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <XIcon className="size-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
