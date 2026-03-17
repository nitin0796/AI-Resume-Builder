import ResumeModel from "../models/Resume.Model.js";
import geminiAI from "../configs/geminiAI.js";

// enhance resume professional summary
// POST: /api/ai/enhance-summary
export const enhanceSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "User content is required" });
    }

    const response = await geminiAI.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a resume writing assistant. Enhance the user's resume summary to make it more professional and impactful. summary should be 1-2 sentences also highlight the key skills, achievements, career objectives and experience. Make it compelling and ATS-friendly. and only return text no options or anything else",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const summary = response.choices[0].message.content;

    return res.status(200).json({
      message: "Summary enhanced successfully",
      summary,
    });
  } catch (error) {
    console.error("Error enhancing summary", error);
    res.status(400).json({ message: error.message });
  }
};

// enhance job description
// POST: /api/ai/enhance-job-description
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "User content is required" });
    }

    const response = await geminiAI.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a resume writing assistant. Enhance the user's job description to make it more professional and impactful. job description should be 1-2 sentences also highlight the key responsibilities, achievements and requirements. Use action verbs and quantify achievements, results where possible. Make it compelling and ATS-friendly. and only return text no options or anything else",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const jobDescription = response.choices[0].message.content;

    return res.status(200).json({
      message: "Job description enhanced successfully",
      jobDescription,
    });
  } catch (error) {
    console.error("Error enhancing job description", error);
    res.status(400).json({ message: error.message });
  }
};

// upload resume to db
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required" });
    }

    const systemPrompt =
      "You are an expert AI Agent to extract data from resume.";

    const userPrompt = `Extract all the information from the resume: ${resumeText}. Provide the output in JSON format exactly matching this structure, with no additional data or explanation:
    {
      "professional_summary": "string",
      "skills": ["string", "string"],
      "personal_info": {
        "full_name": "string",
        "profession": "string",
        "email": "string",
        "phone": "string",
        "location": "string",
        "linkedin": "string",
        "website": "string"
      },
      "experience": [
        {
          "company": "string",
          "position": "string",
          "start_date": "string",
          "end_date": "string",
          "description": "string",
          "is_current": boolean
        }
      ],
      "project": [
        {
          "name": "string",
          "type": "string",
          "link": "string",
          "description": "string"
        }
      ],
      "education": [
        {
          "institution": "string",
          "degree": "string",
          "field": "string",
          "graduation_date": "string",
          "gpa": "string"
        }
      ]
    }`;

    const response = await geminiAI.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const resumeData = response.choices[0].message.content;
    const parseData = JSON.parse(resumeData);

    if (parseData.skills) {
      if (typeof parseData.skills === "string") {
        try {
          const parsedSkills = JSON.parse(parseData.skills);
          parseData.skills = Array.isArray(parsedSkills)
            ? parsedSkills
            : [parseData.skills];
        } catch (e) {
          parseData.skills = parseData.skills.split(",").map((s) => s.trim());
        }
      }

      if (Array.isArray(parseData.skills)) {
        parseData.skills = parseData.skills
          .flat(Infinity)
          .map((skill) => {
            if (typeof skill === "string") return skill.trim();
            if (typeof skill === "object" && skill !== null)
              return (skill.title || skill.name || "").trim();
            return "";
          })
          .filter(Boolean);
      } else {
        parseData.skills = [];
      }
    }

    const resume = await ResumeModel.create({
      userId,
      title,
      ...parseData,
    });

    return res.status(201).json({
      message: "Resume uploaded successfully",
      resume: {
        _id: resume._id,
        title: resume.title,
      },
    });
  } catch (error) {
    console.error("Error uploading resume", error);
    res.status(400).json({ message: error.message });
  }
};
