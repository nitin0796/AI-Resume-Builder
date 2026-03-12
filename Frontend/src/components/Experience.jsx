import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";

const Experience = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add Your Job experience</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No Work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((expr, i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  Experience #{i + 1}
                </h4>
                <button
                  onClick={() => removeExperience(i)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={expr.company || ""}
                  onChange={(e) =>
                    updateExperience(i, "company", e.target.value)
                  }
                  type="text"
                  placeholder="Company name"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <input
                  value={expr.position || ""}
                  onChange={(e) =>
                    updateExperience(i, "position", e.target.value)
                  }
                  type="text"
                  placeholder="Job Title"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <input
                  value={expr.start_date || ""}
                  onChange={(e) =>
                    updateExperience(i, "start_date", e.target.value)
                  }
                  type="month"
                  placeholder="Start Date"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <input
                  value={expr.end_date || ""}
                  onChange={(e) =>
                    updateExperience(i, "end_date", e.target.value)
                  }
                  type="month"
                  placeholder="End Date"
                  disabled={expr.is_current}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={expr.is_current || false}
                  onChange={(e) => {
                    updateExperience(i, "is_current", e.target.checked);
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 ml-2">
                  I currently work here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button className="flex items-center gap-1 px-2 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                    <Sparkles className="w-3 h-3" />
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  value={expr.description || ""}
                  onChange={(e) =>
                    updateExperience(i, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                  placeholder="Provide a summary of your core responsibilities along with the major accomplishments and results you achieved in this position."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
