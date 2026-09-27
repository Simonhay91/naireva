export type Locale = "en" | "ru" | "es" | "ar";

export const locales: Locale[] = ["en", "ru", "es", "ar"];
export const defaultLocale: Locale = "en";

/** Locales that read right-to-left — drives `dir` on <html> and RTL-aware CSS. */
export const rtlLocales: Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

/**
 * All site chrome and static page copy (nav, forms, legal pages, etc.) is
 * fully authored in all four locales below. Long-form DB-driven content
 * (procedure detail, surgeon bio, journal articles, before/after case
 * notes) still only has English + Russian columns in prisma/schema.prisma
 * (`*Ru` fields) — Spanish/Arabic columns for that content are a separate,
 * larger step (schema migration + content authoring), not yet done.
 * `localized()` in ./localized.ts degrades missing Es/Ar DB content to
 * English rather than showing blank content.
 */
export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      procedures: "Procedures",
      surgeon: "Surgeon",
      transformations: "Transformations",
      journey: "Your Journey",
      armenia: "Armenia",
      concierge: "Concierge",
      journal: "Journal",
      consultation: "Private Consultation",
      faq: "FAQ"
    },
    footer: {
      tagline: "Private aesthetic journeys in Armenia.",
      explore: "Explore",
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
      rights: "All rights reserved."
    },
    home: {
      kicker: "Rhinoplasty & Aesthetic Surgery · Armenia",
      titleLine1: "Beauty.",
      titleLine2: "Privacy.",
      titleLine3: "Armenia.",
      subhead:
        "A discreet, highly personal path to aesthetic surgery in Yerevan — from first conversation to recovery and return home.",
      ctaPrimary: "Private Consultation",
      ctaSecondary: "Explore the Journey",
      trust: [
        "Selected surgical expertise",
        "Direct surgeon video consultation",
        "Personal coordinator",
        "Discreet communication"
      ],
      intro: {
        kicker: "NAIREVA",
        titleLine1: "Not a clinic directory.",
        titleLine2: "A private aesthetic concierge.",
        lead: "We prepare the case, connect you with selected surgical expertise, coordinate the medical journey and help make the stay in Armenia feel considered rather than clinical."
      },
      features: {
        procedures: { kicker: "PROCEDURES", title: "Rhinoplasty", body: "Our first focused aesthetic journey, with direct surgeon review and personalized planning." },
        transformations: { kicker: "TRANSFORMATIONS", title: "Real patient results", body: "Before-and-after cases shared by the surgical team, with patient consent." },
        surgeon: { kicker: "SURGEON", title: "Meet Dr. Hayk Bakhshyan", body: "Credentials, approach and direct pre-confirmation video consultation." },
        armenia: { kicker: "ARMENIA", title: "Beyond the clinic", body: "Yerevan, dining, wine, culture and optional private experiences around recovery." }
      },
      howItWorks: {
        kicker: "How it works",
        title: "Three clear stages.",
        lead: "Private request. Medical review and surgeon video call. Then a coordinated journey to Armenia.",
        steps: [
          { num: "01", title: "Share your case", body: "Tell us what you are considering and how you prefer to be contacted." },
          { num: "02", title: "Meet the surgeon", body: "Your case is reviewed and a video consultation is arranged before final confirmation." },
          { num: "03", title: "Come to Armenia", body: "We coordinate transfer, clinic logistics and your personal journey around the medical plan." }
        ]
      },
      concierge: {
        kicker: "Concierge",
        title: "Accompanied, not just booked.",
        lead: "The concierge layer exists so the medical journey never feels like logistics you manage alone.",
        items: [
          { title: "Airport & clinic transfer", body: "Coordinated arrival, clinic visits and departure — one point of contact throughout." },
          { title: "Personal coordination", body: "A dedicated coordinator follows your case from first review to your return home." },
          { title: "Medical logistics", body: "Appointments, admission and follow-up scheduled around the surgeon's plan." },
          { title: "Optional hotel & tourism", body: "Hotel choice stays yours; premium stays and private tours are optional, through partners, only when appropriate." }
        ],
        cta: "The concierge in detail"
      },
      journal: { kicker: "Journal", title: "Useful before you decide." },
      armeniaTeaser: {
        kicker: "Armenia",
        titleLine1: "Recover slowly.",
        titleLine2: "Experience beautifully.",
        lead: "A city stay with optional premium dining, wine and private cultural experiences — only where appropriate for your stage of recovery.",
        pills: ["Yerevan", "Private dining", "Wine", "Garni & Geghard"],
        cta: "Explore Armenia"
      },
      finalCta: {
        kicker: "Begin privately",
        title: "Start with a private conversation.",
        lead: "No public pricing, no automated medical promises — only a careful review and a direct conversation with the surgeon before anything is confirmed.",
        cta: "Private Consultation"
      },
      transformationsPreview: {
        kicker: "Real transformations",
        title: "See the work.",
        cta: "View all transformations",
        disclaimer: "Real patient case. Individual outcomes vary."
      },
      surgeonPreview: {
        kicker: "Direct consultation",
        title: "Meet before you decide.",
        leadTemplate:
          "Before final confirmation, NAIREVA arranges a video consultation so you can discuss your case, expectations and the proposed plan directly with {name}.",
        ctaTemplate: "Meet {name}"
      },
      whyChoose: {
        kicker: "Why patients choose NAIREVA",
        title: "Built around one case at a time.",
        lead: "No sales team, no automated promises — every decision here is made by the people actually reviewing your case.",
        items: [
          { title: "Selected surgical expertise", body: "Every case is reviewed personally by a surgeon chosen for aesthetic and reconstructive precision, not assigned by availability." },
          { title: "Direct surgeon video consultation", body: "Before any confirmation, you speak with the surgeon directly about your case, expectations and the proposed plan." },
          { title: "Personal coordinator", body: "One point of contact manages your case, travel and communication from first review through your return home." },
          { title: "Discreet, private process", body: "No public pricing, no public case sharing. Your case and photos are handled privately, with consent required for anything shared publicly." }
        ]
      }
    },
    common: {
      home: "Home",
      requestConsultation: "Request a private consultation",
      menu: "Menu",
      language: "Language"
    },
    compareSlider: {
      before: "BEFORE",
      after: "AFTER",
      ariaLabel: "Compare before and after"
    },
    categories: {
      RHINOPLASTY: "Rhinoplasty",
      RECOVERY: "Recovery",
      ARMENIA: "Armenia",
      CONSULTATION: "Consultation",
      TRAVEL: "Travel",
      AESTHETIC_SURGERY: "Aesthetic Surgery"
    },
    procedures: {
      breadcrumb: "Procedures",
      kicker: "Procedures",
      title: "Selected, not endless.",
      lead: "NAIREVA begins with focused aesthetic procedures where the medical journey can be carefully coordinated from first review to recovery.",
      comingLater: {
        kicker: "Coming later",
        title: "Additional procedures",
        body: "We will expand selectively with trusted surgeons and only after the patient journey is fully defined."
      }
    },
    procedureDetail: {
      titleLine1: "Designed around your face,",
      titleLine2: "not a template.",
      checklist: ["Private case review", "Surgeon video consultation", "Clinic coordination", "Airport / clinic transfer", "Post-op follow-up"],
      faqKicker: "Frequently asked",
      faqTitle: "Before you ask us directly."
    },
    surgeon: {
      breadcrumb: "Surgeon",
      kicker: "Selected surgical expertise",
      consultationKicker: "Direct consultation",
      consultationTitle: "Meet before you decide.",
      consultationLead: "Before final confirmation, NAIREVA arranges a video consultation so you can discuss your case, expectations and the proposed plan directly with the surgeon.",
      steps: [
        "Case reviewed before consultation",
        "Direct discussion of goals and limitations",
        "Final medical plan confirmed by the surgeon"
      ],
      biographyKicker: "Biography",
      approachKicker: "Approach",
      educationKicker: "Education",
      certificationsKicker: "Certifications",
      languagesKicker: "Languages",
      proceduresKicker: "Procedures",
      galleryKicker: "The clinic and team",
      teamPhotoAlt: "Dr. Bakhshyan with the surgical team",
      galleryCloseLabel: "Close",
      galleryPrevLabel: "Previous image",
      galleryNextLabel: "Next image"
    },
    transformations: {
      breadcrumb: "Transformations",
      kicker: "Real patient results",
      titleLine1: "See the work.",
      titleLine2: "Then ask the questions.",
      lead: "A small gallery of real patient cases, shared with patient consent. Identity is never disclosed.",
      disclaimer: "Real patient cases. Individual outcomes vary and depend on individual anatomy, healing and the surgeon's clinical judgment.",
      emptyState: "Published cases will appear here once the team adds them.",
      filterAll: "All",
      viewCase: "View case →"
    },
    transformationDetail: {
      breadcrumb: "Case",
      title: "One private case.",
      procedureLabel: "Procedure",
      surgeonLabel: "Surgeon",
      patientLabel: "Patient",
      ageWithheld: "Age range withheld",
      agePrefix: "Age",
      disclaimer: "Shared with patient consent. Identity is never disclosed. Individual outcomes vary."
    },
    journey: {
      breadcrumb: "Your Journey",
      kicker: "Your journey",
      title: "Clear before you travel.",
      lead: "The experience is organized around the medical plan, not the other way around.",
      steps: [
        { num: "01", title: "Private request", body: "Goals, contact details and case information." },
        { num: "02", title: "Medical review", body: "The surgical team reviews the case." },
        { num: "03", title: "Surgeon video consultation", body: "Direct discussion with the surgeon before anything is confirmed." },
        { num: "04", title: "Arrival", body: "Airport and clinic logistics coordinated." },
        { num: "05", title: "Surgery & recovery", body: "Personal support during your stay." },
        { num: "06", title: "Return home & follow-up", body: "Final check and follow-up as required by your surgeon." }
      ],
      cta: "Begin with a private request"
    },
    armeniaPage: {
      breadcrumb: "Armenia",
      kicker: "Armenia, beyond the clinic",
      titleLine1: "A medical journey",
      titleLine2: "with a sense of place.",
      lead: "Yerevan and Armenia are part of the experience — but recovery always comes first.",
      cards: [
        { num: "CITY", title: "Yerevan", body: "Cafés, dining, architecture and a compact city rhythm." },
        { num: "CULTURE", title: "History nearby", body: "Garni, Geghard and other routes through selected tourism partners." },
        { num: "OPTIONAL", title: "Premium experiences", body: "Private dining, wine and curated tours when the surgeon approves activity." }
      ]
    },
    concierge: {
      breadcrumb: "Concierge",
      kicker: "Concierge",
      title: "The journey, coordinated.",
      lead: "NAIREVA is the concierge layer around your medical plan — not a travel agency, and not a clinic booking desk.",
      services: [
        { title: "Airport & clinic transfer", body: "Arrival, clinic visits and departure are arranged around your medical schedule, not the other way around." },
        { title: "Personal coordinator", body: "One point of contact follows your case from first review through to your return home — no call centers, no hand-offs you don't know about." },
        { title: "Medical logistics", body: "Appointments, admission, discharge and the surgeon's follow-up plan are coordinated so nothing is left to chance." },
        { title: "Optional hotel support", body: "Your choice of stay remains yours. We can suggest options suited to recovery, but hotel is never bundled or assumed." },
        { title: "Optional private tourism", body: "Garni, Geghard, private dining and curated experiences — arranged only through selected tourism partners, and only when your surgeon confirms your recovery stage allows it." },
        { title: "Discreet communication", body: "Contact happens through the channel you prefer — WhatsApp, Telegram or email — with your privacy respected throughout." }
      ],
      footerKicker: "Medical decisions stay medical",
      footerTitle: "The surgeon and clinic decide what's medically appropriate. We handle everything around it.",
      footerCta: "Start a private consultation"
    },
    journalPage: {
      breadcrumb: "Journal",
      kicker: "Journal",
      title: "Useful before you decide.",
      lead: "Practical information about rhinoplasty, preparation, recovery and travelling to Armenia for aesthetic surgery.",
      emptyState: "Articles will appear here once published in the admin panel.",
      byAuthor: "By {name}",
      updated: "Updated {date}"
    },
    faqPage: {
      breadcrumb: "FAQ",
      kicker: "Frequently asked",
      title: "Before you ask us directly.",
      emptyState: "Questions will appear here once added in the admin panel."
    },
    privacyPage: {
      breadcrumb: "Privacy",
      kicker: "Privacy",
      title: "Private by design.",
      lead: "How NAIREVA collects, stores and uses the information you share with us.",
      noticeTitle: "About this page",
      notice:
        "This page explains, in plain terms, how the product is designed to handle your information. It is not a substitute for legal advice — contact us directly with any privacy questions.",
      sections: [
        { title: "What we collect", body: "Contact details you provide, the goals and history you share about your case when you submit a consultation request, and any photos you choose to upload for medical review. Uploaded photos and case notes are treated as sensitive health information." },
        { title: "How we use it", body: "Your information is used to review your case, arrange a video consultation with the surgeon, and coordinate the medical journey if you proceed. We do not use it for any other purpose without your consent." },
        { title: "How it is stored", body: "Case photos and notes are kept in private storage and are not publicly reachable. Access is limited to authenticated NAIREVA team accounts — your coordinator, the medical team and the reviewing surgeon." },
        { title: "Service providers", body: "We rely on third-party providers for services such as hosting, file storage and email delivery. They process information only to provide that service to us and are not permitted to use it for their own purposes." },
        { title: "Security", body: "We use reasonable technical measures, including private storage and authenticated access, to protect your information. No method of storing or transmitting information online is completely secure, and we cannot guarantee absolute security." },
        { title: "Retention", body: "We keep your information for as long as needed to respond to your request or coordinate your case, and for a reasonable period afterward for our own records, unless you ask us to delete it sooner." },
        { title: "Deletion and access requests", body: "You can ask us to access, correct or delete the information we hold about you at any time by contacting us. We will respond within a reasonable time." },
        { title: "Before-and-after images", body: "Published only where appropriate patient permission has been obtained, without names, contact details, or unnecessary personal information." },
        { title: "International visitors", body: "NAIREVA works with patients from many countries. Your information may be stored and processed in a country other than the one you are contacting us from." },
        { title: "Contact", body: "Questions about this policy or your information can be sent to team@naireva.com." }
      ]
    },
    termsPage: {
      breadcrumb: "Terms",
      kicker: "Terms",
      title: "Read before you rely on this.",
      lead: "The terms that apply when you use this website and request a consultation.",
      noticeTitle: "About these terms",
      sections: [
        { title: "Role of NAIREVA", body: "NAIREVA is a concierge and coordination service. NAIREVA does not perform surgery and does not employ the surgeon or operate the clinic. All medical decisions — candidacy, surgical plan, and care — belong solely to the treating surgeon and clinic." },
        { title: "No medical advice", body: "Nothing on this website, in any consultation request, or in any future AI-assisted intake constitutes medical advice, a diagnosis, or a guarantee of candidacy or outcome." },
        { title: "Treatment eligibility", body: "Whether any procedure is appropriate for you is determined solely by the medical team and surgeon after case review and a video consultation. Nothing on this website guarantees eligibility for any procedure." },
        { title: "Pricing", body: "NAIREVA does not publish pricing. Costs are discussed only after case review and consultation, and are set by the treating clinic." },
        { title: "Third-party providers", body: "Surgery, clinical care, accommodation, transport and other travel services are provided by independent third parties — clinics, surgeons, hotels and transport partners. NAIREVA coordinates these services but is not responsible for their independent acts or omissions." },
        { title: "Travel and accommodation", body: "Travel documents, visas, insurance and accommodation remain your responsibility unless otherwise agreed with your coordinator. We recommend appropriate travel insurance for any international medical trip." },
        { title: "Changes and cancellations", body: "Any change or cancellation of a planned procedure or trip is handled individually with your coordinator and is subject to the policies of the treating clinic and any third-party providers involved." },
        { title: "Website content", body: "Content on this website, including procedure and journal pages, is provided for general information only. We aim for it to be accurate but do not guarantee it is complete, current or error-free." },
        { title: "Contact", body: "Questions about these terms can be sent to team@naireva.com." }
      ]
    },
    consultationPage: {
      breadcrumb: "Private consultation",
      kicker: "Private consultation",
      title: "Start with a conversation.",
      lead: "Send the basics. We will contact you privately by WhatsApp, Telegram or email and prepare the case for the medical team.",
      formHeading: "Your request",
      formLead: "No public pricing and no automated medical promises. Final medical decisions are made by the surgeon after review and consultation.",
      steps: ["Contact", "Goals", "Photos", "Confirm"],
      back: "Back",
      continue: "Continue",
      submit: "Request a private consultation",
      submitting: "Sending…",
      successKicker: "Request received",
      successTitleTemplate: "Thank you, {name}.",
      successBodyTemplate: "Your case has been sent privately to our team. We will contact you by {channel} shortly to arrange next steps.",
      genericError: "Something went wrong. Please try again.",
      step1: {
        fullName: "Full name",
        country: "Country",
        city: "City (optional)",
        email: "Email",
        age: "Age (optional)",
        preferredContact: "Preferred contact method",
        phone: "Phone (optional)",
        whatsapp: "WhatsApp (optional)",
        telegram: "Telegram (optional)",
        contactOptions: { WHATSAPP: "WhatsApp", TELEGRAM: "Telegram", EMAIL: "Email", PHONE: "Phone call" },
        validationError: "Please complete your name, country and email.",
        emailError: "Please enter a valid email."
      },
      step2: {
        procedure: "Procedure",
        procedureNotSure: "Not sure yet",
        travelDates: "Preferred travel dates (optional)",
        travelDatesPlaceholder: "e.g. flexible, next 2–3 months",
        goals: "What would you like to change?",
        previousProcedures: "Previous surgeries or procedures (optional)",
        budgetRange: "Budget range (optional — for internal planning only)",
        budgetNotSay: "Prefer not to say",
        budgetRanges: ["Not sure yet", "Under $3,000", "$3,000–$6,000", "$6,000–$10,000", "$10,000+"],
        validationError: "Tell us a little more about what you'd like to change."
      },
      step3: {
        photosLabel: "Photos (optional, up to {max})",
        dropzone: "Click to select photos — frontal, profile and any angle you'd like the medical team to see.",
        privacyNote: "Photos are stored privately and are only ever visible to the NAIREVA medical team and reviewing surgeon.",
        notes: "Anything else you'd like us to know? (optional)",
        removePhoto: "Remove photo"
      },
      step4: {
        reviewKicker: "Review",
        labels: { name: "Name", country: "Country", contact: "Contact", procedure: "Procedure", goals: "Goals" },
        consent: "I consent to NAIREVA collecting and reviewing this information, including any photos, so my case can be assessed by the medical team and reviewing surgeon. I understand no medical decision is made until a surgeon review and video consultation take place.",
        consentError: "Please accept the consent statement to continue."
      }
    },
    seo: {
      siteTitle: "NAIREVA — Private Aesthetic Journeys in Armenia",
      siteDescription:
        "A private, concierge-led path to aesthetic surgery in Armenia — selected surgical expertise, direct surgeon video consultation and a fully coordinated journey.",
      home: {
        title: "Private Aesthetic Journeys in Armenia",
        description:
          "A private, concierge-led path to aesthetic surgery in Armenia — selected surgical expertise, direct surgeon video consultation and a fully coordinated journey."
      },
      procedures: { title: "Procedures", description: "Selected aesthetic procedures, coordinated from first review to recovery — beginning with rhinoplasty in Armenia." },
      journey: { title: "Your Journey", description: "How a private aesthetic journey with NAIREVA actually works, from first request to your return home." },
      armenia: { title: "Armenia", description: "Armenia is part of the experience, not just the treatment location — Yerevan, culture and optional private experiences around recovery." },
      concierge: { title: "Concierge", description: "How NAIREVA coordinates transfer, clinic logistics, personal contact and optional tourism around your medical plan." },
      journal: { title: "Journal", description: "Practical information about rhinoplasty, preparation, recovery and travelling to Armenia for aesthetic surgery." },
      consultation: { title: "Private Consultation", description: "Send the basics privately. We will contact you by WhatsApp, Telegram or email and prepare your case for the medical team." },
      faq: { title: "FAQ", description: "Answers to common questions about the NAIREVA process, privacy, pricing and travel." },
      transformations: { title: "Transformations", description: "Real patient before-and-after cases, shared with consent. Individual outcomes vary." }
    },
    // Only "en"'s localeBanner is actually read (the suggestion banner only
    // ever fires from the default English page — see LocaleSuggestionBanner
    // and spec §16 on never auto-switching locale without user action).
    // ru/es/ar keep the same English copy here purely so every locale's
    // Dictionary satisfies the same type; it is never rendered.
    localeBanner: {
      ru: { question: "Show this site in Russian?", accept: "Show in Russian", dismiss: "Stay in English" },
      es: { question: "Show this site in Spanish?", accept: "Show in Spanish", dismiss: "Stay in English" },
      ar: { question: "Show this site in Arabic?", accept: "Show in Arabic", dismiss: "Stay in English" }
    }
  },
  ru: {
    nav: {
      procedures: "Процедуры",
      surgeon: "Хирург",
      transformations: "Результаты",
      journey: "Ваш путь",
      armenia: "Армения",
      concierge: "Консьерж",
      journal: "Журнал",
      consultation: "Частная консультация",
      faq: "Вопросы"
    },
    footer: {
      tagline: "Частные эстетические путешествия в Армению.",
      explore: "Разделы",
      contact: "Контакты",
      legal: "Документы",
      privacy: "Конфиденциальность",
      terms: "Условия",
      rights: "Все права защищены."
    },
    home: {
      kicker: "Ринопластика и эстетическая хирургия · Армения",
      titleLine1: "Красота.",
      titleLine2: "Приватность.",
      titleLine3: "Армения.",
      subhead:
        "Деликатный и личный путь к эстетической хирургии в Ереване — от первого разговора до восстановления и возвращения домой.",
      ctaPrimary: "Частная консультация",
      ctaSecondary: "Узнать о вашем пути",
      trust: [
        "Отобранное хирургическое мастерство",
        "Видеоконсультация напрямую с хирургом",
        "Личный координатор",
        "Деликатная коммуникация"
      ],
      intro: {
        kicker: "NAIREVA",
        titleLine1: "Не каталог клиник.",
        titleLine2: "Частный эстетический консьерж.",
        lead: "Мы готовим случай, связываем вас с отобранным хирургическим мастерством, координируем медицинское путешествие и делаем пребывание в Армении продуманным, а не клиническим."
      },
      features: {
        procedures: { kicker: "ПРОЦЕДУРЫ", title: "Ринопластика", body: "Наше первое направление — с прямым рассмотрением случая хирургом и персональным планированием." },
        transformations: { kicker: "РЕЗУЛЬТАТЫ", title: "Реальные результаты пациентов", body: "Случаи «до и после», предоставленные хирургической командой с согласия пациентов." },
        surgeon: { kicker: "ХИРУРГ", title: "Знакомство с д-ром Айком Бахшяном", body: "Квалификация, подход и видеоконсультация перед подтверждением." },
        armenia: { kicker: "АРМЕНИЯ", title: "Не только клиника", body: "Ереван, гастрономия, вино, культура и частные впечатления в период восстановления." }
      },
      howItWorks: {
        kicker: "Как это работает",
        title: "Три понятных этапа.",
        lead: "Частный запрос. Медицинская проверка и видеозвонок с хирургом. Затем — организованное путешествие в Армению.",
        steps: [
          { num: "01", title: "Расскажите о своём случае", body: "Сообщите, что вас интересует и как с вами удобнее связаться." },
          { num: "02", title: "Знакомство с хирургом", body: "Случай рассматривается, и перед окончательным подтверждением назначается видеоконсультация." },
          { num: "03", title: "Приезд в Армению", body: "Мы организуем трансфер, логистику клиники и ваше личное путешествие вокруг медицинского плана." }
        ]
      },
      concierge: {
        kicker: "Консьерж",
        title: "Не просто бронирование.",
        lead: "Консьерж-сопровождение существует, чтобы медицинское путешествие никогда не ощущалось как логистика, которой вы занимаетесь в одиночку.",
        items: [
          { title: "Трансфер в аэропорт и клинику", body: "Организованный приезд, визиты в клинику и отъезд — один контакт на всём пути." },
          { title: "Личный координатор", body: "Выделенный координатор сопровождает ваш случай от первого рассмотрения до возвращения домой." },
          { title: "Медицинская логистика", body: "Приёмы, госпитализация и наблюдение планируются по плану хирурга." },
          { title: "Отель и туризм — по желанию", body: "Выбор отеля остаётся за вами; премиальное проживание и частные туры возможны через партнёров, только когда это уместно." }
        ],
        cta: "Подробнее о консьерже"
      },
      journal: { kicker: "Журнал", title: "Полезно перед решением." },
      armeniaTeaser: {
        kicker: "Армения",
        titleLine1: "Восстанавливайтесь неспеша.",
        titleLine2: "Открывайте красоту вокруг.",
        lead: "Пребывание в городе с возможностью премиального ужина, вина и частных культурных впечатлений — только когда это уместно для вашего этапа восстановления.",
        pills: ["Ереван", "Частные ужины", "Вино", "Гарни и Гегард"],
        cta: "Узнать об Армении"
      },
      finalCta: {
        kicker: "Начните приватно",
        title: "Начните с частного разговора.",
        lead: "Никаких публичных цен и автоматических медицинских обещаний — только внимательное рассмотрение и прямой разговор с хирургом до какого-либо подтверждения.",
        cta: "Частная консультация"
      },
      transformationsPreview: {
        kicker: "Реальные результаты",
        title: "Посмотрите на работу.",
        cta: "Смотреть все результаты",
        disclaimer: "Реальный случай пациента. Индивидуальные результаты могут отличаться."
      },
      surgeonPreview: {
        kicker: "Прямая консультация",
        title: "Знакомство перед решением.",
        leadTemplate:
          "Перед окончательным подтверждением NAIREVA организует видеоконсультацию, чтобы вы могли обсудить свой случай, ожидания и предложенный план напрямую с хирургом — {name}.",
        ctaTemplate: "Познакомиться с хирургом {name}"
      },
      whyChoose: {
        kicker: "Почему пациенты выбирают NAIREVA",
        title: "Каждый случай рассматривается индивидуально.",
        lead: "Без отдела продаж и автоматических обещаний — каждое решение принимают те, кто действительно рассматривает ваш случай.",
        items: [
          { title: "Отобранное хирургическое мастерство", body: "Каждый случай лично рассматривает хирург, выбранный за эстетическую и реконструктивную точность, а не по принципу доступности." },
          { title: "Прямая видеоконсультация с хирургом", body: "Перед любым подтверждением вы напрямую обсуждаете свой случай, ожидания и предложенный план с хирургом." },
          { title: "Личный координатор", body: "Один контакт сопровождает ваш случай, поездку и общение — от первого рассмотрения до возвращения домой." },
          { title: "Приватный, конфиденциальный процесс", body: "Без публичных цен и публичного размещения случаев. Ваш случай и фотографии обрабатываются конфиденциально, с согласием на любую публикацию." }
        ]
      }
    },
    common: {
      home: "Главная",
      requestConsultation: "Запросить частную консультацию",
      menu: "Меню",
      language: "Язык"
    },
    compareSlider: {
      before: "ДО",
      after: "ПОСЛЕ",
      ariaLabel: "Сравнить до и после"
    },
    categories: {
      RHINOPLASTY: "Ринопластика",
      RECOVERY: "Восстановление",
      ARMENIA: "Армения",
      CONSULTATION: "Консультация",
      TRAVEL: "Путешествие",
      AESTHETIC_SURGERY: "Эстетическая хирургия"
    },
    procedures: {
      breadcrumb: "Процедуры",
      kicker: "Процедуры",
      title: "Отобранные, а не бесконечные.",
      lead: "NAIREVA начинает с точечных эстетических процедур, где медицинское путешествие можно тщательно координировать от первого рассмотрения до восстановления.",
      comingLater: {
        kicker: "Скоро",
        title: "Дополнительные процедуры",
        body: "Мы будем расширяться выборочно, работая с проверенными хирургами, и только после того, как путь пациента будет полностью определён."
      }
    },
    procedureDetail: {
      titleLine1: "Разработано под ваше лицо,",
      titleLine2: "а не по шаблону.",
      checklist: ["Частное рассмотрение случая", "Видеоконсультация с хирургом", "Координация клиники", "Трансфер аэропорт / клиника", "Наблюдение после операции"],
      faqKicker: "Частые вопросы",
      faqTitle: "Прежде чем спросить нас напрямую."
    },
    surgeon: {
      breadcrumb: "Хирург",
      kicker: "Отобранное хирургическое мастерство",
      consultationKicker: "Прямая консультация",
      consultationTitle: "Знакомство перед решением.",
      consultationLead: "Перед окончательным подтверждением NAIREVA организует видеоконсультацию, чтобы вы могли обсудить свой случай, ожидания и предложенный план напрямую с хирургом.",
      steps: [
        "Случай рассмотрен перед консультацией",
        "Прямое обсуждение целей и ограничений",
        "Финальный медицинский план подтверждён хирургом"
      ],
      biographyKicker: "Биография",
      approachKicker: "Подход",
      educationKicker: "Образование",
      certificationsKicker: "Сертификаты",
      languagesKicker: "Языки",
      proceduresKicker: "Процедуры",
      galleryKicker: "Клиника и команда",
      teamPhotoAlt: "Д-р Бахшян с хирургической командой",
      galleryCloseLabel: "Закрыть",
      galleryPrevLabel: "Предыдущее фото",
      galleryNextLabel: "Следующее фото"
    },
    transformations: {
      breadcrumb: "Результаты",
      kicker: "Реальные результаты пациентов",
      titleLine1: "Посмотрите на работу.",
      titleLine2: "Затем задайте вопросы.",
      lead: "Небольшая галерея реальных случаев пациентов, опубликованных с их согласия. Личность пациента никогда не раскрывается.",
      disclaimer: "Реальные случаи пациентов. Индивидуальные результаты могут отличаться и зависят от анатомии, заживления и клинического решения хирурга.",
      emptyState: "Опубликованные случаи появятся здесь после добавления командой.",
      filterAll: "Все",
      viewCase: "Смотреть случай →"
    },
    transformationDetail: {
      breadcrumb: "Случай",
      title: "Один частный случай.",
      procedureLabel: "Процедура",
      surgeonLabel: "Хирург",
      patientLabel: "Пациент",
      ageWithheld: "Возрастной диапазон скрыт",
      agePrefix: "Возраст",
      disclaimer: "Опубликовано с согласия пациента. Личность никогда не раскрывается. Индивидуальные результаты могут отличаться."
    },
    journey: {
      breadcrumb: "Ваш путь",
      kicker: "Ваш путь",
      title: "Ясно перед поездкой.",
      lead: "Опыт организован вокруг медицинского плана, а не наоборот.",
      steps: [
        { num: "01", title: "Частный запрос", body: "Цели, контактные данные и информация о случае." },
        { num: "02", title: "Медицинская проверка", body: "Хирургическая команда рассматривает случай." },
        { num: "03", title: "Видеоконсультация с хирургом", body: "Прямое обсуждение с хирургом до какого-либо подтверждения." },
        { num: "04", title: "Прибытие", body: "Организована логистика аэропорта и клиники." },
        { num: "05", title: "Операция и восстановление", body: "Личная поддержка на протяжении пребывания." },
        { num: "06", title: "Возвращение домой и наблюдение", body: "Финальный осмотр и наблюдение по указанию хирурга." }
      ],
      cta: "Начать с частного запроса"
    },
    armeniaPage: {
      breadcrumb: "Армения",
      kicker: "Армения, не только клиника",
      titleLine1: "Медицинское путешествие",
      titleLine2: "с ощущением места.",
      lead: "Ереван и Армения — часть впечатления, но восстановление всегда на первом месте.",
      cards: [
        { num: "ГОРОД", title: "Ереван", body: "Кафе, гастрономия, архитектура и компактный ритм города." },
        { num: "КУЛЬТУРА", title: "История рядом", body: "Гарни, Гегард и другие маршруты через отобранных туристических партнёров." },
        { num: "ПО ЖЕЛАНИЮ", title: "Премиальные впечатления", body: "Частные ужины, вино и подобранные туры, когда хирург одобряет активность." }
      ]
    },
    concierge: {
      breadcrumb: "Консьерж",
      kicker: "Консьерж",
      title: "Путешествие, скоординированное.",
      lead: "NAIREVA — это консьерж-слой вокруг вашего медицинского плана, а не турагентство и не стойка бронирования клиники.",
      services: [
        { title: "Трансфер в аэропорт и клинику", body: "Приезд, визиты в клинику и отъезд организуются вокруг вашего медицинского расписания, а не наоборот." },
        { title: "Личный координатор", body: "Один контакт сопровождает ваш случай от первого рассмотрения до возвращения домой — без колл-центров и незаметных передач между людьми." },
        { title: "Медицинская логистика", body: "Приёмы, госпитализация, выписка и план наблюдения хирурга координируются так, чтобы ничего не оставалось на волю случая." },
        { title: "Отель — по желанию", body: "Выбор проживания остаётся за вами. Мы можем предложить варианты, подходящие для восстановления, но отель никогда не включается по умолчанию." },
        { title: "Частный туризм — по желанию", body: "Гарни, Гегард, частные ужины и подобранные впечатления — организуются только через отобранных туристических партнёров и только когда хирург подтверждает, что этап восстановления это позволяет." },
        { title: "Деликатная коммуникация", body: "Контакт происходит через удобный вам канал — WhatsApp, Telegram или email — с уважением к вашей приватности на всех этапах." }
      ],
      footerKicker: "Медицинские решения остаются медицинскими",
      footerTitle: "Хирург и клиника решают, что медицински уместно. Мы занимаемся всем остальным.",
      footerCta: "Начать частную консультацию"
    },
    journalPage: {
      breadcrumb: "Журнал",
      kicker: "Журнал",
      title: "Полезно перед решением.",
      lead: "Практическая информация о ринопластике, подготовке, восстановлении и поездке в Армению для эстетической хирургии.",
      emptyState: "Статьи появятся здесь после публикации в админ-панели.",
      byAuthor: "Автор: {name}",
      updated: "Обновлено {date}"
    },
    faqPage: {
      breadcrumb: "Вопросы",
      kicker: "Частые вопросы",
      title: "Прежде чем спросить нас напрямую.",
      emptyState: "Вопросы появятся здесь после добавления в админ-панели."
    },
    privacyPage: {
      breadcrumb: "Конфиденциальность",
      kicker: "Конфиденциальность",
      title: "Приватность по умолчанию.",
      lead: "Как NAIREVA собирает, хранит и использует информацию, которой вы с нами делитесь.",
      noticeTitle: "Об этой странице",
      notice:
        "Эта страница простыми словами объясняет, как продукт спроектирован для работы с вашей информацией. Она не заменяет юридическую консультацию — по любым вопросам о конфиденциальности свяжитесь с нами напрямую.",
      sections: [
        { title: "Что мы собираем", body: "Контактные данные, которые вы указываете, цели и анамнез, которыми вы делитесь при подаче заявки на консультацию, и любые фотографии, которые вы решите загрузить для медицинского рассмотрения. Загруженные фотографии и заметки по случаю считаются чувствительной медицинской информацией." },
        { title: "Как мы используем информацию", body: "Ваша информация используется для рассмотрения случая, организации видеоконсультации с хирургом и координации медицинского путешествия, если вы решите продолжить. Мы не используем её для иных целей без вашего согласия." },
        { title: "Как это хранится", body: "Фотографии и заметки по случаю хранятся в приватном хранилище и не доступны публично. Доступ есть только у аутентифицированных учётных записей команды NAIREVA — вашего координатора, медицинской команды и рассматривающего хирурга." },
        { title: "Поставщики услуг", body: "Мы используем сторонних поставщиков для таких услуг, как хостинг, хранение файлов и доставка email. Они обрабатывают информацию только для оказания этой услуги нам и не имеют права использовать её в своих целях." },
        { title: "Безопасность", body: "Мы применяем разумные технические меры, включая приватное хранение и аутентифицированный доступ, для защиты вашей информации. Ни один способ хранения или передачи данных онлайн не является абсолютно безопасным, и мы не можем гарантировать полную безопасность." },
        { title: "Хранение данных", body: "Мы храним вашу информацию столько, сколько нужно для ответа на ваш запрос или координации случая, и разумный период после этого для собственного учёта, если вы не попросите удалить её раньше." },
        { title: "Удаление и запросы доступа", body: "Вы можете в любой момент запросить доступ, исправление или удаление информации, которую мы храним о вас, связавшись с нами. Мы ответим в разумный срок." },
        { title: "Фотографии «до и после»", body: "Публикуются только при наличии соответствующего разрешения пациента, без имён, контактных данных и без ненужной личной информации." },
        { title: "Международные пациенты", body: "NAIREVA работает с пациентами из многих стран. Ваша информация может храниться и обрабатываться в стране, отличной от той, из которой вы к нам обращаетесь." },
        { title: "Контакты", body: "Вопросы об этой политике или вашей информации можно направить на team@naireva.com." }
      ]
    },
    termsPage: {
      breadcrumb: "Условия",
      kicker: "Условия",
      title: "Прочитайте, прежде чем полагаться на это.",
      lead: "Условия, которые действуют при использовании этого сайта и подаче заявки на консультацию.",
      noticeTitle: "Об этих условиях",
      sections: [
        { title: "Роль NAIREVA", body: "NAIREVA — это консьерж-сервис и координация. NAIREVA не проводит операции и не является работодателем хирурга или оператором клиники. Все медицинские решения — пригодность, хирургический план и уход — принадлежат исключительно лечащему хирургу и клинике." },
        { title: "Не медицинская консультация", body: "Ничто на этом сайте, в заявке на консультацию или в любом будущем ИИ-опросе не является медицинской консультацией, диагнозом или гарантией пригодности либо результата." },
        { title: "Пригодность к лечению", body: "Подходит ли вам та или иная процедура, определяют только медицинская команда и хирург после рассмотрения случая и видеоконсультации. Ничто на этом сайте не гарантирует пригодность к какой-либо процедуре." },
        { title: "Цены", body: "NAIREVA не публикует цены. Стоимость обсуждается только после рассмотрения случая и консультации и устанавливается лечащей клиникой." },
        { title: "Сторонние поставщики услуг", body: "Хирургическую помощь, проживание, транспорт и другие услуги, связанные с поездкой, предоставляют независимые третьи стороны — клиники, хирурги, отели и транспортные партнёры. NAIREVA координирует эти услуги, но не отвечает за самостоятельные действия или упущения этих сторон." },
        { title: "Поездка и проживание", body: "Проездные документы, визы, страхование и проживание остаются на вашей ответственности, если иное не согласовано с вашим координатором. Мы рекомендуем оформить соответствующую туристическую страховку для любой международной медицинской поездки." },
        { title: "Изменения и отмена", body: "Любое изменение или отмена запланированной процедуры или поездки рассматривается индивидуально с вашим координатором и зависит от политики лечащей клиники и вовлечённых сторонних партнёров." },
        { title: "Содержание сайта", body: "Содержание этого сайта, включая страницы процедур и журнала, предоставляется только в общих информационных целях. Мы стремимся к его точности, но не гарантируем полноту, актуальность или отсутствие ошибок." },
        { title: "Контакты", body: "Вопросы об этих условиях можно направить на team@naireva.com." }
      ]
    },
    consultationPage: {
      breadcrumb: "Частная консультация",
      kicker: "Частная консультация",
      title: "Начните с разговора.",
      lead: "Отправьте основную информацию. Мы свяжемся с вами лично через WhatsApp, Telegram или email и подготовим случай для медицинской команды.",
      formHeading: "Ваш запрос",
      formLead: "Никаких публичных цен и автоматических медицинских обещаний. Окончательные медицинские решения принимает хирург после рассмотрения и консультации.",
      steps: ["Контакты", "Цели", "Фото", "Подтверждение"],
      back: "Назад",
      continue: "Продолжить",
      submit: "Запросить частную консультацию",
      submitting: "Отправка…",
      successKicker: "Заявка получена",
      successTitleTemplate: "Спасибо, {name}.",
      successBodyTemplate: "Ваш случай был отправлен нашей команде лично. Мы свяжемся с вами через {channel} в ближайшее время, чтобы обсудить дальнейшие шаги.",
      genericError: "Что-то пошло не так. Пожалуйста, попробуйте снова.",
      step1: {
        fullName: "Полное имя",
        country: "Страна",
        city: "Город (необязательно)",
        email: "Email",
        age: "Возраст (необязательно)",
        preferredContact: "Предпочитаемый способ связи",
        phone: "Телефон (необязательно)",
        whatsapp: "WhatsApp (необязательно)",
        telegram: "Telegram (необязательно)",
        contactOptions: { WHATSAPP: "WhatsApp", TELEGRAM: "Telegram", EMAIL: "Email", PHONE: "Телефонный звонок" },
        validationError: "Пожалуйста, заполните имя, страну и email.",
        emailError: "Пожалуйста, введите корректный email."
      },
      step2: {
        procedure: "Процедура",
        procedureNotSure: "Пока не уверен(а)",
        travelDates: "Предпочитаемые даты поездки (необязательно)",
        travelDatesPlaceholder: "например, гибко, в ближайшие 2–3 месяца",
        goals: "Что бы вы хотели изменить?",
        previousProcedures: "Предыдущие операции или процедуры (необязательно)",
        budgetRange: "Бюджет (необязательно — только для внутреннего планирования)",
        budgetNotSay: "Предпочитаю не указывать",
        budgetRanges: ["Пока не уверен(а)", "До $3 000", "$3 000–$6 000", "$6 000–$10 000", "$10 000+"],
        validationError: "Расскажите немного подробнее, что бы вы хотели изменить."
      },
      step3: {
        photosLabel: "Фотографии (необязательно, до {max})",
        dropzone: "Нажмите, чтобы выбрать фотографии — анфас, профиль и любой ракурс, который вы хотели бы показать медицинской команде.",
        privacyNote: "Фотографии хранятся конфиденциально и доступны только медицинской команде NAIREVA и рассматривающему хирургу.",
        notes: "Что-нибудь ещё, что нам стоит знать? (необязательно)",
        removePhoto: "Удалить фото"
      },
      step4: {
        reviewKicker: "Проверка",
        labels: { name: "Имя", country: "Страна", contact: "Контакт", procedure: "Процедура", goals: "Цели" },
        consent: "Я согласен(на) на то, чтобы NAIREVA собирала и рассматривала эту информацию, включая любые фотографии, чтобы мой случай мог быть оценён медицинской командой и рассматривающим хирургом. Я понимаю, что ни одно медицинское решение не принимается до рассмотрения хирургом и видеоконсультации.",
        consentError: "Пожалуйста, примите согласие, чтобы продолжить."
      }
    },
    seo: {
      siteTitle: "NAIREVA — Частные эстетические путешествия в Армению",
      siteDescription:
        "Частный путь к эстетической хирургии в Армении в сопровождении консьержа — отобранная хирургическая экспертиза, прямая видеоконсультация с хирургом и полностью скоординированное путешествие.",
      home: {
        title: "Частные эстетические путешествия в Армению",
        description:
          "Частный путь к эстетической хирургии в Армении в сопровождении консьержа — отобранная хирургическая экспертиза, прямая видеоконсультация с хирургом и полностью скоординированное путешествие."
      },
      procedures: { title: "Процедуры", description: "Отобранные эстетические процедуры, скоординированные от первого рассмотрения до восстановления — начиная с ринопластики в Армении." },
      journey: { title: "Ваше путешествие", description: "Как на самом деле работает частное эстетическое путешествие с NAIREVA — от первого запроса до возвращения домой." },
      armenia: { title: "Армения", description: "Армения — часть опыта, а не просто место лечения — Ереван, культура и опциональные частные впечатления вокруг восстановления." },
      concierge: { title: "Консьерж", description: "Как NAIREVA координирует трансфер, логистику клиники, личный контакт и опциональный туризм вокруг вашего медицинского плана." },
      journal: { title: "Журнал", description: "Практическая информация о ринопластике, подготовке, восстановлении и поездке в Армению для эстетической хирургии." },
      consultation: { title: "Частная консультация", description: "Отправьте основную информацию лично. Мы свяжемся с вами через WhatsApp, Telegram или email и подготовим ваш случай для медицинской команды." },
      faq: { title: "Вопросы и ответы", description: "Ответы на частые вопросы о процессе NAIREVA, конфиденциальности, ценах и поездке." },
      transformations: { title: "Результаты", description: "Реальные случаи пациентов «до и после», опубликованные с их согласия. Индивидуальные результаты могут отличаться." }
    },
    localeBanner: {
      ru: { question: "Show this site in Russian?", accept: "Show in Russian", dismiss: "Stay in English" },
      es: { question: "Show this site in Spanish?", accept: "Show in Spanish", dismiss: "Stay in English" },
      ar: { question: "Show this site in Arabic?", accept: "Show in Arabic", dismiss: "Stay in English" }
    }
  },
  es: {
    nav: {
      procedures: "Procedimientos",
      surgeon: "Cirujano",
      transformations: "Transformaciones",
      journey: "Su viaje",
      armenia: "Armenia",
      concierge: "Concierge",
      journal: "Revista",
      consultation: "Consulta privada",
      faq: "Preguntas"
    },
    footer: {
      tagline: "Viajes estéticos privados en Armenia.",
      explore: "Explorar",
      contact: "Contacto",
      legal: "Legal",
      privacy: "Privacidad",
      terms: "Términos",
      rights: "Todos los derechos reservados."
    },
    home: {
      kicker: "Rinoplastia y cirugía estética · Armenia",
      titleLine1: "Belleza.",
      titleLine2: "Privacidad.",
      titleLine3: "Armenia.",
      subhead:
        "Un camino discreto y muy personal hacia la cirugía estética en Ereván — desde la primera conversación hasta la recuperación y el regreso a casa.",
      ctaPrimary: "Consulta privada",
      ctaSecondary: "Conocer su viaje",
      trust: [
        "Experiencia quirúrgica seleccionada",
        "Videoconsulta directa con el cirujano",
        "Coordinador personal",
        "Comunicación discreta"
      ],
      intro: {
        kicker: "NAIREVA",
        titleLine1: "No es un directorio de clínicas.",
        titleLine2: "Un concierge estético privado.",
        lead: "Preparamos el caso, lo conectamos con experiencia quirúrgica seleccionada, coordinamos el viaje médico y ayudamos a que la estancia en Armenia se sienta cuidada, no clínica."
      },
      features: {
        procedures: { kicker: "PROCEDIMIENTOS", title: "Rinoplastia", body: "Nuestro primer viaje estético enfocado, con revisión directa del cirujano y planificación personalizada." },
        transformations: { kicker: "TRANSFORMACIONES", title: "Resultados reales de pacientes", body: "Casos de antes y después compartidos por el equipo quirúrgico, con el consentimiento del paciente." },
        surgeon: { kicker: "CIRUJANO", title: "Conozca al Dr. Hayk Bakhshyan", body: "Credenciales, enfoque y videoconsulta directa antes de la confirmación." },
        armenia: { kicker: "ARMENIA", title: "Más allá de la clínica", body: "Ereván, gastronomía, vino, cultura y experiencias privadas opcionales durante la recuperación." }
      },
      howItWorks: {
        kicker: "Cómo funciona",
        title: "Tres etapas claras.",
        lead: "Solicitud privada. Revisión médica y videollamada con el cirujano. Luego, un viaje coordinado a Armenia.",
        steps: [
          { num: "01", title: "Comparta su caso", body: "Cuéntenos qué está considerando y cómo prefiere que lo contactemos." },
          { num: "02", title: "Conozca al cirujano", body: "Su caso se revisa y se organiza una videoconsulta antes de la confirmación final." },
          { num: "03", title: "Venga a Armenia", body: "Coordinamos el traslado, la logística de la clínica y su experiencia personal alrededor del plan médico." }
        ]
      },
      concierge: {
        kicker: "Concierge",
        title: "Acompañado, no solo reservado.",
        lead: "La capa de concierge existe para que el viaje médico nunca se sienta como una logística que usted gestiona solo.",
        items: [
          { title: "Traslado al aeropuerto y a la clínica", body: "Llegada coordinada, visitas a la clínica y salida — un único punto de contacto en todo momento." },
          { title: "Coordinación personal", body: "Un coordinador dedicado sigue su caso desde la primera revisión hasta su regreso a casa." },
          { title: "Logística médica", body: "Citas, ingreso y seguimiento programados según el plan del cirujano." },
          { title: "Hotel y turismo opcionales", body: "La elección de hotel sigue siendo suya; las estancias premium y los tours privados son opcionales, a través de socios, solo cuando es apropiado." }
        ],
        cta: "El concierge en detalle"
      },
      journal: { kicker: "Revista", title: "Útil antes de decidir." },
      armeniaTeaser: {
        kicker: "Armenia",
        titleLine1: "Recupérese con calma.",
        titleLine2: "Descubra la belleza alrededor.",
        lead: "Una estancia en la ciudad con cena premium opcional, vino y experiencias culturales privadas — solo cuando sea apropiado para su etapa de recuperación.",
        pills: ["Ereván", "Cenas privadas", "Vino", "Garni y Geghard"],
        cta: "Explorar Armenia"
      },
      finalCta: {
        kicker: "Comience en privado",
        title: "Empiece con una conversación privada.",
        lead: "Sin precios públicos, sin promesas médicas automatizadas — solo una revisión cuidadosa y una conversación directa con el cirujano antes de confirmar nada.",
        cta: "Consulta privada"
      },
      transformationsPreview: {
        kicker: "Transformaciones reales",
        title: "Vea el trabajo.",
        cta: "Ver todas las transformaciones",
        disclaimer: "Caso real de paciente. Los resultados individuales varían."
      },
      surgeonPreview: {
        kicker: "Consulta directa",
        title: "Conózcanse antes de decidir.",
        leadTemplate:
          "Antes de la confirmación final, NAIREVA organiza una videoconsulta para que pueda hablar de su caso, sus expectativas y el plan propuesto directamente con {name}.",
        ctaTemplate: "Conocer a {name}"
      },
      whyChoose: {
        kicker: "Por qué los pacientes eligen NAIREVA",
        title: "Cada caso se atiende de forma individual.",
        lead: "Sin equipo de ventas ni promesas automatizadas: cada decisión la toman quienes realmente revisan su caso.",
        items: [
          { title: "Experiencia quirúrgica seleccionada", body: "Cada caso es revisado personalmente por un cirujano elegido por su precisión estética y reconstructiva, no asignado por disponibilidad." },
          { title: "Videoconsulta directa con el cirujano", body: "Antes de cualquier confirmación, usted habla directamente con el cirujano sobre su caso, expectativas y el plan propuesto." },
          { title: "Coordinador personal", body: "Un único punto de contacto gestiona su caso, viaje y comunicación desde la primera revisión hasta su regreso a casa." },
          { title: "Proceso discreto y privado", body: "Sin precios públicos ni difusión pública de casos. Su caso y sus fotos se gestionan de forma privada, con consentimiento para cualquier publicación." }
        ]
      }
    },
    common: {
      home: "Inicio",
      requestConsultation: "Solicitar una consulta privada",
      menu: "Menú",
      language: "Idioma"
    },
    compareSlider: {
      before: "ANTES",
      after: "DESPUÉS",
      ariaLabel: "Comparar antes y después"
    },
    categories: {
      RHINOPLASTY: "Rinoplastia",
      RECOVERY: "Recuperación",
      ARMENIA: "Armenia",
      CONSULTATION: "Consulta",
      TRAVEL: "Viaje",
      AESTHETIC_SURGERY: "Cirugía estética"
    },
    procedures: {
      breadcrumb: "Procedimientos",
      kicker: "Procedimientos",
      title: "Selectos, no interminables.",
      lead: "NAIREVA comienza con procedimientos estéticos específicos donde el viaje médico puede coordinarse cuidadosamente desde la primera revisión hasta la recuperación.",
      comingLater: {
        kicker: "Próximamente",
        title: "Procedimientos adicionales",
        body: "Nos expandiremos de forma selectiva con cirujanos de confianza, y solo después de que el proceso del paciente esté completamente definido."
      }
    },
    procedureDetail: {
      titleLine1: "Diseñado para su rostro,",
      titleLine2: "no una plantilla.",
      checklist: ["Revisión privada del caso", "Videoconsulta con el cirujano", "Coordinación con la clínica", "Traslado aeropuerto / clínica", "Seguimiento posoperatorio"],
      faqKicker: "Preguntas frecuentes",
      faqTitle: "Antes de preguntarnos directamente."
    },
    surgeon: {
      breadcrumb: "Cirujano",
      kicker: "Experiencia quirúrgica seleccionada",
      consultationKicker: "Consulta directa",
      consultationTitle: "Conózcanse antes de decidir.",
      consultationLead: "Antes de la confirmación final, NAIREVA organiza una videoconsulta para que pueda hablar de su caso, sus expectativas y el plan propuesto directamente con el cirujano.",
      steps: [
        "Caso revisado antes de la consulta",
        "Conversación directa sobre objetivos y límites",
        "Plan médico final confirmado por el cirujano"
      ],
      biographyKicker: "Biografía",
      approachKicker: "Enfoque",
      educationKicker: "Formación",
      certificationsKicker: "Certificaciones",
      languagesKicker: "Idiomas",
      proceduresKicker: "Procedimientos",
      galleryKicker: "La clínica y el equipo",
      teamPhotoAlt: "El Dr. Bakhshyan con el equipo quirúrgico",
      galleryCloseLabel: "Cerrar",
      galleryPrevLabel: "Imagen anterior",
      galleryNextLabel: "Imagen siguiente"
    },
    transformations: {
      breadcrumb: "Transformaciones",
      kicker: "Resultados reales de pacientes",
      titleLine1: "Vea el trabajo.",
      titleLine2: "Luego haga las preguntas.",
      lead: "Una pequeña galería de casos reales de pacientes, compartidos con su consentimiento. La identidad del paciente nunca se revela.",
      disclaimer: "Casos reales de pacientes. Los resultados individuales varían y dependen de la anatomía, la cicatrización y el criterio clínico del cirujano.",
      emptyState: "Los casos publicados aparecerán aquí una vez que el equipo los añada.",
      filterAll: "Todos",
      viewCase: "Ver caso →"
    },
    transformationDetail: {
      breadcrumb: "Caso",
      title: "Un caso privado.",
      procedureLabel: "Procedimiento",
      surgeonLabel: "Cirujano",
      patientLabel: "Paciente",
      ageWithheld: "Rango de edad no revelado",
      agePrefix: "Edad",
      disclaimer: "Compartido con el consentimiento del paciente. La identidad nunca se revela. Los resultados individuales varían."
    },
    journey: {
      breadcrumb: "Su viaje",
      kicker: "Su viaje",
      title: "Claro antes de viajar.",
      lead: "La experiencia se organiza alrededor del plan médico, no al revés.",
      steps: [
        { num: "01", title: "Solicitud privada", body: "Objetivos, datos de contacto e información del caso." },
        { num: "02", title: "Revisión médica", body: "El equipo quirúrgico revisa el caso." },
        { num: "03", title: "Videoconsulta con el cirujano", body: "Conversación directa con el cirujano antes de cualquier confirmación." },
        { num: "04", title: "Llegada", body: "Logística de aeropuerto y clínica coordinada." },
        { num: "05", title: "Cirugía y recuperación", body: "Apoyo personal durante su estancia." },
        { num: "06", title: "Regreso a casa y seguimiento", body: "Revisión final y seguimiento según lo indique su cirujano." }
      ],
      cta: "Comenzar con una solicitud privada"
    },
    armeniaPage: {
      breadcrumb: "Armenia",
      kicker: "Armenia, más allá de la clínica",
      titleLine1: "Un viaje médico",
      titleLine2: "con sentido de lugar.",
      lead: "Ereván y Armenia son parte de la experiencia — pero la recuperación siempre va primero.",
      cards: [
        { num: "CIUDAD", title: "Ereván", body: "Cafés, gastronomía, arquitectura y un ritmo urbano compacto." },
        { num: "CULTURA", title: "Historia cercana", body: "Garni, Geghard y otras rutas a través de socios turísticos seleccionados." },
        { num: "OPCIONAL", title: "Experiencias premium", body: "Cenas privadas, vino y tours seleccionados cuando el cirujano aprueba la actividad." }
      ]
    },
    concierge: {
      breadcrumb: "Concierge",
      kicker: "Concierge",
      title: "El viaje, coordinado.",
      lead: "NAIREVA es la capa de concierge alrededor de su plan médico — no una agencia de viajes, ni un mostrador de reservas de una clínica.",
      services: [
        { title: "Traslado al aeropuerto y a la clínica", body: "La llegada, las visitas a la clínica y la salida se organizan según su calendario médico, no al revés." },
        { title: "Coordinador personal", body: "Un único punto de contacto sigue su caso desde la primera revisión hasta su regreso a casa — sin centros de llamadas ni traspasos que usted no conozca." },
        { title: "Logística médica", body: "Las citas, el ingreso, el alta y el plan de seguimiento del cirujano se coordinan para que nada quede al azar." },
        { title: "Apoyo hotelero opcional", body: "Su elección de estancia sigue siendo suya. Podemos sugerir opciones adecuadas para la recuperación, pero el hotel nunca se incluye ni se asume por defecto." },
        { title: "Turismo privado opcional", body: "Garni, Geghard, cenas privadas y experiencias seleccionadas — organizadas solo a través de socios turísticos seleccionados, y solo cuando su cirujano confirma que su etapa de recuperación lo permite." },
        { title: "Comunicación discreta", body: "El contacto se realiza a través del canal que usted prefiera — WhatsApp, Telegram o correo electrónico — respetando su privacidad en todo momento." }
      ],
      footerKicker: "Las decisiones médicas siguen siendo médicas",
      footerTitle: "El cirujano y la clínica deciden qué es médicamente apropiado. Nosotros nos encargamos de todo lo demás.",
      footerCta: "Iniciar una consulta privada"
    },
    journalPage: {
      breadcrumb: "Revista",
      kicker: "Revista",
      title: "Útil antes de decidir.",
      lead: "Información práctica sobre rinoplastia, preparación, recuperación y viajes a Armenia para cirugía estética.",
      emptyState: "Los artículos aparecerán aquí una vez publicados en el panel de administración.",
      byAuthor: "Por {name}",
      updated: "Actualizado el {date}"
    },
    faqPage: {
      breadcrumb: "Preguntas",
      kicker: "Preguntas frecuentes",
      title: "Antes de preguntarnos directamente.",
      emptyState: "Las preguntas aparecerán aquí una vez añadidas en el panel de administración."
    },
    privacyPage: {
      breadcrumb: "Privacidad",
      kicker: "Privacidad",
      title: "Privado por diseño.",
      lead: "Cómo NAIREVA recopila, almacena y utiliza la información que usted comparte con nosotros.",
      noticeTitle: "Acerca de esta página",
      notice:
        "Esta página explica, en términos simples, cómo está diseñado el producto para manejar su información. No sustituye el asesoramiento legal — para cualquier consulta sobre privacidad, contáctenos directamente.",
      sections: [
        { title: "Qué recopilamos", body: "Los datos de contacto que usted proporciona, los objetivos y el historial que comparte al enviar una solicitud de consulta, y cualquier foto que decida subir para revisión médica. Las fotos subidas y las notas del caso se tratan como información de salud sensible." },
        { title: "Cómo la usamos", body: "Su información se utiliza para revisar su caso, organizar una videoconsulta con el cirujano y coordinar el viaje médico si decide continuar. No la utilizamos para ningún otro fin sin su consentimiento." },
        { title: "Cómo se almacena", body: "Las fotos y notas del caso se guardan en un almacenamiento privado y no son accesibles públicamente. El acceso está limitado a cuentas autenticadas del equipo de NAIREVA — su coordinador, el equipo médico y el cirujano que revisa el caso." },
        { title: "Proveedores de servicios", body: "Utilizamos proveedores externos para servicios como alojamiento, almacenamiento de archivos y envío de correo electrónico. Estos procesan la información solo para prestarnos ese servicio y no pueden utilizarla para sus propios fines." },
        { title: "Seguridad", body: "Aplicamos medidas técnicas razonables, incluido el almacenamiento privado y el acceso autenticado, para proteger su información. Ningún método de almacenamiento o transmisión de datos en línea es completamente seguro, y no podemos garantizar una seguridad absoluta." },
        { title: "Conservación de datos", body: "Conservamos su información durante el tiempo necesario para responder a su solicitud o coordinar su caso, y un período razonable después para nuestros propios registros, salvo que nos pida eliminarla antes." },
        { title: "Eliminación y solicitudes de acceso", body: "Puede solicitarnos en cualquier momento acceder, corregir o eliminar la información que tenemos sobre usted, contactándonos. Responderemos en un plazo razonable." },
        { title: "Imágenes de antes y después", body: "Se publican únicamente cuando se ha obtenido el permiso adecuado del paciente, sin nombres, datos de contacto ni información personal innecesaria." },
        { title: "Visitantes internacionales", body: "NAIREVA trabaja con pacientes de muchos países. Su información puede almacenarse y procesarse en un país distinto de aquel desde el que nos contacta." },
        { title: "Contacto", body: "Las preguntas sobre esta política o su información pueden enviarse a team@naireva.com." }
      ]
    },
    termsPage: {
      breadcrumb: "Términos",
      kicker: "Términos",
      title: "Lea antes de confiar en esto.",
      lead: "Los términos que se aplican al usar este sitio web y solicitar una consulta.",
      noticeTitle: "Acerca de estos términos",
      sections: [
        { title: "Función de NAIREVA", body: "NAIREVA es un servicio de concierge y coordinación. NAIREVA no realiza cirugías ni emplea al cirujano ni opera la clínica. Todas las decisiones médicas — candidatura, plan quirúrgico y cuidado — corresponden únicamente al cirujano tratante y a la clínica." },
        { title: "No es consejo médico", body: "Nada en este sitio web, en ninguna solicitud de consulta, ni en ninguna futura evaluación asistida por IA constituye consejo médico, un diagnóstico ni una garantía de candidatura o resultado." },
        { title: "Elegibilidad para el tratamiento", body: "Si un procedimiento es adecuado para usted lo determinan únicamente el equipo médico y el cirujano tras la revisión del caso y una videoconsulta. Nada en este sitio garantiza la elegibilidad para ningún procedimiento." },
        { title: "Precios", body: "NAIREVA no publica precios. Los costos se discuten solo después de la revisión del caso y la consulta, y los establece la clínica tratante." },
        { title: "Proveedores externos", body: "La cirugía, la atención clínica, el alojamiento, el transporte y otros servicios de viaje son prestados por terceros independientes — clínicas, cirujanos, hoteles y socios de transporte. NAIREVA coordina estos servicios, pero no es responsable de los actos u omisiones independientes de dichos terceros." },
        { title: "Viaje y alojamiento", body: "Los documentos de viaje, visados, seguros y alojamiento siguen siendo su responsabilidad, salvo que se acuerde otra cosa con su coordinador. Recomendamos contar con un seguro de viaje adecuado para cualquier desplazamiento médico internacional." },
        { title: "Cambios y cancelaciones", body: "Cualquier cambio o cancelación de un procedimiento o viaje planificado se trata de forma individual con su coordinador y está sujeto a las políticas de la clínica tratante y de los terceros involucrados." },
        { title: "Contenido del sitio web", body: "El contenido de este sitio, incluidas las páginas de procedimientos y de la revista, se ofrece solo con fines informativos generales. Procuramos que sea preciso, pero no garantizamos que sea completo, actual o esté libre de errores." },
        { title: "Contacto", body: "Las preguntas sobre estos términos pueden enviarse a team@naireva.com." }
      ]
    },
    consultationPage: {
      breadcrumb: "Consulta privada",
      kicker: "Consulta privada",
      title: "Comience con una conversación.",
      lead: "Envíe lo básico. Nos pondremos en contacto con usted de forma privada por WhatsApp, Telegram o correo electrónico y prepararemos el caso para el equipo médico.",
      formHeading: "Su solicitud",
      formLead: "Sin precios públicos ni promesas médicas automatizadas. Las decisiones médicas finales las toma el cirujano tras la revisión y la consulta.",
      steps: ["Contacto", "Objetivos", "Fotos", "Confirmar"],
      back: "Atrás",
      continue: "Continuar",
      submit: "Solicitar una consulta privada",
      submitting: "Enviando…",
      successKicker: "Solicitud recibida",
      successTitleTemplate: "Gracias, {name}.",
      successBodyTemplate: "Su caso se ha enviado de forma privada a nuestro equipo. Nos pondremos en contacto con usted por {channel} en breve para organizar los próximos pasos.",
      genericError: "Algo salió mal. Por favor, inténtelo de nuevo.",
      step1: {
        fullName: "Nombre completo",
        country: "País",
        city: "Ciudad (opcional)",
        email: "Correo electrónico",
        age: "Edad (opcional)",
        preferredContact: "Método de contacto preferido",
        phone: "Teléfono (opcional)",
        whatsapp: "WhatsApp (opcional)",
        telegram: "Telegram (opcional)",
        contactOptions: { WHATSAPP: "WhatsApp", TELEGRAM: "Telegram", EMAIL: "Correo electrónico", PHONE: "Llamada telefónica" },
        validationError: "Por favor, complete su nombre, país y correo electrónico.",
        emailError: "Por favor, introduzca un correo electrónico válido."
      },
      step2: {
        procedure: "Procedimiento",
        procedureNotSure: "Aún no estoy seguro/a",
        travelDates: "Fechas de viaje preferidas (opcional)",
        travelDatesPlaceholder: "p. ej., flexible, en los próximos 2–3 meses",
        goals: "¿Qué le gustaría cambiar?",
        previousProcedures: "Cirugías o procedimientos previos (opcional)",
        budgetRange: "Rango de presupuesto (opcional — solo para planificación interna)",
        budgetNotSay: "Prefiero no decirlo",
        budgetRanges: ["Aún no estoy seguro/a", "Menos de $3,000", "$3,000–$6,000", "$6,000–$10,000", "$10,000+"],
        validationError: "Cuéntenos un poco más sobre lo que le gustaría cambiar."
      },
      step3: {
        photosLabel: "Fotos (opcional, hasta {max})",
        dropzone: "Haga clic para seleccionar fotos — de frente, de perfil y cualquier ángulo que desee mostrar al equipo médico.",
        privacyNote: "Las fotos se almacenan de forma privada y solo son visibles para el equipo médico de NAIREVA y el cirujano que revisa el caso.",
        notes: "¿Algo más que deberíamos saber? (opcional)",
        removePhoto: "Eliminar foto"
      },
      step4: {
        reviewKicker: "Revisión",
        labels: { name: "Nombre", country: "País", contact: "Contacto", procedure: "Procedimiento", goals: "Objetivos" },
        consent: "Doy mi consentimiento para que NAIREVA recopile y revise esta información, incluidas las fotos, para que mi caso pueda ser evaluado por el equipo médico y el cirujano que lo revisa. Entiendo que no se toma ninguna decisión médica hasta que se realice la revisión del cirujano y la videoconsulta.",
        consentError: "Por favor, acepte la declaración de consentimiento para continuar."
      }
    },
    seo: {
      siteTitle: "NAIREVA — Viajes estéticos privados en Armenia",
      siteDescription:
        "Un camino privado, acompañado por un concierge, hacia la cirugía estética en Armenia — experiencia quirúrgica seleccionada, videoconsulta directa con el cirujano y un viaje totalmente coordinado.",
      home: {
        title: "Viajes estéticos privados en Armenia",
        description:
          "Un camino privado, acompañado por un concierge, hacia la cirugía estética en Armenia — experiencia quirúrgica seleccionada, videoconsulta directa con el cirujano y un viaje totalmente coordinado."
      },
      procedures: { title: "Procedimientos", description: "Procedimientos estéticos seleccionados, coordinados desde la primera revisión hasta la recuperación — comenzando con la rinoplastia en Armenia." },
      journey: { title: "Su viaje", description: "Cómo funciona realmente un viaje estético privado con NAIREVA, desde la primera solicitud hasta su regreso a casa." },
      armenia: { title: "Armenia", description: "Armenia es parte de la experiencia, no solo el lugar del tratamiento — Ereván, cultura y experiencias privadas opcionales en torno a la recuperación." },
      concierge: { title: "Concierge", description: "Cómo NAIREVA coordina el traslado, la logística de la clínica, el contacto personal y el turismo opcional en torno a su plan médico." },
      journal: { title: "Revista", description: "Información práctica sobre rinoplastia, preparación, recuperación y viajes a Armenia para cirugía estética." },
      consultation: { title: "Consulta privada", description: "Envíe lo básico de forma privada. Nos pondremos en contacto por WhatsApp, Telegram o correo electrónico y prepararemos su caso para el equipo médico." },
      faq: { title: "Preguntas frecuentes", description: "Respuestas a preguntas comunes sobre el proceso de NAIREVA, la privacidad, los precios y los viajes." },
      transformations: { title: "Transformaciones", description: "Casos reales de pacientes de antes y después, compartidos con su consentimiento. Los resultados individuales varían." }
    },
    localeBanner: {
      ru: { question: "Show this site in Russian?", accept: "Show in Russian", dismiss: "Stay in English" },
      es: { question: "Show this site in Spanish?", accept: "Show in Spanish", dismiss: "Stay in English" },
      ar: { question: "Show this site in Arabic?", accept: "Show in Arabic", dismiss: "Stay in English" }
    }
  },
  ar: {
    nav: {
      procedures: "الإجراءات",
      surgeon: "الجراح",
      transformations: "التحولات",
      journey: "رحلتكم",
      armenia: "أرمينيا",
      concierge: "الكونسيرج",
      journal: "المجلة",
      consultation: "استشارة خاصة",
      faq: "الأسئلة"
    },
    footer: {
      tagline: "رحلات تجميلية خاصة في أرمينيا.",
      explore: "استكشف",
      contact: "التواصل",
      legal: "القانونية",
      privacy: "الخصوصية",
      terms: "الشروط",
      rights: "جميع الحقوق محفوظة."
    },
    home: {
      kicker: "تجميل الأنف والجراحة التجميلية · أرمينيا",
      titleLine1: "الجمال.",
      titleLine2: "الخصوصية.",
      titleLine3: "أرمينيا.",
      subhead:
        "مسار خاص وشخصي للغاية نحو الجراحة التجميلية في يريفان — من أول محادثة إلى التعافي والعودة إلى الوطن.",
      ctaPrimary: "استشارة خاصة",
      ctaSecondary: "اكتشفوا الرحلة",
      trust: [
        "خبرة جراحية مختارة",
        "استشارة فيديو مباشرة مع الجراح",
        "منسق شخصي",
        "تواصل بخصوصية تامة"
      ],
      intro: {
        kicker: "NAIREVA",
        titleLine1: "لسنا دليل عيادات.",
        titleLine2: "بل كونسيرج تجميلي خاص.",
        lead: "نحضّر الحالة، ونربطكم بخبرة جراحية مختارة، وننسّق الرحلة الطبية، ونجعل الإقامة في أرمينيا تجربة مدروسة لا سريرية."
      },
      features: {
        procedures: { kicker: "الإجراءات", title: "تجميل الأنف", body: "رحلتنا التجميلية المتخصصة الأولى، بمراجعة مباشرة من الجراح وتخطيط شخصي." },
        transformations: { kicker: "التحولات", title: "نتائج حقيقية لمرضى فعليين", body: "حالات قبل وبعد شاركها الفريق الجراحي بموافقة المرضى." },
        surgeon: { kicker: "الجراح", title: "تعرّفوا على الدكتور هايك باكشيان", body: "المؤهلات، والمنهج، واستشارة فيديو مباشرة قبل التأكيد." },
        armenia: { kicker: "أرمينيا", title: "أبعد من العيادة", body: "يريفان، والمأكولات، والنبيذ، والثقافة، وتجارب خاصة اختيارية أثناء التعافي." }
      },
      howItWorks: {
        kicker: "كيف تعمل الرحلة",
        title: "ثلاث مراحل واضحة.",
        lead: "طلب خاص. مراجعة طبية ومكالمة فيديو مع الجراح. ثم رحلة منسّقة إلى أرمينيا.",
        steps: [
          { num: "01", title: "شاركونا حالتكم", body: "أخبرونا بما تفكرون فيه، وبالطريقة التي تفضلون التواصل من خلالها." },
          { num: "02", title: "تعرّفوا على الجراح", body: "تُراجَع حالتكم ويتم تنظيم استشارة فيديو قبل التأكيد النهائي." },
          { num: "03", title: "تعالوا إلى أرمينيا", body: "ننسّق النقل، ولوجستيات العيادة، ورحلتكم الشخصية حول الخطة الطبية." }
        ]
      },
      concierge: {
        kicker: "الكونسيرج",
        title: "مرافَقون، لا مجرد محجوزين.",
        lead: "توجد خدمة الكونسيرج لكي لا تشعر الرحلة الطبية أبدًا كأنها لوجستيات تديرونها بمفردكم.",
        items: [
          { title: "النقل من وإلى المطار والعيادة", body: "وصول منسّق، وزيارات للعيادة، ومغادرة — نقطة تواصل واحدة طوال الرحلة." },
          { title: "تنسيق شخصي", body: "يتابع منسّق مخصص حالتكم من أول مراجعة وحتى عودتكم إلى الوطن." },
          { title: "اللوجستيات الطبية", body: "يتم جدولة المواعيد والدخول والمتابعة وفق خطة الجراح." },
          { title: "الفندق والسياحة اختياريان", body: "يبقى اختيار الفندق لكم؛ الإقامات الفاخرة والجولات الخاصة اختيارية، عبر شركاء، وفقط عندما يكون ذلك مناسبًا." }
        ],
        cta: "تفاصيل خدمة الكونسيرج"
      },
      journal: { kicker: "المجلة", title: "معلومات مفيدة قبل اتخاذ القرار." },
      armeniaTeaser: {
        kicker: "أرمينيا",
        titleLine1: "تعافوا بلا عجلة.",
        titleLine2: "واكتشفوا الجمال المحيط بكم.",
        lead: "إقامة في المدينة مع عشاء فاخر اختياري، ونبيذ، وتجارب ثقافية خاصة — فقط عندما يكون ذلك مناسبًا لمرحلة تعافيكم.",
        pills: ["يريفان", "عشاء خاص", "نبيذ", "غارني وغيغارد"],
        cta: "اكتشفوا أرمينيا"
      },
      finalCta: {
        kicker: "ابدأوا بخصوصية",
        title: "ابدأوا بمحادثة خاصة.",
        lead: "لا أسعار علنية، ولا وعود طبية تلقائية — فقط مراجعة دقيقة ومحادثة مباشرة مع الجراح قبل تأكيد أي شيء.",
        cta: "استشارة خاصة"
      },
      transformationsPreview: {
        kicker: "تحولات حقيقية",
        title: "شاهدوا النتائج.",
        cta: "عرض جميع التحولات",
        disclaimer: "حالة حقيقية لمريض. تختلف النتائج الفردية."
      },
      surgeonPreview: {
        kicker: "استشارة مباشرة",
        title: "تعرّفوا قبل أن تقرروا.",
        leadTemplate:
          "قبل التأكيد النهائي، تنظّم NAIREVA استشارة فيديو لتتمكنوا من مناقشة حالتكم وتوقعاتكم والخطة المقترحة مباشرة مع الجراح {name}.",
        ctaTemplate: "تعرّفوا على الجراح {name}"
      },
      whyChoose: {
        kicker: "لماذا يختار المرضى NAIREVA",
        title: "كل حالة تُعامَل بشكل فردي.",
        lead: "بلا فريق مبيعات ولا وعود آلية — كل قرار يتخذه من يراجع حالتكم فعليًا.",
        items: [
          { title: "خبرة جراحية مختارة", body: "تتم مراجعة كل حالة شخصيًا من قِبل جراح تم اختياره لدقته الجمالية والترميمية، وليس بحسب التوفر." },
          { title: "استشارة فيديو مباشرة مع الجراح", body: "قبل أي تأكيد، تتحدثون مباشرة مع الجراح حول حالتكم وتوقعاتكم والخطة المقترحة." },
          { title: "منسّق شخصي", body: "جهة تواصل واحدة تتابع حالتكم وسفركم وتواصلكم من المراجعة الأولى وحتى عودتكم." },
          { title: "عملية خاصة وسرية", body: "بلا أسعار علنية ولا نشر علني للحالات. تُعالَج حالتكم وصوركم بسرية، مع الحاجة لموافقة لأي نشر." }
        ]
      }
    },
    common: {
      home: "الرئيسية",
      requestConsultation: "طلب استشارة خاصة",
      menu: "القائمة",
      language: "اللغة"
    },
    compareSlider: {
      before: "قبل",
      after: "بعد",
      ariaLabel: "مقارنة قبل وبعد"
    },
    categories: {
      RHINOPLASTY: "تجميل الأنف",
      RECOVERY: "التعافي",
      ARMENIA: "أرمينيا",
      CONSULTATION: "استشارة",
      TRAVEL: "السفر",
      AESTHETIC_SURGERY: "الجراحة التجميلية"
    },
    procedures: {
      breadcrumb: "الإجراءات",
      kicker: "الإجراءات",
      title: "مختارة، لا بلا حدود.",
      lead: "تبدأ NAIREVA بإجراءات تجميلية محددة يمكن فيها تنسيق الرحلة الطبية بعناية من أول مراجعة حتى التعافي.",
      comingLater: {
        kicker: "قريبًا",
        title: "إجراءات إضافية",
        body: "سنتوسّع بشكل مدروس مع جراحين موثوقين، وفقط بعد أن تكون رحلة المريض محددة بالكامل."
      }
    },
    procedureDetail: {
      titleLine1: "مصمَّم بحسب ملامح وجهكم،",
      titleLine2: "لا بحسب قالب جاهز.",
      checklist: ["مراجعة خاصة للحالة", "استشارة فيديو مع الجراح", "تنسيق مع العيادة", "النقل من وإلى المطار / العيادة", "متابعة ما بعد العملية"],
      faqKicker: "الأسئلة الشائعة",
      faqTitle: "قبل أن تسألونا مباشرة."
    },
    surgeon: {
      breadcrumb: "الجراح",
      kicker: "خبرة جراحية مختارة",
      consultationKicker: "استشارة مباشرة",
      consultationTitle: "تعرّفوا قبل أن تقرروا.",
      consultationLead: "قبل التأكيد النهائي، تنظّم NAIREVA استشارة فيديو لتتمكنوا من مناقشة حالتكم وتوقعاتكم والخطة المقترحة مباشرة مع الجراح.",
      steps: [
        "مراجعة الحالة قبل الاستشارة",
        "مناقشة مباشرة للأهداف والحدود الممكنة",
        "تأكيد الجراح للخطة الطبية النهائية"
      ],
      biographyKicker: "السيرة الذاتية",
      approachKicker: "المنهج",
      educationKicker: "التعليم",
      certificationsKicker: "الشهادات",
      languagesKicker: "اللغات",
      proceduresKicker: "الإجراءات",
      galleryKicker: "العيادة والفريق",
      teamPhotoAlt: "الدكتور باكشيان مع الفريق الجراحي",
      galleryCloseLabel: "إغلاق",
      galleryPrevLabel: "الصورة السابقة",
      galleryNextLabel: "الصورة التالية"
    },
    transformations: {
      breadcrumb: "التحولات",
      kicker: "نتائج حقيقية لمرضى فعليين",
      titleLine1: "شاهدوا النتائج.",
      titleLine2: "ثم اطرحوا الأسئلة.",
      lead: "معرض صغير لحالات مرضى حقيقية، تُنشَر بموافقتهم. لا يتم الكشف عن هوية المريض أبدًا.",
      disclaimer: "حالات حقيقية لمرضى فعليين. تختلف النتائج الفردية وتعتمد على التركيب التشريحي وسرعة الشفاء وتقدير الجراح السريري.",
      emptyState: "ستظهر الحالات المنشورة هنا بعد إضافتها من قِبل الفريق.",
      filterAll: "الكل",
      viewCase: "عرض الحالة ←"
    },
    transformationDetail: {
      breadcrumb: "الحالة",
      title: "حالة خاصة واحدة.",
      procedureLabel: "الإجراء",
      surgeonLabel: "الجراح",
      patientLabel: "المريض",
      ageWithheld: "الفئة العمرية غير معلنة",
      agePrefix: "العمر",
      disclaimer: "تم النشر بموافقة المريض. لا يتم الكشف عن الهوية أبدًا. تختلف النتائج الفردية."
    },
    journey: {
      breadcrumb: "رحلتكم",
      kicker: "رحلتكم",
      title: "واضحة قبل السفر.",
      lead: "تُنظَّم التجربة حول الخطة الطبية، لا العكس.",
      steps: [
        { num: "01", title: "طلب خاص", body: "الأهداف، وبيانات التواصل، ومعلومات الحالة." },
        { num: "02", title: "مراجعة طبية", body: "يراجع الفريق الجراحي الحالة." },
        { num: "03", title: "استشارة فيديو مع الجراح", body: "مناقشة مباشرة مع الجراح قبل أي تأكيد." },
        { num: "04", title: "الوصول", body: "تنسيق لوجستيات المطار والعيادة." },
        { num: "05", title: "العملية والتعافي", body: "دعم شخصي طوال فترة إقامتكم." },
        { num: "06", title: "العودة إلى الوطن والمتابعة", body: "فحص نهائي ومتابعة حسب توجيهات جراحكم." }
      ],
      cta: "ابدأوا بطلب خاص"
    },
    armeniaPage: {
      breadcrumb: "أرمينيا",
      kicker: "أرمينيا، أبعد من العيادة",
      titleLine1: "رحلة طبية",
      titleLine2: "بحسّ من الانتماء للمكان.",
      lead: "يريفان وأرمينيا جزء من التجربة — لكن التعافي يأتي دائمًا أولًا.",
      cards: [
        { num: "المدينة", title: "يريفان", body: "مقاهٍ، ومأكولات، وعمارة، وإيقاع مدينة مضغوط." },
        { num: "الثقافة", title: "تاريخ قريب", body: "غارني، وغيغارد، ومسارات أخرى عبر شركاء سياحيين مختارين." },
        { num: "اختياري", title: "تجارب فاخرة", body: "عشاء خاص، ونبيذ، وجولات منسّقة عندما يوافق الجراح على النشاط." }
      ]
    },
    concierge: {
      breadcrumb: "الكونسيرج",
      kicker: "الكونسيرج",
      title: "الرحلة، منسّقة بالكامل.",
      lead: "NAIREVA هي طبقة الكونسيرج حول خطتكم الطبية — لا وكالة سفر، ولا مكتب حجوزات لعيادة.",
      services: [
        { title: "النقل من وإلى المطار والعيادة", body: "يتم تنظيم الوصول وزيارات العيادة والمغادرة حول جدولكم الطبي، لا العكس." },
        { title: "منسّق شخصي", body: "نقطة تواصل واحدة تتابع حالتكم من أول مراجعة وحتى عودتكم إلى الوطن — دون مراكز اتصال ودون أي تسليم بينكم لا تعرفون عنه." },
        { title: "اللوجستيات الطبية", body: "يتم تنسيق المواعيد، والدخول، والخروج، وخطة متابعة الجراح بحيث لا يُترك أي شيء للصدفة." },
        { title: "دعم فندقي اختياري", body: "يبقى اختيار الإقامة لكم. يمكننا اقتراح خيارات تناسب التعافي، لكن الفندق لا يُدرج أو يُفترض تلقائيًا أبدًا." },
        { title: "سياحة خاصة اختيارية", body: "غارني، وغيغارد، وعشاء خاص، وتجارب منسّقة — تُنظَّم فقط عبر شركاء سياحيين مختارين، وفقط عندما يؤكد جراحكم أن مرحلة تعافيكم تسمح بذلك." },
        { title: "تواصل بخصوصية تامة", body: "يتم التواصل عبر القناة التي تفضلونها — واتساب، أو تيليجرام، أو البريد الإلكتروني — مع احترام كامل لخصوصيتكم في كل خطوة." }
      ],
      footerKicker: "القرارات الطبية تبقى طبية",
      footerTitle: "الجراح والعيادة يقرران ما هو مناسب طبيًا. ونحن نتولى كل ما حول ذلك.",
      footerCta: "ابدأوا استشارة خاصة"
    },
    journalPage: {
      breadcrumb: "المجلة",
      kicker: "المجلة",
      title: "معلومات مفيدة قبل اتخاذ القرار.",
      lead: "معلومات عملية حول تجميل الأنف، والتحضير، والتعافي، والسفر إلى أرمينيا لأغراض الجراحة التجميلية.",
      emptyState: "ستظهر المقالات هنا بعد نشرها من لوحة التحكم.",
      byAuthor: "بقلم {name}",
      updated: "آخر تحديث {date}"
    },
    faqPage: {
      breadcrumb: "الأسئلة",
      kicker: "الأسئلة الشائعة",
      title: "قبل أن تسألونا مباشرة.",
      emptyState: "ستظهر الأسئلة هنا بعد إضافتها من لوحة التحكم."
    },
    privacyPage: {
      breadcrumb: "الخصوصية",
      kicker: "الخصوصية",
      title: "خصوصية بالتصميم.",
      lead: "كيف تجمع NAIREVA المعلومات التي تشاركونها معنا وتخزّنها وتستخدمها.",
      noticeTitle: "حول هذه الصفحة",
      notice:
        "توضح هذه الصفحة، بعبارات بسيطة، كيف صُمِّم المنتج للتعامل مع معلوماتكم. وهي لا تُغني عن الاستشارة القانونية — لأي أسئلة تتعلق بالخصوصية، يُرجى التواصل معنا مباشرة.",
      sections: [
        { title: "ما الذي نجمعه", body: "بيانات التواصل التي تقدّمونها، والأهداف والتاريخ الطبي الذي تشاركونه عند إرسال طلب استشارة، وأي صور تختارون تحميلها للمراجعة الطبية. تُعامل الصور وملاحظات الحالة المُحمَّلة كمعلومات صحية حساسة." },
        { title: "كيف نستخدمها", body: "تُستخدم معلوماتكم لمراجعة حالتكم، وتنظيم استشارة فيديو مع الجراح، وتنسيق الرحلة الطبية في حال قررتم المتابعة. لا نستخدمها لأي غرض آخر دون موافقتكم." },
        { title: "كيف يتم تخزينها", body: "تُحفظ صور وملاحظات الحالة في تخزين خاص وغير متاحة للعامة. يقتصر الوصول إليها على حسابات موثّقة لفريق NAIREVA — منسّقكم، والفريق الطبي، والجراح المراجع." },
        { title: "مزوّدو الخدمات", body: "نستخدم مزوّدين خارجيين لخدمات مثل الاستضافة، وتخزين الملفات، وإرسال البريد الإلكتروني. تعالج هذه الجهات المعلومات فقط لتقديم تلك الخدمة لنا، وليس مسموحًا لها استخدامها لأغراضها الخاصة." },
        { title: "الأمان", body: "نطبّق تدابير تقنية معقولة، بما فيها التخزين الخاص والوصول الموثّق، لحماية معلوماتكم. لا توجد طريقة لتخزين أو نقل البيانات عبر الإنترنت آمنة بشكل كامل، ولا يمكننا ضمان أمان مطلق." },
        { title: "مدة الاحتفاظ بالبيانات", body: "نحتفظ بمعلوماتكم للمدة اللازمة للرد على طلبكم أو تنسيق حالتكم، ولفترة معقولة بعد ذلك لسجلاتنا الخاصة، إلا إذا طلبتم حذفها قبل ذلك." },
        { title: "الحذف وطلبات الوصول", body: "يمكنكم في أي وقت طلب الوصول إلى معلوماتكم أو تصحيحها أو حذفها بالتواصل معنا. سنرد في غضون وقت معقول." },
        { title: "صور ما قبل وبعد", body: "تُنشَر فقط عند الحصول على إذن مناسب من المريض، دون أسماء أو بيانات تواصل أو أي معلومات شخصية غير ضرورية." },
        { title: "الزوّار من خارج البلاد", body: "تعمل NAIREVA مع مرضى من بلدان عديدة. قد تُخزَّن معلوماتكم وتُعالَج في بلد مختلف عن البلد الذي تتواصلون معنا منه." },
        { title: "التواصل", body: "يمكن إرسال الأسئلة حول هذه السياسة أو حول معلوماتكم إلى team@naireva.com." }
      ]
    },
    termsPage: {
      breadcrumb: "الشروط",
      kicker: "الشروط",
      title: "اقرأوا قبل الاعتماد على هذا.",
      lead: "الشروط التي تُطبَّق عند استخدام هذا الموقع وطلب استشارة.",
      noticeTitle: "حول هذه الشروط",
      sections: [
        { title: "دور NAIREVA", body: "NAIREVA هي خدمة كونسيرج وتنسيق. لا تقوم NAIREVA بإجراء العمليات الجراحية، ولا تُوظّف الجراح، ولا تدير العيادة. تعود جميع القرارات الطبية — الأهلية، والخطة الجراحية، والعناية — للجراح المعالج والعيادة وحدهما." },
        { title: "ليست نصيحة طبية", body: "لا يُعد أي محتوى في هذا الموقع، أو في أي طلب استشارة، أو في أي عملية جمع معلومات مستقبلية بمساعدة الذكاء الاصطناعي نصيحة طبية أو تشخيصًا أو ضمانًا للأهلية أو النتيجة." },
        { title: "الأهلية للعلاج", body: "يحدّد الفريق الطبي والجراح وحدهما مدى مناسبة أي إجراء لكم، وذلك بعد مراجعة الحالة واستشارة فيديو. لا يضمن أي محتوى في هذا الموقع الأهلية لأي إجراء." },
        { title: "الأسعار", body: "لا تنشر NAIREVA أسعارًا. تتم مناقشة التكاليف فقط بعد مراجعة الحالة والاستشارة، وتحددها العيادة المعالجة." },
        { title: "مزوّدون خارجيون", body: "تُقدَّم الجراحة، والرعاية السريرية، والإقامة، والنقل، وخدمات السفر الأخرى من قِبل أطراف ثالثة مستقلة — عيادات، وجراحون، وفنادق، وشركاء نقل. تنسّق NAIREVA هذه الخدمات لكنها لا تتحمل مسؤولية أفعال أو تقصير هذه الأطراف المستقلة." },
        { title: "السفر والإقامة", body: "تبقى وثائق السفر، والتأشيرات، والتأمين، والإقامة على مسؤوليتكم الخاصة، إلا إذا اتُّفق على غير ذلك مع منسّقكم. نوصي بالحصول على تأمين سفر مناسب لأي رحلة طبية دولية." },
        { title: "التغييرات والإلغاء", body: "يُنظر في أي تغيير أو إلغاء لإجراء أو رحلة مُخطَّطة بشكل فردي مع منسّقكم، ويخضع لسياسات العيادة المعالجة وأي أطراف خارجية مشاركة." },
        { title: "محتوى الموقع", body: "يُقدَّم محتوى هذا الموقع، بما فيه صفحات الإجراءات والمجلة، لأغراض إعلامية عامة فقط. نسعى لدقته، لكننا لا نضمن أنه كامل أو محدَّث أو خالٍ من الأخطاء." },
        { title: "التواصل", body: "يمكن إرسال الأسئلة حول هذه الشروط إلى team@naireva.com." }
      ]
    },
    consultationPage: {
      breadcrumb: "استشارة خاصة",
      kicker: "استشارة خاصة",
      title: "ابدأوا بمحادثة.",
      lead: "أرسلوا المعلومات الأساسية. سنتواصل معكم بخصوصية عبر واتساب أو تيليجرام أو البريد الإلكتروني، ونحضّر الحالة للفريق الطبي.",
      formHeading: "طلبكم",
      formLead: "لا أسعار علنية ولا وعود طبية تلقائية. يتخذ الجراح القرارات الطبية النهائية بعد المراجعة والاستشارة.",
      steps: ["التواصل", "الأهداف", "الصور", "التأكيد"],
      back: "رجوع",
      continue: "متابعة",
      submit: "طلب استشارة خاصة",
      submitting: "جارٍ الإرسال…",
      successKicker: "تم استلام الطلب",
      successTitleTemplate: "شكرًا لكم، {name}.",
      successBodyTemplate: "تم إرسال حالتكم بخصوصية إلى فريقنا. سنتواصل معكم عبر {channel} قريبًا لتنظيم الخطوات التالية.",
      genericError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      step1: {
        fullName: "الاسم الكامل",
        country: "البلد",
        city: "المدينة (اختياري)",
        email: "البريد الإلكتروني",
        age: "العمر (اختياري)",
        preferredContact: "طريقة التواصل المفضلة",
        phone: "الهاتف (اختياري)",
        whatsapp: "واتساب (اختياري)",
        telegram: "تيليجرام (اختياري)",
        contactOptions: { WHATSAPP: "واتساب", TELEGRAM: "تيليجرام", EMAIL: "البريد الإلكتروني", PHONE: "مكالمة هاتفية" },
        validationError: "يرجى إدخال الاسم والبلد والبريد الإلكتروني.",
        emailError: "يرجى إدخال بريد إلكتروني صحيح."
      },
      step2: {
        procedure: "الإجراء",
        procedureNotSure: "لست متأكدًا/ة بعد",
        travelDates: "تواريخ السفر المفضلة (اختياري)",
        travelDatesPlaceholder: "مثال: مرنة، خلال الشهرين إلى الثلاثة أشهر القادمة",
        goals: "ما الذي ترغبون في تغييره؟",
        previousProcedures: "عمليات أو إجراءات سابقة (اختياري)",
        budgetRange: "النطاق التقريبي للميزانية (اختياري — للتخطيط الداخلي فقط)",
        budgetNotSay: "أفضّل عدم التحديد",
        budgetRanges: ["لست متأكدًا/ة بعد", "أقل من 3,000$", "3,000$–6,000$", "6,000$–10,000$", "أكثر من 10,000$"],
        validationError: "أخبرونا بمزيد من التفصيل عن الذي ترغبون في تغييره."
      },
      step3: {
        photosLabel: "الصور (اختياري، حتى {max})",
        dropzone: "اضغطوا لاختيار الصور — من الأمام، والجانب، وأي زاوية تودّون أن يراها الفريق الطبي.",
        privacyNote: "تُخزَّن الصور بخصوصية تامة ولا تكون مرئية إلا لفريق NAIREVA الطبي والجراح المراجع.",
        notes: "هل هناك أي شيء آخر تودّون إخبارنا به؟ (اختياري)",
        removePhoto: "إزالة الصورة"
      },
      step4: {
        reviewKicker: "المراجعة",
        labels: { name: "الاسم", country: "البلد", contact: "التواصل", procedure: "الإجراء", goals: "الأهداف" },
        consent: "أوافق على أن تجمع NAIREVA وتراجع هذه المعلومات، بما في ذلك أي صور، لكي تُقيَّم حالتي من قِبل الفريق الطبي والجراح المراجع. أفهم أنه لا يُتخذ أي قرار طبي قبل مراجعة الجراح واستشارة الفيديو.",
        consentError: "يرجى الموافقة على بيان الموافقة للمتابعة."
      }
    },
    seo: {
      siteTitle: "NAIREVA — رحلات تجميلية خاصة في أرمينيا",
      siteDescription:
        "طريق خاص برفقة كونسيرج نحو الجراحة التجميلية في أرمينيا — خبرة جراحية مختارة، واستشارة فيديو مباشرة مع الجراح، ورحلة منسّقة بالكامل.",
      home: {
        title: "رحلات تجميلية خاصة في أرمينيا",
        description:
          "طريق خاص برفقة كونسيرج نحو الجراحة التجميلية في أرمينيا — خبرة جراحية مختارة، واستشارة فيديو مباشرة مع الجراح، ورحلة منسّقة بالكامل."
      },
      procedures: { title: "الإجراءات", description: "إجراءات تجميلية مختارة، منسّقة من أول مراجعة وحتى التعافي — بدءًا بتجميل الأنف في أرمينيا." },
      journey: { title: "رحلتكم", description: "كيف تسير رحلة تجميلية خاصة مع NAIREVA فعليًا، من أول طلب وحتى عودتكم إلى الوطن." },
      armenia: { title: "أرمينيا", description: "أرمينيا جزء من التجربة، لا مجرد مكان للعلاج — يريفان، والثقافة، وتجارب خاصة اختيارية حول التعافي." },
      concierge: { title: "الكونسيرج", description: "كيف تنسّق NAIREVA النقل، ولوجستيات العيادة، والتواصل الشخصي، والسياحة الاختيارية حول خطتكم الطبية." },
      journal: { title: "المجلة", description: "معلومات عملية حول تجميل الأنف، والتحضير، والتعافي، والسفر إلى أرمينيا لأغراض الجراحة التجميلية." },
      consultation: { title: "استشارة خاصة", description: "أرسلوا المعلومات الأساسية بخصوصية. سنتواصل معكم عبر واتساب أو تيليغرام أو البريد الإلكتروني ونُحضّر حالتكم للفريق الطبي." },
      faq: { title: "الأسئلة الشائعة", description: "إجابات عن الأسئلة الشائعة حول عملية NAIREVA، والخصوصية، والأسعار، والسفر." },
      transformations: { title: "التحولات", description: "حالات حقيقية لمرضى قبل وبعد، تُنشَر بموافقتهم. تختلف النتائج الفردية." }
    },
    localeBanner: {
      ru: { question: "Show this site in Russian?", accept: "Show in Russian", dismiss: "Stay in English" },
      es: { question: "Show this site in Spanish?", accept: "Show in Spanish", dismiss: "Stay in English" },
      ar: { question: "Show this site in Arabic?", accept: "Show in Arabic", dismiss: "Stay in English" }
    }
  }
};

