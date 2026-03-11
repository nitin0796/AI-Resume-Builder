import { CheckIcon, Layout } from "lucide-react";
import { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "Traditional resume format with clear sections and professional typography and layout",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Modern resume format with a focus on readability and visual hierarchy",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "Minimalist resume format with a focus on simplicity and elegance",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview:
        "Minimal resume template with a dedicated section for your profile picture",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-64 p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {templates.map((template) => (
            <div
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">
                  {template.name}
                  <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-gray-500 italic">
                    {template.preview}
                  </div>
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
