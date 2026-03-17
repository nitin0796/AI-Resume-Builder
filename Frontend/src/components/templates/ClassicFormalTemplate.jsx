import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

const ClassicFormalTemplate = ({ data, accentColor }) => {
  const accent = accentColor || "#1e3a5f";

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const SectionTitle = ({ children }) => (
    <div className="flex items-center gap-3 mb-5">
      <h2
        className="text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap"
        style={{ color: accent }}
      >
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: accent + "30" }} />
    </div>
  );

  return (
    <div
      className="max-w-4xl mx-auto bg-white text-gray-800"
      style={{
        fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
      }}
    >
      {/* ── TOP HEADER BAND ── */}
      <header style={{ backgroundColor: accent }}>
        <div className="px-10 pt-10 pb-6">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-1">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.personal_info?.profession && (
            <p className="text-sm tracking-widest uppercase text-white opacity-70 mb-4">
              {data.personal_info.profession}
            </p>
          )}
        </div>

        {/* Contact bar */}
        <div
          className="px-10 py-3 flex flex-wrap gap-6 text-xs text-white"
          style={{ backgroundColor: accent + "cc" }}
        >
          {data.personal_info?.email && (
            <span className="flex items-center gap-1.5 opacity-90">
              <Mail size={11} /> {data.personal_info.email}
            </span>
          )}
          {data.personal_info?.phone && (
            <span className="flex items-center gap-1.5 opacity-90">
              <Phone size={11} /> {data.personal_info.phone}
            </span>
          )}
          {data.personal_info?.location && (
            <span className="flex items-center gap-1.5 opacity-90">
              <MapPin size={11} /> {data.personal_info.location}
            </span>
          )}
          {data.personal_info?.linkedin && (
            <a
              href={data.personal_info.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 opacity-90 hover:opacity-100"
            >
              <Linkedin size={11} />
              {data.personal_info.linkedin
                .replace("https://www.", "")
                .replace("https://", "")}
            </a>
          )}
          {data.personal_info?.website && (
            <a
              href={data.personal_info.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 opacity-90 hover:opacity-100"
            >
              <Globe size={11} />
              {data.personal_info.website.replace("https://", "")}
            </a>
          )}
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="px-10 py-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <SectionTitle>Professional Summary</SectionTitle>
            <p className="text-sm text-gray-700 leading-relaxed italic">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <SectionTitle>Professional Experience</SectionTitle>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">
                        {exp.position}
                      </h3>
                      <p
                        className="text-sm font-semibold mt-0.5"
                        style={{ color: accent }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-sm text-white flex-shrink-0 ml-4"
                      style={{ backgroundColor: accent }}
                    >
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.description && (
                    <p
                      className="text-sm text-gray-600 leading-relaxed mt-2 whitespace-pre-line pl-3 border-l-2"
                      style={{ borderColor: accent + "40" }}
                    >
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-10">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {edu.degree}{" "}
                      {edu.field && (
                        <span className="font-normal">in {edu.field}</span>
                      )}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: accent }}>
                      {edu.institute || edu.institution}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500 mt-0.5">
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
              <SectionTitle>Core Skills</SectionTitle>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {data.project && data.project.length > 0 && (
          <section className="mt-8">
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-4">
              {data.project.map((proj, index) => (
                <div key={index} className="flex gap-4">
                  <div
                    className="w-1 rounded-full flex-shrink-0 self-stretch"
                    style={{ backgroundColor: accent + "50" }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 text-sm">
                        {proj.name}
                      </h3>
                      {proj.type && (
                        <span
                          className="text-xs font-medium ml-3"
                          style={{ color: accent }}
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
                        className="flex items-center gap-1 text-xs mt-1 hover:underline"
                        style={{ color: accent }}
                      >
                        <ExternalLink size={11} />
                        {proj.link}
                      </a>
                    )}
                    {proj.description && (
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {proj.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicFormalTemplate;