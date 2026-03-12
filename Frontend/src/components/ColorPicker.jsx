import { Check, Palette } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const colors = [
    { name: "Corporate Blue", value: "#2563EB" },
    { name: "Professional Navy", value: "#1E3A8A" },
    { name: "Executive Gray", value: "#4B5563" },
    { name: "Success Green", value: "#059669" },
    { name: "Modern Teal", value: "#0D9488" },
    { name: "Creative Purple", value: "#7C3AED" },
    { name: "Warm Burgundy", value: "#9F1239" },
    { name: "Elegant Charcoal", value: "#374151" },
    { name: "Ocean Blue", value: "#3B82F6" },
    { name: "Royal Purple", value: "#8B5CF6" },
    { name: "Emerald Green", value: "#10B981" },
    { name: "Sunset Orange", value: "#F97316" },
    { name: "Rose Pink", value: "#EC4899" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Crimson Red", value: "#EF4444" },
    { name: "Amber Gold", value: "#F59E0B" },
    { name: "Slate Gray", value: "#64748B" },
    { name: "Navy Blue", value: "#1E40AF" },
    { name: "Forest Green", value: "#059669" },
    { name: "Burgundy", value: "#991B1B" },
    { name: "Charcoal", value: "#374151" },
    { name: "Sky Blue", value: "#0EA5E9" },
    { name: "Coral", value: "#FB7185" },
    { name: "Olive Green", value: "#84CC16" },
    { name: "Deep Purple", value: "#7C3AED" },
    { name: "Bronze", value: "#D97706" },
    { name: "Classic Black", value: "#1F2937" },
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
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
      </button>
      {isOpen && (
        <div className="grid grid-cols-4 w-80 gap-2 absolute top-full left-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm max-h-80 overflow-y-auto hide-scrollbar">
          {colors.map((color) => (
            <div
              key={color.value}
              className="cursor-pointer group flex flex-col items-center"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className="relative w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors flex items-center justify-center"
                style={{ backgroundColor: color.value }}
              >
                {selectedColor === color.value && (
                  <Check className="w-5 h-5 text-white drop-shadow-lg" />
                )}
              </div>
              <p className="text-xs text-center mt-1 text-gray-600 line-clamp-2 w-full">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
