import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ClassicPortraitTemplate from "./templates/ClassicPortraitTemplate";
import DarkSidebarTemplate from "./templates/DarkSidebarTemplate";
import ClassicFormalTemplate from "./templates/ClassicFormalTemplate";
import ColorfulBubblyTemplate from "./templates/ColorfulBubblyTemplate";
import TimeLineProTemplate from "./templates/TimelineProTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "classic-portrait":
        return (
          <ClassicPortraitTemplate data={data} accentColor={accentColor} />
        );
      case "dark-sidebar":
        return <DarkSidebarTemplate data={data} accentColor={accentColor} />;
      case "classic-formal":
        return <ClassicFormalTemplate data={data} accentColor={accentColor} />;
      case "colorful-bubbly":
        return <ColorfulBubblyTemplate data={data} accentColor={accentColor} />;
      case "timeline-pro":
        return <TimeLineProTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={`border border-gray-200 print:shadow-none print:border-none ${classes}`}
      >
        {renderTemplate()}
      </div>
      <style jsx>
        {`
          @page {
            size: A4;
            margin: 0;
          }

          @media print {
            html,
            body {
              margin: 0 !important;
              padding: 0 !important;
              width: 210mm;
              height: 297mm;
              overflow: hidden;
              background: white;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: fixed;
              top: 0;
              left: 0;
              width: 210mm;
              min-height: 297mm;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
            @media print {
              * {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
