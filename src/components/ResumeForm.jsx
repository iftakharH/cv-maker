import SectionEditor from "./SectionEditor.jsx";
import CustomSectionsEditor from "./CustomSectionsEditor.jsx";

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800";

const makeId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const EXPERIENCE_FIELDS = [
  {
    name: "role",
    label: "Job Title",
    placeholder: "Software Engineer",
    span: 2,
  },
  { name: "company", label: "Company", placeholder: "Acme Corp", span: 1 },
  { name: "location", label: "Location", placeholder: "Berlin, Germany", span: 1 },
  { name: "start", label: "Start Date", placeholder: "Jan 2022", span: 1 },
  { name: "end", label: "End Date", placeholder: "Mar 2024", span: 1 },
  {
    name: "current",
    label: "I currently work here",
    type: "checkbox",
    span: 2,
  },
  {
    name: "bullets",
    label: "Key Achievements (one bullet per line)",
    type: "textarea",
    placeholder: "Built and shipped a checkout flow used by 40k users\nCut page load time by 35%",
    span: 2,
  },
];

const PROJECT_FIELDS = [
  {
    name: "name",
    label: "Project Name",
    placeholder: "Customer analytics platform",
    span: 2,
  },
  {
    name: "tech",
    label: "Role / Tech Stack",
    placeholder: "React, Node.js, PostgreSQL",
    span: 2,
  },
  {
    name: "link",
    label: "Link (optional)",
    placeholder: "github.com/you/project",
    span: 1,
  },
  { name: "date", label: "Date", placeholder: "2024", span: 1 },
  {
    name: "description",
    label: "Highlights (one bullet per line)",
    type: "textarea",
    placeholder: "Built a dashboard used by 2,000+ monthly users\nReduced report generation time by 60%",
    span: 2,
  },
];

const VOLUNTEER_FIELDS = [
  { name: "role", label: "Role", placeholder: "Volunteer Coordinator", span: 2 },
  {
    name: "organization",
    label: "Organization",
    placeholder: "Community Food Bank",
    span: 1,
  },
  { name: "location", label: "Location", placeholder: "Berlin, Germany", span: 1 },
  { name: "start", label: "Start Date", placeholder: "Jan 2022", span: 1 },
  { name: "end", label: "End Date", placeholder: "Present", span: 1 },
  {
    name: "current",
    label: "I currently volunteer here",
    type: "checkbox",
    span: 2,
  },
  {
    name: "bullets",
    label: "Key contributions (one bullet per line)",
    type: "textarea",
    placeholder: "Organized weekly food distribution for 300 families\nTrained and scheduled a team of 20 volunteers",
    span: 2,
  },
];

const EDUCATION_FIELDS = [
  {
    name: "degree",
    label: "Degree / Certificate",
    placeholder: "BSc Computer Science",
    span: 2,
  },
  {
    name: "school",
    label: "School / University",
    placeholder: "University of Amsterdam",
    span: 1,
  },
  { name: "location", label: "Location", placeholder: "Amsterdam, NL", span: 1 },
  { name: "start", label: "Start", placeholder: "2015", span: 1 },
  { name: "end", label: "End", placeholder: "2019", span: 1 },
  {
    name: "details",
    label: "Details (optional)",
    placeholder: "GPA, honours, relevant coursework…",
    span: 2,
  },
];

const CERTIFICATION_FIELDS = [
  {
    name: "name",
    label: "Certification",
    placeholder: "AWS Certified Solutions Architect",
    span: 2,
  },
  {
    name: "issuer",
    label: "Issuing Organization",
    placeholder: "Amazon Web Services",
    span: 1,
  },
  { name: "year", label: "Year", placeholder: "2024", span: 1 },
];

const LANGUAGE_FIELDS = [
  { name: "name", label: "Language", placeholder: "English", span: 1 },
  {
    name: "proficiency",
    label: "Proficiency",
    placeholder: "Native / C2 / Professional",
    span: 1,
  },
];

const AWARD_FIELDS = [
  {
    name: "name",
    label: "Award / Honor",
    placeholder: "Employee of the Year",
    span: 2,
  },
  { name: "issuer", label: "Issuer", placeholder: "Acme Corp", span: 1 },
  { name: "year", label: "Year", placeholder: "2024", span: 1 },
];

const createExperience = () => ({
  id: makeId(),
  role: "",
  company: "",
  location: "",
  start: "",
  end: "",
  current: false,
  bullets: "",
});

const createProject = () => ({
  id: makeId(),
  name: "",
  tech: "",
  link: "",
  date: "",
  description: "",
});

const createVolunteer = () => ({
  id: makeId(),
  role: "",
  organization: "",
  location: "",
  start: "",
  end: "",
  current: false,
  bullets: "",
});

const createEducation = () => ({
  id: makeId(),
  degree: "",
  school: "",
  location: "",
  start: "",
  end: "",
  details: "",
});

const createCertification = () => ({
  id: makeId(),
  name: "",
  issuer: "",
  year: "",
});

const createLanguage = () => ({
  id: makeId(),
  name: "",
  proficiency: "",
});

const createAward = () => ({
  id: makeId(),
  name: "",
  issuer: "",
  year: "",
});

