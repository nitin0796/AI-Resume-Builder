// import { Sparkles } from "lucide-react";

// const ProfessionalSummary = ({ data, onChange, setResumeData }) => {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
//             Professional Summary
//           </h3>
//           <p className="text-sm text-gray-500">
//             Provide a brief summary of your professional background, key skills,
//             and notable achievements.
//           </p>
//         </div>
//         <button className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
//           <Sparkles className="size-4" />
//           AI Enhance
//         </button>
//       </div>

//       <div className="mt-6">
//         <textarea
//           value={data || ""}
//           onChange={(e) => onChange(e.target.value)}
//           rows={7}
//           className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
//           placeholder="Provide a concise and compelling professional summary that highlights your key strengths, relevant experience, and career objectives, demonstrating the value you bring to potential employers."
//         />
//         <p className="text-sm text-gray-500 max-w-[80%] mx-auto text-center mt-2">
//           Keep it concise and highlight your most relevant skills, achievements,
//           and the value you bring to the role.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProfessionalSummary;
import { Sparkles } from "lucide-react";

const ProfessionalSummary = ({ data = "", onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>

          <p className="text-sm text-gray-500">
            Provide a brief summary of your background, key skills, and
            achievements.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Sparkles className="size-4" />
          AI Enhance
        </button>
      </div>

      <div className="mt-6">
        <textarea
          value={data}
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
