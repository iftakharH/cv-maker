const BULLET = "•";
const DASH = " — ";
const RANGE = " – ";

const clean = (value) => (value == null ? "" : String(value).trim());

const hasContent = (entry) =>
  Object.entries(entry).some(
    ([key, value]) => key !== "id" && typeof value === "string" && value.trim() !== ""
  );

/** "Jan 2022 – Present" style date range, or whatever parts exist. */
export function formatRange(start, end, current) {
  const s = clean(start);
  const e = current ? "Present" : clean(end);
  if (s && e) return `${s}${RANGE}${e}`;
  return s || e || "";
}

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

/**
 * Converts the resume form state into a plain-text resume
 * formatted for pasting into ATS web forms.
 */
export default function exportPlainText(resume) {
  const c = resume.contact || {};
  const out = [];

  const name = clean(c.fullName);
  if (name) out.push(name);
  if (clean(c.title)) out.push(clean(c.title));

  const contact = [
    clean(c.location),
    clean(c.phone),
    clean(c.email),
    clean(c.linkedin),
    clean(c.website),
  ]
    .filter(Boolean)
    .join(" | ");
  if (contact) out.push(contact);

  const section = (title) => {
    out.push("", title.toUpperCase(), "-".repeat(title.length));
  };

  if (clean(resume.summary)) {
    section("Summary");
    out.push(clean(resume.summary));
  }

  const experience = (resume.experience || []).filter(hasContent);
  if (experience.length > 0) {
    section("Work Experience");
    experience.forEach((e) => {
      out.push("");
      const head = [clean(e.role), clean(e.company)].filter(Boolean).join(DASH);
      if (head) out.push(head);
      const meta = [clean(e.location), formatRange(e.start, e.end, e.current)]
        .filter(Boolean)
        .join(" | ");
      if (meta) out.push(meta);
      bulletLines(e.bullets).forEach((line) => out.push(`${BULLET} ${line}`));
    });
  }

  const projects = (resume.projects || []).filter(hasContent);
  if (projects.length > 0) {
    section("Projects");
    projects.forEach((project) => {
      out.push("");
      const head = [clean(project.name), clean(project.tech)]
        .filter(Boolean)
        .join(DASH);
      if (head) out.push(head);
      const meta = [clean(project.link), clean(project.date)]
        .filter(Boolean)
        .join(" | ");
      if (meta) out.push(meta);
      bulletLines(project.description).forEach((line) =>
        out.push(`${BULLET} ${line}`)
      );
    });
  }

  const volunteer = (resume.volunteer || []).filter(hasContent);
  if (volunteer.length > 0) {
    section("Volunteer Experience");
    volunteer.forEach((entry) => {
      out.push("");
      const head = [clean(entry.role), clean(entry.organization)]
        .filter(Boolean)
        .join(DASH);
      if (head) out.push(head);
      const meta = [clean(entry.location), formatRange(entry.start, entry.end, entry.current)]
        .filter(Boolean)
        .join(" | ");
      if (meta) out.push(meta);
      bulletLines(entry.bullets).forEach((line) =>
        out.push(`${BULLET} ${line}`)
      );
    });
  }

  const education = (resume.education || []).filter(hasContent);
  if (education.length > 0) {
    section("Education");
    education.forEach((e) => {
      out.push("");
      const head = [clean(e.degree), clean(e.school)].filter(Boolean).join(DASH);
      if (head) out.push(head);
      const meta = [clean(e.location), formatRange(e.start, e.end, false)]
        .filter(Boolean)
        .join(" | ");
      if (meta) out.push(meta);
      if (clean(e.details)) out.push(clean(e.details));
    });
  }

  const skills = skillTags(resume.skills);
  if (skills.length > 0) {
    section("Skills");
    out.push(skills.join(", "));
  }

  const languages = (resume.languages || []).filter(hasContent);
  if (languages.length > 0) {
    section("Languages");
    out.push(
      languages
        .map((language) =>
          [clean(language.name), clean(language.proficiency)]
            .filter(Boolean)
            .join(DASH)
        )
        .filter(Boolean)
        .join(", ")
    );
  }

  const certifications = (resume.certifications || []).filter(hasContent);
  if (certifications.length > 0) {
    section("Certifications");
    certifications.forEach((e) => {
      const tail = [clean(e.issuer), clean(e.year)].filter(Boolean).join(", ");
      const line = [clean(e.name), tail].filter(Boolean).join(DASH);
      if (line) out.push(line);
    });
  }

  const awards = (resume.awards || []).filter(hasContent);
  if (awards.length > 0) {
    section("Awards & Honors");
    awards.forEach((award) => {
      const tail = [clean(award.issuer), clean(award.year)]
        .filter(Boolean)
        .join(", ");
      const line = [clean(award.name), tail].filter(Boolean).join(DASH);
      if (line) out.push(line);
    });
  }

  const customSections = resume.customSections || [];
  customSections.forEach((customSection) => {
    const entries = (customSection.entries || []).filter(hasContent);
    if (!clean(customSection.title) || entries.length === 0) return;

    section(clean(customSection.title));
    entries.forEach((entry) => {
      out.push("");
      if (clean(entry.heading)) out.push(clean(entry.heading));
      const meta = [clean(entry.subheading), clean(entry.date)]
        .filter(Boolean)
        .join(" | ");
      if (meta) out.push(meta);
      bulletLines(entry.description).forEach((line) =>
        out.push(`${BULLET} ${line}`)
      );
    });
  });

  return `${out.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}
