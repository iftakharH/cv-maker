import { formatRange } from "../utils/exportPlainText.js";

const DASH = " — ";

const clean = (value) => (value == null ? "" : String(value).trim());

const bulletLines = (value) =>
  String(value == null ? "" : value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const skillTags = (value) =>
  String(value == null ? "" : value)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const hasContent = (entry) =>
  Object.entries(entry).some(
    ([key, value]) => key !== "id" && typeof value === "string" && value.trim() !== ""
  );

function SectionTitle({ children }) {
  return (
    <h2 className="resume-section-title mt-5 border-b border-black pb-0.5 text-[15px] font-bold">
      {children}
    </h2>
  );
}

/**
 * Live-rendered, ATS-safe resume. Strictly single column,
 * Arial, standard headers, plain • bullets, no images.
 */
export default function ResumePreview({ resume }) {
  const c = resume.contact || {};
  const experience = (resume.experience || []).filter(hasContent);
  const projects = (resume.projects || []).filter(hasContent);
  const volunteer = (resume.volunteer || []).filter(hasContent);
  const education = (resume.education || []).filter(hasContent);
  const languages = (resume.languages || []).filter(hasContent);
  const certifications = (resume.certifications || []).filter(hasContent);
  const awards = (resume.awards || []).filter(hasContent);
  const customSections = (resume.customSections || [])
    .map((section) => ({
      ...section,
      entries: (section.entries || []).filter(hasContent),
    }))
    .filter((section) => clean(section.title) && section.entries.length > 0);
  const skills = skillTags(resume.skills);
  const summary = clean(resume.summary);
  const name = clean(c.fullName);
  const jobTitle = clean(c.title);

  const contactParts = [c.location, c.phone, c.email, c.linkedin, c.website]
    .map(clean)
    .filter(Boolean);

  const isEmpty =
    !name &&
    !jobTitle &&
    contactParts.length === 0 &&
    !summary &&
    experience.length === 0 &&
    projects.length === 0 &&
    volunteer.length === 0 &&
    education.length === 0 &&
    skills.length === 0 &&
    languages.length === 0 &&
    certifications.length === 0 &&
    awards.length === 0 &&
    customSections.length === 0;

  return (
    <div className="resume-paper mx-auto w-full max-w-[210mm] min-h-[297mm] bg-white p-6 text-[13px] leading-relaxed shadow-sm sm:p-[15mm]">
      {isEmpty && (
        <p className="no-print mb-6 rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
          Start filling in the form — your resume preview will appear here.
        </p>
      )}

      {name && <h1 className="resume-name text-[26px] font-bold leading-tight">{name}</h1>}
      {jobTitle && <p className="resume-jobtitle mt-0.5 text-[15px] font-semibold">{jobTitle}</p>}
      {contactParts.length > 0 && (
        <p className="mt-1 text-[12px]">{contactParts.join("  •  ")}</p>
      )}

      {summary && (
        <>
          <SectionTitle>Summary</SectionTitle>
          <p className="mt-1.5 whitespace-pre-line">{summary}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <SectionTitle>Work Experience</SectionTitle>
          {experience.map((e) => (
            <div key={e.id} className="mt-3">
              <p className="resume-entry-title font-semibold">
                {[clean(e.role), clean(e.company)].filter(Boolean).join(DASH)}
              </p>
              <p className="text-[12px]">
                {[clean(e.location), formatRange(e.start, e.end, e.current)]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
              {bulletLines(e.bullets).length > 0 && (
                <ul className="mt-1">
                  {bulletLines(e.bullets).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {projects.length > 0 && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((project) => (
            <div key={project.id} className="mt-3">
              <p className="resume-entry-title font-semibold">
                {[clean(project.name), clean(project.tech)]
                  .filter(Boolean)
                  .join(DASH)}
              </p>
              <p className="text-[12px]">
                {[clean(project.link), clean(project.date)]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
              {bulletLines(project.description).length > 0 && (
                <ul className="mt-1">
                  {bulletLines(project.description).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {volunteer.length > 0 && (
        <>
          <SectionTitle>Volunteer Experience</SectionTitle>
          {volunteer.map((entry) => (
            <div key={entry.id} className="mt-3">
              <p className="resume-entry-title font-semibold">
                {[clean(entry.role), clean(entry.organization)]
                  .filter(Boolean)
                  .join(DASH)}
              </p>
              <p className="text-[12px]">
                {[clean(entry.location), formatRange(entry.start, entry.end, entry.current)]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
              {bulletLines(entry.bullets).length > 0 && (
                <ul className="mt-1">
                  {bulletLines(entry.bullets).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {education.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          {education.map((e) => (
            <div key={e.id} className="mt-3">
              <p className="resume-entry-title font-semibold">
                {[clean(e.degree), clean(e.school)].filter(Boolean).join(DASH)}
              </p>
              <p className="text-[12px]">
                {[clean(e.location), formatRange(e.start, e.end, false)]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
              {clean(e.details) && (
                <p className="mt-0.5 whitespace-pre-line">{clean(e.details)}</p>
              )}
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <p className="mt-1.5">{skills.join(", ")}</p>
        </>
      )}

      {languages.length > 0 && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <p className="mt-1.5">
            {languages
              .map((language) =>
                [clean(language.name), clean(language.proficiency)]
                  .filter(Boolean)
                  .join(DASH)
              )
              .filter(Boolean)
              .join(", ")}
          </p>
        </>
      )}

      {certifications.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((e) => (
            <div key={e.id} className="mt-2">
              <p className="resume-entry-title font-semibold">{clean(e.name)}</p>
              <p className="text-[12px]">
                {[clean(e.issuer), clean(e.year)].filter(Boolean).join(" | ")}
              </p>
            </div>
          ))}
        </>
      )}

      {awards.length > 0 && (
        <>
          <SectionTitle>Awards &amp; Honors</SectionTitle>
          {awards.map((award) => (
            <div key={award.id} className="mt-2">
              <p className="resume-entry-title font-semibold">{clean(award.name)}</p>
              <p className="text-[12px]">
                {[clean(award.issuer), clean(award.year)].filter(Boolean).join(" | ")}
              </p>
            </div>
          ))}
        </>
      )}

      {customSections.map((section) => (
        <div key={section.id}>
          <SectionTitle>{clean(section.title)}</SectionTitle>
          {section.entries.map((entry) => (
            <div key={entry.id} className="mt-3">
              {clean(entry.heading) && (
                <p className="resume-entry-title font-semibold">
                  {clean(entry.heading)}
                </p>
              )}
              {[clean(entry.subheading), clean(entry.date)].filter(Boolean).length >
                0 && (
                <p className="text-[12px]">
                  {[clean(entry.subheading), clean(entry.date)]
                    .filter(Boolean)
                    .join(" | ")}
                </p>
              )}
              {bulletLines(entry.description).length > 0 && (
                <ul className="mt-1">
                  {bulletLines(entry.description).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
