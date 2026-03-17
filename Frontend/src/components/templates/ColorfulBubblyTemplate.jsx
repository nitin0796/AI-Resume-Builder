
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

const ColorfulBubblyTemplate = ({ data, accentColor }) => {
  const accent = accentColor || "#f97316";

  // Generate soft tint from accent
  const accentLight = accent + "18";
  const accentMid = accent + "35";

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div
      className="max-w-4xl mx-auto bg-white text-gray-800"
      style={{ fontFamily: "'Trebuchet MS', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* ── HEADER ── */}
      <header className="px-10 pt-10 pb-8 relative overflow-hidden" style={{ backgroundColor: accentLight }}>
        {/* decorative circles */}
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20"
          style={{ backgroundColor: accent }}
        />
        <div
          className="absolute -bottom-6 right-32 w-24 h-24 rounded-full opacity-10"
          style={{ backgroundColor: accent }}
        />

        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tight mb-1" style={{ color: accent }}>
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.personal_info?.profession && (
            <p className="text-sm font-semibold text-gray-600 mb-5 tracking-wide">
              {data.personal_info.profession}
            </p>
          )}

          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {data.personal_info?.email && (
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: accent + "25", color: accent }}
              >
                <Mail size={11} /> {data.personal_info.email}
              </span>
            )}
            {data.personal_info?.phone && (
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: accent + "25", color: accent }}
              >
                <Phone size={11} /> {data.personal_info.phone}
              </span>
            )}
            {data.personal_info?.location && (
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: accent + "25", color: accent }}
              >
                <MapPin size={11} /> {data.personal_info.location}
              </span>
            )}
            {data.personal_info?.linkedin && (
              <a
                href={data.personal_info.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: accent + "25", color: accent }}
              >
                <Linkedin size={11} />
                {data.personal_info.linkedin.replace("https://www.", "").replace("https://", "")}
              </a>
            )}
            {data.personal_info?.website && (
              <a
                href={data.personal_info.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: accent + "25", color: accent }}
              >
                <Globe size={11} />
                {data.personal_info.website.replace("https://", "")}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="px-10 py-8">

        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
              <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: accent }}>
                About Me
              </h2>
            </div>
            <div
              className="p-4 rounded-2xl text-sm text-gray-700 leading-relaxed"
              style={{ backgroundColor: accentLight, borderLeft: `4px solid ${accent}` }}
            >
              {data.professional_summary}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
              <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: accent }}>
                Experience
              </h2>
            </div>
            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl border"
                  style={{ borderColor: accentMid, backgroundColor: "#fafafa" }}
                >
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>
                        {exp.company}
                      </p>
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: accentLight, color: accent }}
                    >
                      {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
                <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: accent }}>
                  Education
                </h2>
              </div>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: accentLight }}
                  >
                    <h3 className="font-bold text-gray-900 text-sm">
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-xs text-gray-500">in {edu.field}</p>
                    )}
                    <p className="text-xs font-semibold mt-1" style={{ color: accent }}>
                      {edu.institute || edu.institution}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
                <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: accent }}>
                  Skills
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: index % 2 === 0 ? accentLight : accentMid,
                      color: accent,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {data.project && data.project.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
              <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: accent }}>
                Projects
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.project.map((proj, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl border-2"
                  style={{ borderColor: accentMid }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                    {proj.type && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium ml-2 flex-shrink-0"
                        style={{ backgroundColor: accent, color: "white" }}
                      >
                        {proj.type}
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs mb-2 hover:underline"
                      style={{ color: accent }}
                    >
                      <ExternalLink size={11} />
                      View Project
                    </a>
                  )}
                  {proj.description && (
                    <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ColorfulBubblyTemplate;