export interface Dictionary {
  nav: {
    procedures: string;
    surgeon: string;
    transformations: string;
    journey: string;
    armenia: string;
    concierge: string;
    journal: string;
    consultation: string;
    faq: string;
  };
  footer: {
    tagline: string;
    explore: string;
    contact: string;
    legal: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  home: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string[];
    intro: { kicker: string; titleLine1: string; titleLine2: string; lead: string };
    features: {
      procedures: { kicker: string; title: string; body: string };
      transformations: { kicker: string; title: string; body: string };
      surgeon: { kicker: string; title: string; body: string };
      armenia: { kicker: string; title: string; body: string };
    };
    howItWorks: {
      kicker: string;
      title: string;
      lead: string;
      steps: { num: string; title: string; body: string }[];
    };
    concierge: {
      kicker: string;
      title: string;
      lead: string;
      items: { title: string; body: string }[];
      cta: string;
    };
    journal: { kicker: string; title: string };
    armeniaTeaser: {
      kicker: string;
      titleLine1: string;
      titleLine2: string;
      lead: string;
      pills: string[];
      cta: string;
    };
    finalCta: { kicker: string; title: string; lead: string; cta: string };
    transformationsPreview: { kicker: string; title: string; cta: string; disclaimer: string };
    surgeonPreview: { kicker: string; title: string; leadTemplate: string; ctaTemplate: string };
    whyChoose: { kicker: string; title: string; lead: string; items: { title: string; body: string }[] };
  };
  common: { home: string; requestConsultation: string; menu: string; language: string };
  compareSlider: { before: string; after: string; ariaLabel: string };
  categories: {
    RHINOPLASTY: string;
    RECOVERY: string;
    ARMENIA: string;
    CONSULTATION: string;
    TRAVEL: string;
    AESTHETIC_SURGERY: string;
  };
  procedures: {
    breadcrumb: string;
    kicker: string;
    title: string;
    lead: string;
    comingLater: { kicker: string; title: string; body: string };
  };
  procedureDetail: {
    titleLine1: string;
    titleLine2: string;
    checklist: string[];
    faqKicker: string;
    faqTitle: string;
  };
  surgeon: {
    breadcrumb: string;
    kicker: string;
    consultationKicker: string;
    consultationTitle: string;
    consultationLead: string;
    steps: string[];
    biographyKicker: string;
    approachKicker: string;
    educationKicker: string;
    certificationsKicker: string;
    languagesKicker: string;
    proceduresKicker: string;
    galleryKicker: string;
    teamPhotoAlt: string;
    galleryCloseLabel: string;
    galleryPrevLabel: string;
    galleryNextLabel: string;
  };
  transformations: {
    breadcrumb: string;
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    disclaimer: string;
    emptyState: string;
    filterAll: string;
    viewCase: string;
  };
  transformationDetail: {
    breadcrumb: string;
    title: string;
    procedureLabel: string;
    surgeonLabel: string;
    patientLabel: string;
    ageWithheld: string;
    agePrefix: string;
    disclaimer: string;
  };
  journey: {
    breadcrumb: string;
    kicker: string;
    title: string;
    lead: string;
    steps: { num: string; title: string; body: string }[];
    cta: string;
  };
  armeniaPage: {
    breadcrumb: string;
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    cards: { num: string; title: string; body: string }[];
  };
  concierge: {
    breadcrumb: string;
    kicker: string;
    title: string;
    lead: string;
    services: { title: string; body: string }[];
    footerKicker: string;
    footerTitle: string;
    footerCta: string;
  };
  journalPage: {
    breadcrumb: string;
    kicker: string;
    title: string;
    lead: string;
    emptyState: string;
    byAuthor: string;
    updated: string;
  };
  faqPage: {
    breadcrumb: string;
    kicker: string;
    title: string;
    emptyState: string;
  };
  privacyPage: {
    breadcrumb: string;
    kicker: string;
    title: string;
    lead: string;
    noticeTitle: string;
    notice: string;
    sections: { title: string; body: string }[];
  };
  termsPage: {
    breadcrumb: string;
    kicker: string;
    title: string;
    lead: string;
    noticeTitle: string;
    sections: { title: string; body: string }[];
  };
  consultationPage: {
    breadcrumb: string;
    kicker: string;
    title: string;
    lead: string;
    formHeading: string;
    formLead: string;
    steps: string[];
    back: string;
    continue: string;
    submit: string;
    submitting: string;
    successKicker: string;
    successTitleTemplate: string;
    successBodyTemplate: string;
    genericError: string;
    step1: {
      fullName: string;
      country: string;
      city: string;
      email: string;
      age: string;
      preferredContact: string;
      phone: string;
      whatsapp: string;
      telegram: string;
      contactOptions: { WHATSAPP: string; TELEGRAM: string; EMAIL: string; PHONE: string };
      validationError: string;
      emailError: string;
    };
    step2: {
      procedure: string;
      procedureNotSure: string;
      travelDates: string;
      travelDatesPlaceholder: string;
      goals: string;
      previousProcedures: string;
      budgetRange: string;
      budgetNotSay: string;
      budgetRanges: string[];
      validationError: string;
    };
    step3: {
      photosLabel: string;
      dropzone: string;
      privacyNote: string;
      notes: string;
      removePhoto: string;
    };
    step4: {
      reviewKicker: string;
      labels: { name: string; country: string; contact: string; procedure: string; goals: string };
      consent: string;
      consentError: string;
    };
  };
  /** Keyed by the locale being suggested (never the current one) — only `en`'s copy is actually rendered today; see the comment on the `en.localeBanner` literal. */
  localeBanner: Record<"ru" | "es" | "ar", { question: string; accept: string; dismiss: string }>;
  seo: {
    siteTitle: string;
    siteDescription: string;
    home: { title: string; description: string };
    procedures: { title: string; description: string };
    journey: { title: string; description: string };
    armenia: { title: string; description: string };
    concierge: { title: string; description: string };
    journal: { title: string; description: string };
    consultation: { title: string; description: string };
    faq: { title: string; description: string };
    transformations: { title: string; description: string };
  };
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
