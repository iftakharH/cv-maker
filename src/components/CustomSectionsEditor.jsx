import SectionEditor from "./SectionEditor.jsx";

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800";

const iconButtonClass =
  "h-7 w-7 rounded-md border border-gray-300 bg-white text-sm leading-none text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";

const makeId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const CUSTOM_ENTRY_FIELDS = [
  {
    name: "heading",
    label: "Title / Heading",
    placeholder: "Professional membership or publication title",
    span: 2,
  },
  {
    name: "subheading",
    label: "Organization / Context",
    placeholder: "Organization, publisher, or relevant context",
    span: 1,
  },
  { name: "date", label: "Date", placeholder: "2024", span: 1 },
  {
    name: "description",
    label: "Details (one bullet per line)",
    type: "textarea",
    placeholder: "Add the details that matter for this section",
    span: 2,
  },
];

const createCustomEntry = () => ({
  id: makeId(),
  heading: "",
  subheading: "",
  date: "",
  description: "",
});

const createCustomSection = () => ({
  id: makeId(),
  title: "",
  entries: [],
});

export default function CustomSectionsEditor({ sections, onChange }) {
  const updateSection = (id, patch) =>
    onChange(
      sections.map((section) =>
        section.id === id ? { ...section, ...patch } : section
      )
    );

  const removeSection = (id) =>
    onChange(sections.filter((section) => section.id !== id));

  const moveSection = (id, direction) => {
    const index = sections.findIndex((section) => section.id === id);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= sections.length) return;

    const next = [...sections];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-gray-600">
          {sections.length} {sections.length === 1 ? "section" : "sections"}
        </span>
        <button
          type="button"
          onClick={() => onChange([...sections, createCustomSection()])}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          + Add Section
        </button>
      </div>

      {sections.length === 0 && (
        <p className="mt-3 rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-4 text-center text-sm text-gray-500">
          Add a section for publications, memberships, interests, conferences,
          or anything else relevant to your field.
        </p>
      )}

      <div className="mt-3 space-y-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="rounded-lg border border-gray-300 bg-gray-50 p-4"
          >
            <div className="mb-4 flex items-end gap-2">
              <label className="min-w-0 flex-1">
                <span className="mb-1 block text-sm font-medium text-gray-700">
                  Section Name
                </span>
                <input
                  type="text"
                  value={section.title || ""}
                  onChange={(event) =>
                    updateSection(section.id, { title: event.target.value })
                  }
                  placeholder="Publications, Awards, Interests..."
                  aria-label={`Custom section ${index + 1} name`}
                  className={inputClass}
                />
              </label>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveSection(section.id, -1)}
                  disabled={index === 0}
                  title="Move section up"
                  aria-label="Move custom section up"
                  className={iconButtonClass}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(section.id, 1)}
                  disabled={index === sections.length - 1}
                  title="Move section down"
                  aria-label="Move custom section down"
                  className={iconButtonClass}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeSection(section.id)}
                  title="Remove section"
                  aria-label="Remove custom section"
                  className={iconButtonClass}
                >
                  ✕
                </button>
              </div>
            </div>

            <SectionEditor
              itemLabel="Entry"
              orderHint=""
              entries={section.entries || []}
              fields={CUSTOM_ENTRY_FIELDS}
              entryTitle={(entry) => String(entry.heading || "").trim()}
              createEntry={createCustomEntry}
              onChange={(entries) => updateSection(section.id, { entries })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
