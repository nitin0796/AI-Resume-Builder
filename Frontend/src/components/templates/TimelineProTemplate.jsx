import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  ExternalLink,
} from "lucide-react";

const TimeLineProTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getImageSrc = () => {
    const img = data.personal_info?.image;
    if (!img) return null;
    if (typeof img === "string") return img;
    if (typeof img === "object") return URL.createObjectURL(img);
    return null;
  };

  const imageSrc = getImageSrc();

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800">
      {/* Header with gradient background */}
      <header
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: "white" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: "white" }}
        />

        <div className="relative z-10 p-10">
          <div className="flex items-start gap-8 mb-6">
            {/* Profile Image */}
            {imageSrc && (
              <div className="flex-shrink-0">
                <img
                  src={imageSrc}
                  alt="Profile"
                  className="w-32 h-32 rounded-2xl object-cover shadow-xl"
                  style={{
                    border: "4px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            )}

            {/* Name and Title */}
            <div className="flex-1 text-white pt-2">
              <h1 className="text-5xl font-bold mb-2 tracking-tight">
                {data.personal_info?.full_name || "Your Name"}
              </h1>
              {data.personal_info?.profession && (
                <p className="text-xl font-light opacity-90 mb-1">
                  {data.personal_info.profession}
                </p>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-900">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Mail className="size-4 flex-shrink-0" />
                <span className="truncate">{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Phone className="size-4 flex-shrink-0" />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <MapPin className="size-4 flex-shrink-0" />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <a
                target="_blank"
                href={data.personal_info?.linkedin}
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all"
              >
                <Linkedin className="size-4 flex-shrink-0" />
                <span className="truncate text-xs">
                  {data.personal_info.linkedin.split("https://www.")[1]
                    ? data.personal_info.linkedin.split("https://www.")[1]
                    : data.personal_info.linkedin}
                </span>
              </a>
            )}
            {data.personal_info?.website && (
              <a
                target="_blank"
                href={data.personal_info?.website}
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all"
              >
                <Globe className="size-4 flex-shrink-0" />
                <span className="truncate text-xs">
                  {data.personal_info.website.split("https://")[1]
                    ? data.personal_info.website.split("https://")[1]
                    : data.personal_info.website}
                </span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="p-10">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-8 w-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <h2 className="text-2xl font-bold text-gray-900">
                Professional Summary
              </h2>
            </div>
            <p
              className="text-gray-700 leading-relaxed text-base pl-5 border-l-2"
              style={{ borderColor: accentColor + "30" }}
            >
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="h-8 w-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
            </div>

            <div className="space-y-6 pl-5">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-6 border-l-2"
                  style={{ borderColor: accentColor + "30" }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-2 top-2 w-4 h-4 rounded-full border-4 border-white"
                    style={{ backgroundColor: accentColor }}
                  />

                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <p
                        className="font-semibold text-lg"
                        style={{ color: accentColor }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div
                      className="text-sm font-medium px-4 py-1.5 rounded-full"
                      style={{
                        backgroundColor: accentColor + "15",
                        color: accentColor,
                      }}
                    >
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project && data.project.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="h-8 w-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5 pl-5">
              {data.project.map((p, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl border-2 hover:shadow-lg transition-shadow"
                  style={{ borderColor: accentColor + "30" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 flex-1">
                      {p.name}
                    </h3>
                    {p.type && (
                      <span
                        className="text-xs px-3 py-1 rounded-full text-white font-medium ml-2"
                        style={{ backgroundColor: accentColor }}
                      >
                        {p.type}
                      </span>
                    )}
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium hover:underline mb-3"
                      style={{ color: accentColor }}
                    >
                      <ExternalLink size={14} />
                      <span className="truncate">{p.link}</span>
                    </a>
                  )}
                  {p.description && (
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-10">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-8 w-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <h2 className="text-2xl font-bold text-gray-900">Education</h2>
              </div>

              <div className="space-y-5 pl-5">
                {data.education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: accentColor + "08" }}
                  >
                    <h3 className="font-bold text-gray-900 text-base">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p
                      className="font-semibold mt-1"
                      style={{ color: accentColor }}
                    >
                      {edu.institute || edu.institution}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && (
                        <span className="font-medium">GPA: {edu.gpa}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-8 w-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
              </div>

              <div className="flex flex-wrap gap-3 pl-5">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeLineProTemplate;
