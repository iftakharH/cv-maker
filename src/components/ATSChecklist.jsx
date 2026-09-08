const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value) => (value == null ? "" : String(value).trim());

const bulletCount = (entry) =>
  String(entry.bullets == null ? "" : entry.bullets)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean).length;

const skillCount = (resume) =>
  String(resume.skills == null ? "" : resume.skills)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean).length;

/**
 * Live ATS-friendliness checker: flags the most common
 * resume problems as the user types.
 */
export default function ATSChecklist({ resume }) {
  const c = resume.contact || {};
  const experience = resume.experience || [];
  const education = resume.education || [];
  const skills = skillCount(resume);
  const summary = clean(resume.summary);

  const checks = [
    { ok: Boolean(clean(c.fullName)), text: "Add your full name" },
    { ok: EMAIL_RE.test(clean(c.email)), text: "Add a valid email address" },
    { ok: Boolean(clean(c.phone)), text: "Add a phone number" },
    {
      ok: summary.length >= 40,
      text: "Write a professional summary (2–3 sentences)",
    },
    {
      ok:
        experience.length > 0 &&
        experience.every((e) => clean(e.role) && clean(e.company)),
      text: "Add work experience with job title and company",
    },
    {
      ok: experience.length > 0 && experience.every((e) => bulletCount(e) >= 2),
      text: "Give every job at least 2 achievement bullets",
    },
    { ok: education.length > 0, text: "Add at least one education entry" },
    { ok: skills >= 5, text: "List at least 5 relevant skills" },
  ];

  const passed = checks.filter((check) => check.ok).length;
  const total = checks.length;
  const pct = Math.round((passed / total) * 100);
  const complete = passed === total;

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900">ATS Readiness</h2>
        <span
          className={`text-sm font-semibold ${
            complete ? "text-green-700" : "text-amber-700"
          }`}
        >
          {passed}/{total} passed
        </span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            complete ? "bg-green-600" : "bg-amber-500"
          }`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <ul className="mt-4 space-y-1.5">
        {checks.map((check) => (
          <li
            key={check.text}
            className={`flex items-start gap-2 text-sm ${
              check.ok ? "text-green-800" : "text-amber-800"
            }`}
          >
            <span className="font-bold" aria-hidden="true">
              {check.ok ? "✓" : "⚠"}
            </span>
            <span>{check.text}</span>
          </li>
        ))}
        <li className="flex items-start gap-2 text-sm text-green-800">
          <span className="font-bold" aria-hidden="true">
            ✓
          </span>
          <span>
            Single-column layout, standard fonts, standard section headers, no
            images or tables (enforced by this template)
          </span>
        </li>
      </ul>

      <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
        Export as PDF for uploads, or use “Copy as Plain Text” when a form asks
        you to paste your resume.
      </p>
    </section>
  );
}
