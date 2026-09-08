import { useState } from "react";
import ResumeForm from "./components/ResumeForm.jsx";
import ResumePreview from "./components/ResumePreview.jsx";
import ATSChecklist from "./components/ATSChecklist.jsx";
import useLocalStorageState from "./hooks/useLocalStorageState.js";
import exportPlainText from "./utils/exportPlainText.js";

const STORAGE_KEY = "cv-maker-resume-v1";

const defaultResume = () => ({
  contact: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  skills: "",
  experience: [],
  projects: [],
  volunteer: [],
  education: [],
  languages: [],
  certifications: [],
  awards: [],
  customSections: [],
});

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(textarea);
    return ok;
  }
}

function fileNameFor(resume) {
  const name = String((resume.contact || {}).fullName || "")
    .trim()
    .replace(/[^\w-]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return name || "resume";
}

export default function App() {
  const [resume, setResume] = useLocalStorageState(STORAGE_KEY, defaultResume);
  const [copyState, setCopyState] = useState("idle"); // idle | ok | fail

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(exportPlainText(resume));
    setCopyState(ok ? "ok" : "fail");
    window.setTimeout(() => setCopyState("idle"), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([exportPlainText(resume)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileNameFor(resume)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (
      window.confirm(
        "This will permanently delete all your resume data and start over. Continue?"
      )
    ) {
      setResume(defaultResume());
    }
  };

  return (
    <div className="app-shell min-h-screen bg-gray-100 text-gray-900">
      <header className="no-print sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <h1 className="text-lg font-bold">CV Maker</h1>
            <p className="text-xs text-gray-500">
              Free &amp; open-source ATS-friendly resume builder — autosaves in
              your browser
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              title="Opens the print dialog — choose 'Save as PDF' as the destination"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
            >
              Download PDF
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              {copyState === "ok"
                ? "Copied!"
                : copyState === "fail"
                  ? "Copy failed"
                  : "Copy as Plain Text"}
            </button>
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              Download .txt
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              Clear All
            </button>
          </div>
          <p className="basis-full text-right text-[11px] text-gray-500">
            PDF tip: choose A4, 100% scale, no margins, and turn off headers and footers.
          </p>
        </div>
      </header>

      <main className="app-main mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-2">
        <div className="no-print min-w-0 space-y-6">
          <ATSChecklist resume={resume} />
          <ResumeForm resume={resume} onChange={setResume} />
        </div>

        <div className="preview-pane min-w-0 px-2 py-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:py-0">
          <ResumePreview resume={resume} />
        </div>
      </main>

      <footer className="no-print border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
        Open source under the MIT License — your data never leaves your browser.
      </footer>
    </div>
  );
}
