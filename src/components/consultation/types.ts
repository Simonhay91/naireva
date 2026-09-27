export interface ConsultationFormState {
  fullName: string;
  country: string;
  city: string;
  age: string;
  preferredContact: "EMAIL" | "PHONE" | "WHATSAPP" | "TELEGRAM";
  email: string;
  phone: string;
  whatsapp: string;
  telegram: string;

  procedureSlug: string;
  goals: string;
  previousProcedures: string;
  preferredTravelDates: string;
  budgetRange: string;
  notes: string;

  consentAccepted: boolean;
  honeypot: string;
}

export const initialConsultationState: ConsultationFormState = {
  fullName: "",
  country: "",
  city: "",
  age: "",
  preferredContact: "WHATSAPP",
  email: "",
  phone: "",
  whatsapp: "",
  telegram: "",

  procedureSlug: "",
  goals: "",
  previousProcedures: "",
  preferredTravelDates: "",
  budgetRange: "",
  notes: "",

  consentAccepted: false,
  honeypot: ""
};
