import { Loader2, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useState } from "react";

const ProfessionalSummary = ({ data = "", onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);

  const [isAiEnhancing, setIsAiEnhancing] = useState(false);

  const handleAiEnhance = async () => {
    try {
      setIsAiEnhancing(true);
      const prompt = `Generate a professional summary for ${data}`;
      const response = await api.post(
        "/api/ai/enhance-summary",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.summary,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsAiEnhancing(false);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>

          <p className="text-sm text-gray-500">Add summary for your resume</p>
        </div>

        <button
          disabled={isAiEnhancing}
          onClick={handleAiEnhance}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          {isAiEnhancing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isAiEnhancing ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          placeholder="Write a short professional summary highlighting your skills and achievements."
          className="w-full p-3 px-4 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
        />

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <strong>Tip:</strong> Keep it concise and highlight your most
            relevant skills, achievements, and the value you bring to the role.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
