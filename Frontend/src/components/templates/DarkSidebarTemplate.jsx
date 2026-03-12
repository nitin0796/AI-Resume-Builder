
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

const DarkSidebarTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const sidebarBg = "#1a1a2e";
  const sidebarAccent = accentColor || "#e94560";

  return (
    <div
      className="max-w-5xl mx-auto bg-white text-gray-800 flex min-h-screen"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* ── LEFT SIDEBAR ── */}
      <aside
        className="w-72 flex-shrink-0 flex flex-col"
        style={{ backgroundColor: sidebarBg }}
      >
        {/* Name Block */}
        <div
          className="px-8 pt-10 pb-8"
          style={{ borderBottom: `3px solid ${sidebarAccent}` }}
        >
          <h1 className="text-2xl font-bold text-white leading-tight tracking-wide mb-1">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.personal_info?.profession && (
            <p
              className="text-xs tracking-widest uppercase mt-2"
              style={{ color: sidebarAccent }}
            >
              {data.personal_info.profession}
            </p>
          )}
        </div>

        {/* Contact */}
        <div
          className="px-8 py-6"
          style={{ borderBottom: `1px solid #ffffff15` }}
        >
          <h2
            className="text-xs tracking-widest uppercase font-semibold mb-4"
            style={{ color: sidebarAccent }}
          >
            Contact
          </h2>
          <div className="space-y-3 text-sm text-gray-300">
            {data.personal_info?.email && (
              <div className="flex items-start gap-3">
                <Mail
                  size={13}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: sidebarAccent }}
                />
                <span className="break-all text-xs leading-relaxed">
                  {data.personal_info.email}
                </span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-3">
                <Phone
                  size={13}
                  className="flex-shrink-0"
                  style={{ color: sidebarAccent }}
                />
                <span className="text-xs">{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-3">
                <MapPin
                  size={13}
                  className="flex-shrink-0"
                  style={{ color: sidebarAccent }}
                />
                <span className="text-xs">{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-start gap-3">
                <Linkedin
                  size={13}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: sidebarAccent }}
                />
                <a
                  href={data.personal_info.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs break-all hover:underline"
                  style={{ color: "#a0aec0" }}
                >
                  {data.personal_info.linkedin
                    .replace("https://www.", "")
                    .replace("https://", "")}
                </a>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-start gap-3">
                <Globe
                  size={13}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: sidebarAccent }}
                />
                <a
                  href={data.personal_info.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs break-all hover:underline"
                  style={{ color: "#a0aec0" }}
                >
                  {data.personal_info.website.replace("https://", "")}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div
            className="px-8 py-6"
            style={{ borderBottom: `1px solid #ffffff15` }}
          >
            <h2
              className="text-xs tracking-widest uppercase font-semibold mb-4"
              style={{ color: sidebarAccent }}
            >
              Education
            </h2>
            <div className="space-y-5">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <p className="text-white text-sm font-semibold leading-snug">
                    {edu.degree}{" "}
                    {edu.field && (
                      <span className="font-normal text-gray-400">
                        in {edu.field}
                      </span>
                    )}
                  </p>
                  <p className="text-xs mt-1" style={{ color: sidebarAccent }}>
                    {edu.institute || edu.institution}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatDate(edu.graduation_date)}</span>
                    {edu.gpa && <span>GPA {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="px-8 py-6">
            <h2
              className="text-xs tracking-widest uppercase font-semibold mb-4"
              style={{ color: sidebarAccent }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded text-white"
                  style={{
                    backgroundColor: "#ffffff12",
                    border: `1px solid #ffffff20`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ── RIGHT MAIN CONTENT ── */}
      <main className="flex-1 px-10 py-10 bg-white">
        {/* Accent line at top */}
        <div
          className="h-1 w-16 mb-8 rounded"
          style={{ backgroundColor: sidebarAccent }}
        ></div>

        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2 className="text-xs tracking-widest uppercase font-bold mb-3 text-gray-400">
              Professional Summary
            </h2>
            <p
              className="text-gray-700 leading-relaxed text-sm border-l-2 pl-4"
              style={{ borderColor: sidebarAccent }}
            >
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Divider */}
        {data.professional_summary && (
          <div className="border-t border-gray-100 mb-8" />
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs tracking-widest uppercase font-bold mb-5 text-gray-400">
              Experience
            </h2>
            <div className="space-y-7">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Dot indicator */}
                  <div
                    className="absolute -left-6 top-1.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: sidebarAccent }}
                  />
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">
                        {exp.position}
                      </h3>
                      <p
                        className="text-sm font-medium mt-0.5"
                        style={{ color: sidebarAccent }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded whitespace-nowrap ml-4">
                      {formatDate(exp.start_date)} —{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 leading-relaxed mt-2 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        {data.experience && data.experience.length > 0 && (
          <div className="border-t border-gray-100 mb-8" />
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs tracking-widest uppercase font-bold mb-5 text-gray-400">
              Projects
            </h2>
            <div className="space-y-5">
              {data.projects.map((proj, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {proj.name}
                      </h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs mt-1 hover:underline"
                          style={{ color: sidebarAccent }}
                        >
                          <ExternalLink size={11} />
                          {proj.link}
                        </a>
                      )}
                    </div>
                    {proj.type && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full text-white ml-3 flex-shrink-0"
                        style={{ backgroundColor: sidebarAccent }}
                      >
                        {proj.type}
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DarkSidebarTemplate;