import { CheckIcon, Layout } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      id: "classic-portrait",
      name: "Classic Portrait Template",
      preview:
        "Minimal resume template with a dedicated section for your profile picture",
    },
    {
      id: "dark-sidebar",
      name: "Dark Sidebar Template",
      preview:
        "Dark sidebar with light content area, perfect for senior professionals",
    },
    {
      id: "classic-formal",
      name: "Classic Formal Template",
      preview:
        "Corporate style with ruled sections, italic summary and clean typography",
    },
    {
      id: "colorful-bubbly",
      name: "Colorful Bubbly Template",
      preview:
        "Colorful pill tags, rounded cards — perfect for creative and ATC roles",
    },
    {
      id: "timeline-pro",
      name: "Timeline Pro Template",
      preview:
        "Modern resume format with a focus on readability and visual hierarchy",
    },
   
  ];

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-72 p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-lg max-h-80 overflow-y-auto hide-scrollbar">
          {templates.map((template) => (
            <div
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-800">{template.name}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {template.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
