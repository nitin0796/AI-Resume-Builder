import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [createResume, setCreateResume] = useState(false);
  const [uploadResume, setUploadResume] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [newResume, setNewResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const colors = ["#14B8A6", "#F59E0B", "#EF4444", "#3B82F6", "#6366F1"];

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
    }
  };

  useEffect(() => {
    const fetchResumes = async () => {
      setResumes(dummyResumeData);
    };

    fetchResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Joe Doe
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setCreateResume(true);
            }}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-500 transition-all duration-300">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloud className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-500 transition-all duration-300">
              Upload Existing Resume
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[310px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {resumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                onClick={() => navigate(`/app/build/${resume._id}`)}
                key={index}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}10)`,
                  borderColor: baseColor + "50",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all duration-300"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <Trash2Icon
                    onClick={() => handleDeleteResume(resume._id)}
                    className="size-7 p-1.5  text-slate-700 hover:bg-white/50 transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setResumeTitle(resume.title);
                    }}
                    className="size-7 p-1.5  text-slate-700 hover:bg-white/50 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {createResume && (
          <form
            onSubmit={handleCreateResume}
            onClick={() => setCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-medium mb-4">Create New Resume</h2>
              <input
                onChange={(e) => setResumeTitle(e.target.value)}
                value={resumeTitle}
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                type="text"
                placeholder="Resume Title"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white px-4 rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setCreateResume(false);
                  setResumeTitle("");
                }}
              />
            </div>
          </form>
        )}

        {uploadResume && (
          <form
            onSubmit={handleUploadResume}
            onClick={() => setUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-medium mb-4">Upload Resume</h2>
              <input
                onChange={(e) => setResumeTitle(e.target.value)}
                value={resumeTitle}
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                type="text"
                placeholder="Resume Title"
                required
              />

              <div>
                <label
                  htmlFor="resumeFile"
                  className="block text-sm text-slate-700"
                >
                  Select PDF File
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {newResume ? (
                      <p className="text-green-700 font-medium">
                        {newResume.name}
                      </p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Upload PDF File</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="resumeFile"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setNewResume(e.target.files[0])}
                />
              </div>

              <button className="w-full py-2 bg-green-600 text-white px-4 rounded hover:bg-green-700 transition-colors">
                Upload Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setUploadResume(false);
                  setResumeTitle("");
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={handleEditResume}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-medium mb-4">Edit Resume</h2>
              <input
                onChange={(e) => setResumeTitle(e.target.value)}
                value={resumeTitle}
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                type="text"
                placeholder="Resume Title"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white px-4 rounded hover:bg-green-700 transition-colors">
                Update Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setResumeTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
