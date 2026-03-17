import { FolderGit, Plus, Trash2 } from "lucide-react";

const Projects = ({ data = [], onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
      link: "",
    };
    onChange([...(data || []), newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add Your Projects</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderGit className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No Projects added yet.</p>
          <p className="text-sm">Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4 mt-6">
          {(data || []).map((project, i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">Project #{i + 1}</h4>
                <button
                  onClick={() => removeProject(i)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid gap-3">
                <input
                  value={project.name || ""}
                  onChange={(e) => updateProject(i, "name", e.target.value)}
                  type="text"
                  placeholder="Project name"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <input
                  value={project.type || ""}
                  onChange={(e) => updateProject(i, "type", e.target.value)}
                  type="text"
                  placeholder="Project Type"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <input
                  value={project.link || ""}
                  onChange={(e) => updateProject(i, "link", e.target.value)}
                  type="text"
                  placeholder="Project Live Link"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <textarea
                  rows={4}
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(i, "description", e.target.value)
                  }
                  placeholder="Describe your project"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
