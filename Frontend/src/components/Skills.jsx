import { Plus, Wrench, X } from "lucide-react";
import { useState } from "react";

const Skills = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const normalizedSkill = newSkill.trim().toLowerCase();

  const addSkill = () => {
    if (!normalizedSkill) return;

    const exists = data.some(
      (skill) => skill.toLowerCase() === normalizedSkill,
    );

    if (!exists) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">
          Add your technical and soft skills
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill (e.g., JavaScript, React, Node.js)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addSkill}
          disabled={
            !normalizedSkill ||
            data.some((skill) => skill.toLowerCase() === normalizedSkill)
          }
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm"
            >
              {skill}

              <button
                onClick={() => removeSkill(i)}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <Wrench className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No skills added yet.</p>
          <p className="text-sm">Add your first skill to get started.</p>
        </div>
      )}

      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Add 8–12 relevant skills including both
          technical and soft skills.
        </p>
      </div>
    </div>
  );
};

export default Skills;
