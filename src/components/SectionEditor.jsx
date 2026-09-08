const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800";

const iconButtonClass =
  "h-7 w-7 rounded-md border border-gray-300 bg-white text-sm leading-none text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";

/**
 * Generic repeatable-entry editor used for repeatable resume sections.
 * Supports add / remove / reorder.
 *
 * Props:
 *  - itemLabel   : singular name, e.g. "Position"
 *  - entries     : array of entry objects (each with a unique `id`)
 *  - fields      : field config [{ name, label, type, placeholder, span }]
 *  - entryTitle  : fn(entry) -> short title shown in the entry header
 *  - createEntry : fn() -> new blank entry object
 *  - onChange    : fn(nextEntries) -> parent state update
 */
export default function SectionEditor({
  itemLabel,
  entries,
  fields,
  entryTitle,
  createEntry,
  onChange,
  orderHint = "most recent first",
}) {
  const updateEntry = (id, name, value) =>
    onChange(entries.map((e) => (e.id === id ? { ...e, [name]: value } : e)));

  const removeEntry = (id) => onChange(entries.filter((e) => e.id !== id));

  const moveEntry = (id, direction) => {
    const index = entries.findIndex((e) => e.id === id);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= entries.length) return;
    const next = [...entries];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onChange(next);
  };

  const spanClass = (field) => (field.span === 2 ? "sm:col-span-2" : "");

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-gray-600">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
          {orderHint ? ` — ${orderHint}` : ""}
        </span>
        <button
          type="button"
          onClick={() => onChange([...entries, createEntry()])}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          + Add {itemLabel}
        </button>
      </div>

      {entries.length === 0 && (
        <p className="mt-3 rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-4 text-center text-sm text-gray-500">
          No entries yet — click “Add {itemLabel}” to create one.
        </p>
      )}

      <div className="mt-3 space-y-4">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className="rounded-lg border border-gray-300 bg-gray-50 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-sm font-semibold text-gray-800">
                {index + 1}. {entryTitle(entry) || `New ${itemLabel.toLowerCase()}`}
              </span>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveEntry(entry.id, -1)}
                  disabled={index === 0}
                  title="Move up"
                  aria-label={`Move ${itemLabel.toLowerCase()} up`}
                  className={iconButtonClass}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveEntry(entry.id, 1)}
                  disabled={index === entries.length - 1}
                  title="Move down"
                  aria-label={`Move ${itemLabel.toLowerCase()} down`}
                  className={iconButtonClass}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  title="Remove"
                  aria-label={`Remove ${itemLabel.toLowerCase()}`}
                  className={iconButtonClass}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {fields.map((field) => {
                if (field.type === "checkbox") {
                  return (
                    <label
                      key={field.name}
                      className="flex items-center gap-2 sm:col-span-2"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(entry[field.name])}
                        onChange={(ev) =>
                          updateEntry(entry.id, field.name, ev.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 accent-gray-900"
                      />
                      <span className="text-sm text-gray-700">{field.label}</span>
                    </label>
                  );
                }

                const common = {
                  id: `${entry.id}-${field.name}`,
                  value: entry[field.name] || "",
                  onChange: (ev) =>
                    updateEntry(entry.id, field.name, ev.target.value),
                  placeholder: field.placeholder || "",
                  className: inputClass,
                };

                return (
                  <label key={field.name} className={`block ${spanClass(field)}`}>
                    <span className="mb-1 block text-sm font-medium text-gray-700">
                      {field.label}
                    </span>
                    {field.type === "textarea" ? (
                      <textarea rows={4} {...common} />
                    ) : (
                      <input type="text" {...common} />
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
