import imageKit from "../configs/imageKit.js";
import ResumeModel from "../models/Resume.Model.js";
import fs from "fs";

// new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await ResumeModel.create({ userId, title });

    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    console.error("Error creating resume", error);
    res.status(400).json({ message: error.message });
  }
};

// delete a resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    await ResumeModel.findOneAndDelete({ userId, _id: id });

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume", error);
    res.status(400).json({ message: error.message });
  }
};

// get resume by id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const resume = await ResumeModel.findOne({ userId, _id: id });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    console.error("Error getting resume by id", error);
    res.status(500).json({ message: error.message });
  }
};

// get resume by public id
// GET: /api/resumes/public
export const getResumeByPublicId = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await ResumeModel.findOne({ public: true, _id: id });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    console.error("Error getting resume by public id", error);
    res.status(400).json({ message: error.message });
  }
};

// update resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removebg } = req.body;
    const image = req.file;

    let resumeDataCopy;
    if (typeof resumeData === "string") {
      resumeDataCopy = await JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    console.log("Req.file:", image);
    if (image) {
      const bufferData = fs.createReadStream(image.path);

      const response = await imageKit.files.upload({
        file: bufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removebg === "yes" ? ",e-bgremove" : ""),
        },
      });

      if (!resumeDataCopy.personal_info) {
        resumeDataCopy.personal_info = {};
      }
      resumeDataCopy.personal_info.image = response.url;
    }

    if (resumeDataCopy.skills) {
      if (typeof resumeDataCopy.skills === "string") {
        try {
          const parsedSkills = JSON.parse(resumeDataCopy.skills);
          resumeDataCopy.skills = Array.isArray(parsedSkills)
            ? parsedSkills
            : [resumeDataCopy.skills];
        } catch (e) {
          resumeDataCopy.skills = resumeDataCopy.skills
            .split(",")
            .map((s) => s.trim());
        }
      }

      if (Array.isArray(resumeDataCopy.skills)) {
        resumeDataCopy.skills = resumeDataCopy.skills
          .flat(Infinity)
          .map((skill) => {
            if (typeof skill === "string") return skill.trim();
            if (typeof skill === "object" && skill !== null)
              return (skill.title || skill.name || "").trim();
            return "";
          })
          .filter(Boolean);
      } else {
        resumeDataCopy.skills = [];
      }
    }

    const resume = await ResumeModel.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true },
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res
      .status(200)
      .json({ message: "Resume updated successfully", resume });
  } catch (error) {
    console.error("Error updating resume", error, error.help, error.message);
    res.status(400).json({ message: error.message });
  }
};