function TextField({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

function FormSection({ title, hint, children }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {hint && <p className="mt-0.5 text-xs text-gray-500">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ResumeForm({ resume, onChange }) {
  const contact = resume.contact || {};
  const experience = resume.experience || [];
  const projects = resume.projects || [];
  const volunteer = resume.volunteer || [];
  const education = resume.education || [];
  const languages = resume.languages || [];
  const certifications = resume.certifications || [];
  const awards = resume.awards || [];
  const customSections = resume.customSections || [];
  const skillsString = String(resume.skills || "");
  const summary = String(resume.summary || "");

  const setField = (patch) => onChange({ ...resume, ...patch });
  const setContactField = (name, value) =>
    onChange({ ...resume, contact: { ...contact, [name]: value } });

  const skillTags = skillsString
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <FormSection
        title="Contact Info"
        hint="ATS parsers scan this block first — name, email and phone matter most."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextField
            label="Full Name"
            value={contact.fullName || ""}
            onChange={(e) => setContactField("fullName", e.target.value)}
            placeholder="Jane Doe"
          />
          <TextField
            label="Professional Title"
            value={contact.title || ""}
            onChange={(e) => setContactField("title", e.target.value)}
            placeholder="Senior Software Engineer"
          />
          <TextField
            label="Email"
            value={contact.email || ""}
            onChange={(e) => setContactField("email", e.target.value)}
            placeholder="jane.doe@email.com"
          />
          <TextField
            label="Phone"
            value={contact.phone || ""}
            onChange={(e) => setContactField("phone", e.target.value)}
            placeholder="+49 151 23456789"
          />
          <TextField
            label="Location"
            value={contact.location || ""}
            onChange={(e) => setContactField("location", e.target.value)}
            placeholder="Berlin, Germany"
          />
          <TextField
            label="LinkedIn (optional)"
            value={contact.linkedin || ""}
            onChange={(e) => setContactField("linkedin", e.target.value)}
            placeholder="linkedin.com/in/janedoe"
          />
          <TextField
            label="Website / Portfolio (optional)"
            value={contact.website || ""}
            onChange={(e) => setContactField("website", e.target.value)}
            placeholder="janedoe.dev"
          />
        </div>
      </FormSection>

      <FormSection
        title="Summary"
        hint="2–3 sentences: who you are, your strongest skills, and what you're aiming for."
      >
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => setField({ summary: e.target.value })}
          placeholder="Software engineer with 6 years of experience building web applications. Specialised in React and Node.js, with a track record of shipping reliable products at scale. Looking to join a product-driven team."
          className={inputClass}
        />
      </FormSection>

      <FormSection
        title="Work Experience"
        hint="Most recent first — reorder with the ↑ / ↓ buttons. Dates like “Jan 2022” parse best."
      >
        <SectionEditor
          itemLabel="Position"
          entries={experience}
          fields={EXPERIENCE_FIELDS}
          entryTitle={(e) =>
            [e.role, e.company].filter((v) => String(v || "").trim()).join(" — ")
          }
          createEntry={createExperience}
          onChange={(list) => setField({ experience: list })}
        />
      </FormSection>

      <FormSection
        title="Projects"
        hint="Show practical work, case studies, portfolios, research, or side projects relevant to the role."
      >
        <SectionEditor
          itemLabel="Project"
          entries={projects}
          fields={PROJECT_FIELDS}
          entryTitle={(e) => String(e.name || "").trim()}
          createEntry={createProject}
          onChange={(list) => setField({ projects: list })}
        />
      </FormSection>

      <FormSection
        title="Volunteer Experience"
        hint="Include community, nonprofit, leadership, or professional association work."
      >
        <SectionEditor
          itemLabel="Volunteer Role"
          entries={volunteer}
          fields={VOLUNTEER_FIELDS}
          entryTitle={(e) =>
            [e.role, e.organization]
              .filter((v) => String(v || "").trim())
              .join(" — ")
          }
          createEntry={createVolunteer}
          onChange={(list) => setField({ volunteer: list })}
        />
      </FormSection>

      <FormSection
        title="Education"
        hint="Most recent or highest first — reorder with the ↑ / ↓ buttons."
      >
        <SectionEditor
          itemLabel="Education"
          entries={education}
          fields={EDUCATION_FIELDS}
          entryTitle={(e) => String(e.degree || "").trim()}
          createEntry={createEducation}
          onChange={(list) => setField({ education: list })}
        />
      </FormSection>

      <FormSection
        title="Skills"
        hint="Comma-separated — these become a clean list ATS parsers can read."
      >
        <input
          type="text"
          value={skillsString}
          onChange={(e) => setField({ skills: e.target.value })}
          placeholder="JavaScript, React, SQL, Project Management, Agile"
          className={inputClass}
        />
        {skillTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skillTags.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </FormSection>

      <FormSection
        title="Languages"
        hint="List languages and the proficiency level relevant to the job."
      >
        <SectionEditor
          itemLabel="Language"
          orderHint=""
          entries={languages}
          fields={LANGUAGE_FIELDS}
          entryTitle={(e) => String(e.name || "").trim()}
          createEntry={createLanguage}
          onChange={(list) => setField({ languages: list })}
        />
      </FormSection>

      <FormSection
        title="Certifications (optional)"
        hint="Licenses and certificates — leave empty to hide the section."
      >
        <SectionEditor
          itemLabel="Certification"
          entries={certifications}
          fields={CERTIFICATION_FIELDS}
          entryTitle={(e) => String(e.name || "").trim()}
          createEntry={createCertification}
          onChange={(list) => setField({ certifications: list })}
        />
      </FormSection>

      <FormSection
        title="Awards & Honors (optional)"
        hint="Recognition, scholarships, competitions, or notable achievements."
      >
        <SectionEditor
          itemLabel="Award"
          orderHint=""
          entries={awards}
          fields={AWARD_FIELDS}
          entryTitle={(e) => String(e.name || "").trim()}
          createEntry={createAward}
          onChange={(list) => setField({ awards: list })}
        />
      </FormSection>

      <FormSection
        title="Custom Sections"
        hint="Add sections such as Publications, Interests, Memberships, Conferences, or anything specific to your field."
      >
        <CustomSectionsEditor
          sections={customSections}
          onChange={(list) => setField({ customSections: list })}
        />
      </FormSection>
    </div>
  );
}
