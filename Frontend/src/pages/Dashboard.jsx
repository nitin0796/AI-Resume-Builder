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
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [createResume, setCreateResume] = useState(false);
  const [uploadResume, setUploadResume] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [newResume, setNewResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const colors = ["#14B8A6", "#F59E0B", "#EF4444", "#3B82F6", "#6366F1"];

  const user = { name: "John Doe" };

  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();
    setCreateResume(false);
    navigate(`/app/build/res123`);
  };

  const handleUploadResume = async (e) => {
    e.preventDefault();
    setUploadResume(false);
    navigate(`/app/build/res123`);
  };

  const handleEditResume = async (e) => {
    e.preventDefault();
    setEditResumeId("");
    navigate(`/app/build/res123`);
  };

  const handleDeleteResume = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this resume?",
    );
    if (confirm) {
      setResumes((prev) => prev.filter((resume) => resume._id !== id));
      setFilteredResumes((prev) => prev.filter((resume) => resume._id !== id));
    }
  };

  useEffect(() => {
    const fetchResumes = async () => {
      setResumes(dummyResumeData);
      setFilteredResumes(dummyResumeData);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-600">
            Manage and create professional resumes
          </p>
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
                <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
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
              className="group bg-white hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100 border-2 border-gray-200 hover:border-indigo-400 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <UploadCloud className="size-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500 focus:border-transparent text-sm w-64"
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
                    key={index}
                    onClick={() => navigate(`/app/build/${resume._id}`)}
                    className="group relative bg-white rounded-xl border-2 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{
                      borderColor: baseColor + "40",
                    }}
                  >
                    {/* Color accent bar */}
                    <div
                      className="h-2 w-full"
                      style={{
                        background: `linear-gradient(90deg, ${baseColor}, ${baseColor}cc)`,
                      }}
                    />

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex flex-col items-center text-center mb-4">
                        <div
                          className="p-4 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            backgroundColor: baseColor + "15",
                          }}
                        >
                          <FilePenLineIcon
                            className="size-8"
                            style={{ color: baseColor }}
                          />
                        </div>
                        <h3
                          className="font-semibold text-sm mb-1 line-clamp-2 min-h-[40px]"
                          style={{ color: baseColor }}
                        >
                          {resume.title}
                        </h3>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                        <Clock className="size-3" />
                        <span>
                          {new Date(resume.updatedAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons - appear on hover */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1"
                    >
                      <button
                        onClick={() => {
                          setEditResumeId(resume._id);
                          setResumeTitle(resume.title);
                        }}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white shadow-lg hover:shadow-xl transition-all"
                        title="Edit Resume"
                      >
                        <PencilIcon className="size-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDeleteResume(resume._id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-50 shadow-lg hover:shadow-xl transition-all"
                        title="Delete Resume"
                      >
                        <Trash2Icon className="size-4 text-red-600" />
                      </button>
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
            onClick={() => setCreateResume(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <form
              onSubmit={handleCreateResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create New Resume
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Give your resume a memorable name
                </p>
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
                  placeholder="e.g., Marketing Manager Resume"
                  required
                  autoFocus
                />
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCreateResume(false);
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
                  Create Resume
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCreateResume(false);
                  setResumeTitle("");
                }}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <XIcon className="size-5" />
              </button>
            </form>
          </div>
        )}

        {/* Upload Resume Modal */}
        {uploadResume && (
          <div
            onClick={() => setUploadResume(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <form
              onSubmit={handleUploadResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  Upload Resume
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Import your existing resume
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Title
                  </label>
                  <input
                    onChange={(e) => setResumeTitle(e.target.value)}
                    value={resumeTitle}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    type="text"
                    placeholder="e.g., Software Engineer Resume"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PDF File
                  </label>
                  <label
                    htmlFor="resumeFile"
                    className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-400 hover:bg-purple-50/30 cursor-pointer transition-all group"
                  >
                    {newResume ? (
                      <>
                        <FileText className="size-12 text-purple-600" />
                        <div className="text-center">
                          <p className="font-medium text-purple-700">
                            {newResume.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Click to change file
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="size-12 text-gray-400 group-hover:text-green-500 transition-colors" />
                        <div className="text-center">
                          <p className="font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                            Choose a PDF file
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            or drag and drop
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
                    onChange={(e) => setNewResume(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setUploadResume(false);
                    setResumeTitle("");
                    setNewResume(null);
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Upload Resume
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUploadResume(false);
                  setResumeTitle("");
                  setNewResume(null);
                }}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <XIcon className="size-5" />
              </button>
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
      </div>
    </div>
  );
};

export default Dashboard;
