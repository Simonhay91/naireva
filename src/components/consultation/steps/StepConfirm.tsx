import type { ConsultationFormState } from "@/components/consultation/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function StepConfirm({
  data,
  onChange,
  procedureTitle,
  dict
}: {
  data: ConsultationFormState;
  onChange: <K extends keyof ConsultationFormState>(key: K, value: ConsultationFormState[K]) => void;
  procedureTitle: string;
  dict: Dictionary;
}) {
  const t = dict.consultationPage.step4;
  const contactLabel = dict.consultationPage.step1.contactOptions[data.preferredContact];

  const rows: [string, string][] = [
    [t.labels.name, data.fullName],
    [t.labels.country, [data.city, data.country].filter(Boolean).join(", ")],
    [t.labels.contact, `${contactLabel} · ${data.email}`],
    [t.labels.procedure, procedureTitle],
    [t.labels.goals, data.goals]
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-line bg-paper p-6">
        <p className="kicker">{t.reviewKicker}</p>
        <dl className="mt-3 divide-y divide-line text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[110px_1fr] gap-3 py-3">
              <dt className="text-muted">{label}</dt>
              <dd className="break-words">{value || "—"}</dd>
            </div>
          ))}
        </dl>
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          required
          checked={data.consentAccepted}
          onChange={(e) => onChange("consentAccepted", e.target.checked)}
          className="mt-1 h-4 w-4"
        />
        <span>{t.consent}</span>
      </label>

      {/* Bot honeypot — must stay empty; hidden from sighted users, not from screen readers via aria-hidden, but off-screen so it isn't tabbed to in practice by real users. */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={data.honeypot} onChange={(e) => onChange("honeypot", e.target.value)} />
        </label>
      </div>
    </div>
  );
}
