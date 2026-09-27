import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

const isProd = process.env.NODE_ENV === "production";

if (isProd && (!process.env.SEED_ADMIN_EMAIL || !process.env.SEED_ADMIN_PASSWORD)) {
  throw new Error(
    "Refusing to seed production without SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD set to strong, unique values. Set both env vars and re-run."
  );
}

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "simonhayrapetyan91@gmail.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

async function main() {
  // --- Team ------------------------------------------------------------
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await db.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      name: "NAIREVA Admin",
      email: ADMIN_EMAIL,
      passwordHash,
      role: "ADMIN"
    }
  });
  console.log(`Seeded admin user: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD} (change this after first login)`);

  if (!isProd) {
    const coordinatorPasswordHash = await bcrypt.hash("ChangeMe123!", 10);
    await db.user.upsert({
      where: { email: "coordinator@naireva.com" },
      update: {},
      create: {
        name: "Demo Coordinator",
        email: "coordinator@naireva.com",
        passwordHash: coordinatorPasswordHash,
        role: "COORDINATOR"
      }
    });
  }

  // --- Surgeon -----------------------------------------------------------
  const surgeonData = {
    name: "Dr. Hayk Bakhshyan",
    specialty: "Plastic & Maxillofacial Surgeon",
    specialtyRu: "Пластический и челюстно-лицевой хирург",
    biography:
      "Dr. Hayk Bakhshyan practices plastic and maxillofacial surgery in Yerevan, with 15 years of experience and a focus on aesthetic rhinoplasty.\n\n" +
      "[PLACEHOLDER — remaining biography details still need verification. Do not publish further claims about procedure counts or outcomes without medical/legal sign-off.]",
    biographyRu:
      "Д-р Айк Бахшян практикует пластическую и челюстно-лицевую хирургию в Ереване, имеет 15 лет опыта и специализируется на эстетической ринопластике.\n\n" +
      "[ЗАПОЛНИТЕ — остальные детали биографии всё ещё требуют проверки. Не публикуйте данные о количестве операций или результатах без медицинского и юридического согласования.]",
    education: ["[PLACEHOLDER — verified medical degree and institution]"],
    experience:
      "[PLACEHOLDER — approach and philosophy, to be provided by the surgeon and reviewed before publishing.]",
    experienceRu:
      "[ЗАПОЛНИТЕ — подход и философия хирурга, должны быть предоставлены и проверены перед публикацией.]",
    certifications: ["[PLACEHOLDER — verified board certifications]"],
    clinicAffiliation: "Beglaryan Medical Centre",
    clinicAffiliationRu: "Медицинский центр Beglaryan",
    languages: ["Armenian", "Russian", "English"],
    instagramUrl: null,
    heroImage: "/images/surgeon-or-2.png",
    isActive: true,
    seoTitle: "Dr. Hayk Bakhshyan — Plastic & Maxillofacial Surgeon, Yerevan",
    seoTitleRu: "Д-р Айк Бахшян — пластический и челюстно-лицевой хирург, Ереван",
    seoDescription:
      "Dr. Hayk Bakhshyan, plastic and maxillofacial surgeon in Yerevan, reviews every case personally before a private video consultation.",
    seoDescriptionRu:
      "Д-р Айк Бахшян, пластический и челюстно-лицевой хирург в Ереване, лично рассматривает каждый случай перед частной видеоконсультацией."
  };

  const surgeon = await db.surgeon.upsert({
    where: { slug: "dr-hayk-bakhshyan" },
    update: surgeonData,
    create: { slug: "dr-hayk-bakhshyan", ...surgeonData }
  });

  // Gallery images — real photos from the clinic's own social media (cropped to
  // remove Instagram UI chrome). Kept to clinic/team/surgeon-at-work context only;
  // the individual patient photos in that same batch were deliberately excluded —
  // they aren't consented, matched before/after pairs, so they don't belong in a
  // public gallery. Re-seeding replaces this set so it stays idempotent.
  await db.surgeonImage.deleteMany({ where: { surgeonId: surgeon.id } });
  await db.surgeonImage.createMany({
    data: [
      { surgeonId: surgeon.id, url: "/images/surgeon-or-2.png", caption: "In surgery", sortOrder: 0 },
      { surgeonId: surgeon.id, url: "/images/surgeon-or-3.png", caption: "Surgical team", sortOrder: 1 },
      { surgeonId: surgeon.id, url: "/images/surgeon-or-4.png", caption: "In surgery", sortOrder: 2 },
      { surgeonId: surgeon.id, url: "/images/surgeon-candid.png", caption: "Dr. Hayk Bakhshyan", sortOrder: 3 },
      { surgeonId: surgeon.id, url: "/images/clinic-reception.png", caption: "At the reception", sortOrder: 5 },
      { surgeonId: surgeon.id, url: "/images/clinic-hallway.png", caption: "Clinic hallway", sortOrder: 6 },
      { surgeonId: surgeon.id, url: "/images/clinic-team-1.png", caption: "Clinic team", sortOrder: 7 },
      { surgeonId: surgeon.id, url: "/images/clinic-team-2.png", caption: "Clinic team", sortOrder: 8 }
    ]
  });

  // --- Procedure: Rhinoplasty ---------------------------------------------
  const rhinoplastyData = {
    title: "Rhinoplasty",
    titleRu: "Ринопластика",
    shortDescription:
      "Primary aesthetic rhinoplasty with direct surgeon review, video consultation and coordinated travel.",
    shortDescriptionRu:
      "Первичная эстетическая ринопластика с прямым рассмотрением случая хирургом, видеоконсультацией и организованным путешествием.",
    content:
      "## Before you travel\n\n" +
      "We collect the information needed for the surgical team to understand your goals and review your case. If the case is appropriate to proceed, a video consultation is arranged with the surgeon.\n\n" +
      "## In Armenia\n\n" +
      "Your medical plan determines the schedule. NAIREVA coordinates arrival and clinic logistics while keeping one personal point of contact throughout the stay.\n\n" +
      "## After surgery\n\n" +
      "Recovery instructions come from the surgeon. Optional activities and tourism are considered only when medically appropriate.",
    contentRu:
      "## До поездки\n\n" +
      "Мы собираем информацию, необходимую хирургической команде для понимания ваших целей и рассмотрения случая. Если случай подходит для продолжения, назначается видеоконсультация с хирургом.\n\n" +
      "## В Армении\n\n" +
      "Ваш медицинский план определяет расписание. NAIREVA координирует приезд и логистику клиники, сохраняя один личный контакт на протяжении всего пребывания.\n\n" +
      "## После операции\n\n" +
      "Инструкции по восстановлению даёт хирург. Дополнительные активности и туризм рассматриваются только когда это медицински уместно.",
    heroImage: "/images/after.png",
    gallery: ["/images/before.png", "/images/after.png"],
    recoveryOverview:
      "Recovery timing is set by the surgeon and varies by individual. As a general pattern, most patients plan for a longer initial stay in Yerevan before flying home, with a final in-person check before departure — always confirmed by your surgeon, never assumed.",
    recoveryOverviewRu:
      "Сроки восстановления определяет хирург, и они индивидуальны. Как правило, большинство пациентов планируют более длительное первичное пребывание в Ереване перед вылетом домой, с финальным очным осмотром перед отъездом — это всегда подтверждает хирург, а не предполагается заранее.",
    isActive: true,
    seoTitle: "Rhinoplasty in Armenia — Private Surgical Journey | NAIREVA",
    seoTitleRu: "Ринопластика в Армении — частное хирургическое путешествие | NAIREVA",
    seoDescription:
      "Aesthetic rhinoplasty in Yerevan with direct surgeon video consultation, private case review and a fully coordinated journey. No public pricing.",
    seoDescriptionRu:
      "Эстетическая ринопластика в Ереване с прямой видеоконсультацией хирурга, частным рассмотрением случая и полностью организованным путешествием. Без публичных цен."
  };

  const rhinoplasty = await db.procedure.upsert({
    where: { slug: "rhinoplasty" },
    update: { ...rhinoplastyData, surgeons: { connect: [{ id: surgeon.id }] } },
    create: {
      slug: "rhinoplasty",
      ...rhinoplastyData,
      surgeons: { connect: [{ id: surgeon.id }] }
    }
  });

  const procedureFaqs = [
    {
      question: "Do you publish pricing for rhinoplasty?",
      questionRu: "Публикуете ли вы цены на ринопластику?",
      answer:
        "No. NAIREVA does not publish pricing anywhere on this site. Cost is discussed only after your case has been reviewed and you have had a consultation with the surgeon.",
      answerRu:
        "Нет. NAIREVA не публикует цены нигде на этом сайте. Стоимость обсуждается только после рассмотрения вашего случая и консультации с хирургом.",
      category: "pricing",
      sortOrder: 0
    },
    {
      question: "Will I speak with the surgeon before travelling?",
      questionRu: "Смогу ли я поговорить с хирургом перед поездкой?",
      answer:
        "Yes. A video consultation with the surgeon is arranged after medical review and always takes place before any final confirmation or travel booking.",
      answerRu:
        "Да. Видеоконсультация с хирургом назначается после медицинского рассмотрения и всегда происходит до окончательного подтверждения или бронирования поездки.",
      category: "consultation",
      sortOrder: 1
    },
    {
      question: "How long should I plan to stay in Armenia?",
      questionRu: "Сколько времени стоит планировать на пребывание в Армении?",
      answer:
        "Your surgeon sets the exact recovery and follow-up schedule for your case. We coordinate travel dates around that plan once it is confirmed.",
      answerRu:
        "Точный график восстановления и наблюдения для вашего случая устанавливает хирург. Мы согласуем даты поездки с этим планом после его подтверждения.",
      category: "travel",
      sortOrder: 2
    }
  ];

  for (const faq of procedureFaqs) {
    const existing = await db.fAQ.findFirst({ where: { procedureId: rhinoplasty.id, question: faq.question } });
    if (existing) {
      await db.fAQ.update({ where: { id: existing.id }, data: faq });
    } else {
      await db.fAQ.create({ data: { ...faq, procedureId: rhinoplasty.id } });
    }
  }

  // --- Before / After ------------------------------------------------------
  const beforeAfterCases = [
    {
      procedureId: rhinoplasty.id,
      surgeonId: surgeon.id,
      patientAgeRange: "25–34",
      caseNotes: "Primary aesthetic rhinoplasty. Shared with patient consent.",
      caseNotesRu: "Первичная эстетическая ринопластика. Опубликовано с согласия пациента.",
      beforeImageUrl: "/images/before.png",
      afterImageUrl: "/images/after.png",
      angle: "FRONTAL" as const,
      consentStatus: "GRANTED" as const,
      publishStatus: "PUBLISHED" as const
    },
    {
      procedureId: rhinoplasty.id,
      surgeonId: surgeon.id,
      patientAgeRange: "18–24",
      caseNotes: "Primary aesthetic rhinoplasty, profile view. Shared with patient consent.",
      caseNotesRu: "Первичная эстетическая ринопластика, вид в профиль. Опубликовано с согласия пациента.",
      beforeImageUrl: "/images/bef1.jpg",
      afterImageUrl: "/images/af1.jpg",
      angle: "PROFILE_LEFT" as const,
      consentStatus: "GRANTED" as const,
      publishStatus: "PUBLISHED" as const
    },
    {
      procedureId: rhinoplasty.id,
      surgeonId: surgeon.id,
      patientAgeRange: "18–24",
      caseNotes: "Primary aesthetic rhinoplasty, profile view. Shared with patient consent.",
      caseNotesRu: "Первичная эстетическая ринопластика, вид в профиль. Опубликовано с согласия пациента.",
      beforeImageUrl: "/images/bef3.jpg",
      afterImageUrl: "/images/af3.jpg",
      angle: "PROFILE_LEFT" as const,
      consentStatus: "GRANTED" as const,
      publishStatus: "PUBLISHED" as const
    },
    {
      procedureId: rhinoplasty.id,
      surgeonId: surgeon.id,
      patientAgeRange: "25–34",
      caseNotes: "Primary aesthetic rhinoplasty, profile view. Shared with patient consent.",
      caseNotesRu: "Первичная эстетическая ринопластика, вид в профиль. Опубликовано с согласия пациента.",
      beforeImageUrl: "/images/bef4.jpg",
      afterImageUrl: "/images/af4.jpg",
      angle: "PROFILE_LEFT" as const,
      consentStatus: "GRANTED" as const,
      publishStatus: "PUBLISHED" as const
    }
  ];

  for (const caseData of beforeAfterCases) {
    const existingCase = await db.beforeAfterCase.findFirst({ where: { beforeImageUrl: caseData.beforeImageUrl } });
    if (existingCase) {
      await db.beforeAfterCase.update({ where: { id: existingCase.id }, data: caseData });
    } else {
      await db.beforeAfterCase.create({ data: caseData });
    }
  }

  // --- General FAQs --------------------------------------------------------
  const generalFaqs = [
    {
      question: "Does NAIREVA perform the surgery?",
      questionRu: "NAIREVA сама проводит операции?",
      answer:
        "No. NAIREVA is a private concierge and coordination service. Surgery is performed by the partner surgeon and clinic, who make all medical decisions.",
      answerRu:
        "Нет. NAIREVA — это частный консьерж-сервис и координация. Операции проводит партнёрский хирург и клиника, которые принимают все медицинские решения.",
      category: "general",
      sortOrder: 0
    },
    {
      question: "How do you contact me after I submit a request?",
      questionRu: "Как вы свяжетесь со мной после отправки заявки?",
      answer: "Through whichever channel you choose in the form — WhatsApp, Telegram, phone or email.",
      answerRu: "Через тот канал, который вы укажете в форме — WhatsApp, Telegram, телефон или email.",
      category: "general",
      sortOrder: 1
    },
    {
      question: "Is my information kept private?",
      questionRu: "Моя информация остаётся конфиденциальной?",
      answer:
        "Yes. Case photos and medical information are stored privately and are only ever visible to the coordinating team and reviewing surgeon.",
      answerRu:
        "Да. Фотографии и медицинская информация хранятся конфиденциально и доступны только координирующей команде и рассматривающему хирургу.",
      category: "privacy",
      sortOrder: 2
    }
  ];

  for (const faq of generalFaqs) {
    const existing = await db.fAQ.findFirst({ where: { procedureId: null, question: faq.question } });
    if (existing) {
      await db.fAQ.update({ where: { id: existing.id }, data: faq });
    } else {
      await db.fAQ.create({ data: faq });
    }
  }

  // --- Journal ---------------------------------------------------------
  const admin = await db.user.findUniqueOrThrow({ where: { email: ADMIN_EMAIL } });

  const posts = [
    {
      slug: "rhinoplasty-journey-in-armenia",
      title: "What an international rhinoplasty journey in Armenia actually looks like",
      titleRu: "Как на самом деле выглядит международное путешествие за ринопластикой в Армению",
      excerpt: "From first review to return home — and why the goal is to remove logistical stress around a medical decision, not to make surgery feel like tourism.",
      excerptRu: "От первого рассмотрения случая до возвращения домой — и почему цель в том, чтобы снять логистический стресс вокруг медицинского решения, а не превратить операцию в туризм.",
      category: "RHINOPLASTY" as const,
      body:
        "The goal is not to make surgery feel like tourism. It is to remove avoidable logistical stress around a medical decision.\n\n" +
        "## 1. Case review first\n\n" +
        "Before travel is discussed, the medical team needs enough information to understand whether the case can proceed to consultation.\n\n" +
        "## 2. Speak with the surgeon\n\n" +
        "A video consultation gives the patient a chance to discuss goals, limitations and the proposed plan directly with the surgeon.\n\n" +
        "## 3. Build travel around the medical plan\n\n" +
        "Flights, transfers and optional activities should fit the surgeon's schedule and recovery instructions.",
      bodyRu:
        "Цель не в том, чтобы превратить операцию в туризм. Цель — снять лишний логистический стресс вокруг медицинского решения.\n\n" +
        "## 1. Сначала рассмотрение случая\n\n" +
        "Прежде чем обсуждать поездку, медицинской команде нужно достаточно информации, чтобы понять, может ли случай перейти к консультации.\n\n" +
        "## 2. Разговор с хирургом\n\n" +
        "Видеоконсультация даёт пациенту возможность обсудить цели, ограничения и предложенный план напрямую с хирургом.\n\n" +
        "## 3. Поездка выстраивается вокруг медицинского плана\n\n" +
        "Перелёты, трансферы и дополнительные активности должны соответствовать расписанию хирурга и инструкциям по восстановлению."
    },
    {
      slug: "why-a-video-consultation-before-confirmation",
      title: "Why we arrange a surgeon video call before confirmation",
      titleRu: "Почему мы организуем видеозвонок с хирургом перед подтверждением",
      excerpt: "Luxury service should not replace medical clarity. What to prepare, and what the call should clarify, before a trip is confirmed.",
      excerptRu: "Премиальный сервис не должен заменять медицинскую ясность. Что подготовить и что должен прояснить звонок перед подтверждением поездки.",
      category: "CONSULTATION" as const,
      body:
        "Luxury service should not replace medical clarity. The call exists so the patient and surgeon can speak directly before a trip is confirmed.\n\n" +
        "## What to prepare\n\n" +
        "Your goals, relevant history, previous procedures and the questions you want answered.\n\n" +
        "## What it should clarify\n\n" +
        "The proposed approach, realistic expectations, recovery planning and whether the case is appropriate to proceed.",
      bodyRu:
        "Премиальный сервис не должен заменять медицинскую ясность. Звонок существует для того, чтобы пациент и хирург могли поговорить напрямую перед подтверждением поездки.\n\n" +
        "## Что подготовить\n\n" +
        "Ваши цели, соответствующий анамнез, предыдущие процедуры и вопросы, на которые вы хотите получить ответы.\n\n" +
        "## Что должно проясниться\n\n" +
        "Предложенный подход, реалистичные ожидания, план восстановления и подходит ли случай для продолжения."
    },
    {
      slug: "recovery-in-yerevan",
      title: "Recovery in Yerevan: plan less, leave room for the medical schedule",
      titleRu: "Восстановление в Ереване: планируйте меньше, оставляйте место медицинскому графику",
      excerpt: "The Armenia experience should adapt to recovery, not compete with it.",
      excerptRu: "Впечатления от Армении должны подстраиваться под восстановление, а не конкурировать с ним.",
      category: "RECOVERY" as const,
      body:
        "The Armenia experience should adapt to recovery, not compete with it.\n\n" +
        "## Keep the early days simple\n\n" +
        "Rest, follow-up and the surgeon's instructions come first.\n\n" +
        "## Add experiences only when appropriate\n\n" +
        "Dining, sightseeing and longer excursions should only be considered if the surgeon confirms that your recovery stage allows them.",
      bodyRu:
        "Впечатления от Армении должны подстраиваться под восстановление, а не конкурировать с ним.\n\n" +
        "## Первые дни держите простыми\n\n" +
        "На первом месте — отдых, наблюдение и инструкции хирурга.\n\n" +
        "## Добавляйте впечатления только когда это уместно\n\n" +
        "Ужины, экскурсии и более длительные поездки стоит рассматривать, только если хирург подтвердит, что этап восстановления это позволяет."
    }
  ];

  for (const post of posts) {
    await db.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: { ...post, authorId: admin.id, status: "PUBLISHED", publishedAt: new Date() }
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
