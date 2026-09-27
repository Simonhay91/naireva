import type { ConsultationFormState } from "@/components/consultation/types";
import { Field, inputClass } from "@/components/consultation/Field";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function StepGoals({
  data,
  onChange,
  procedures,
  dict
}: {
  data: ConsultationFormState;
  onChange: <K extends keyof ConsultationFormState>(key: K, value: ConsultationFormState[K]) => void;
  procedures: { slug: string; title: string }[];
  dict: Dictionary;
}) {
  const t = dict.consultationPage.step2;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Field label={t.procedure}>
        <select required className={inputClass} value={data.procedureSlug} onChange={(e) => onChange("procedureSlug", e.target.value)}>
          <option value="">{t.procedureNotSure}</option>
          {procedures.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t.travelDates}>
        <input
          className={inputClass}
          placeholder={t.travelDatesPlaceholder}
          value={data.preferredTravelDates}
          onChange={(e) => onChange("preferredTravelDates", e.target.value)}
        />
      </Field>
      <Field label={t.goals} full>
        <textarea
          required
          rows={4}
          className={`${inputClass} resize-none`}
          value={data.goals}
          onChange={(e) => onChange("goals", e.target.value)}
        />
      </Field>
      <Field label={t.previousProcedures} full>
        <textarea
          rows={3}
          className={`${inputClass} resize-none`}
          value={data.previousProcedures}
          onChange={(e) => onChange("previousProcedures", e.target.value)}
        />
      </Field>
      <Field label={t.budgetRange}>
        <select className={inputClass} value={data.budgetRange} onChange={(e) => onChange("budgetRange", e.target.value)}>
          <option value="">{t.budgetNotSay}</option>
          {t.budgetRanges.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}
