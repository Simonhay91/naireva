-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COORDINATOR', 'MEDICAL_TEAM', 'SURGEON');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'MEDICAL_REVIEW', 'SURGEON_REVIEWED', 'VIDEO_CALL_PENDING', 'VIDEO_CALL_DONE', 'OFFER_SENT', 'CONFIRMED', 'TRAVEL_PLANNED', 'ARRIVED', 'SURGERY_DONE', 'RECOVERY', 'COMPLETED', 'LOST');

-- CreateEnum
CREATE TYPE "PreferredContact" AS ENUM ('EMAIL', 'PHONE', 'WHATSAPP', 'TELEGRAM');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('NEW', 'MEDICAL_REVIEW', 'SURGEON_REVIEW', 'AWAITING_VIDEO_CALL', 'PLAN_CONFIRMED', 'TRAVEL_PLANNED', 'IN_TREATMENT', 'RECOVERY', 'COMPLETED', 'CLOSED');

-- CreateEnum
CREATE TYPE "PhotoAngle" AS ENUM ('FRONTAL', 'PROFILE_LEFT', 'PROFILE_RIGHT', 'THREE_QUARTER', 'OTHER');

-- CreateEnum
CREATE TYPE "VideoConsultationStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "ConsentStatus" AS ENUM ('PENDING', 'GRANTED', 'REVOKED');

-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('RHINOPLASTY', 'RECOVERY', 'ARMENIA', 'CONSULTATION', 'TRAVEL', 'AESTHETIC_SURGERY');

-- CreateEnum
CREATE TYPE "ConversationStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'HANDED_OFF', 'ABANDONED');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'COORDINATOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "age" INTEGER,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "whatsapp" TEXT,
    "telegram" TEXT,
    "preferredContact" "PreferredContact" NOT NULL DEFAULT 'EMAIL',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "source" TEXT,
    "aiAssisted" BOOLEAN NOT NULL DEFAULT false,
    "referrer" TEXT,
    "landingPage" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "country_ip" TEXT,
    "consentAccepted" BOOLEAN NOT NULL DEFAULT false,
    "assignedToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_cases" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "procedureId" TEXT,
    "surgeonId" TEXT,
    "goals" TEXT NOT NULL,
    "previousProcedures" TEXT,
    "medicalNotes" TEXT,
    "travelWindow" TEXT,
    "budgetRange" TEXT,
    "status" "CaseStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medical_cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_photos" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "angle" "PhotoAngle" NOT NULL DEFAULT 'OTHER',
    "isPrivate" BOOLEAN NOT NULL DEFAULT true,
    "uploadedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "case_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_notes" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "case_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "caseId" TEXT,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_consultations" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "surgeonId" TEXT,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "meetingUrl" TEXT,
    "status" "VideoConsultationStatus" NOT NULL DEFAULT 'SCHEDULED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "video_consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "arrivalDate" TIMESTAMP(3),
    "departureDate" TIMESTAMP(3),
    "flightInfo" TEXT,
    "airportTransfer" BOOLEAN NOT NULL DEFAULT false,
    "clinicTransfer" BOOLEAN NOT NULL DEFAULT false,
    "hotelNotes" TEXT,
    "tourNotes" TEXT,
    "coordinatorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedures" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "heroImage" TEXT,
    "gallery" JSONB NOT NULL DEFAULT '[]',
    "recoveryOverview" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surgeons" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "education" JSONB NOT NULL DEFAULT '[]',
    "experience" TEXT,
    "certifications" JSONB NOT NULL DEFAULT '[]',
    "clinicAffiliation" TEXT,
    "languages" JSONB NOT NULL DEFAULT '[]',
    "instagramUrl" TEXT,
    "heroImage" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surgeons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surgeon_images" (
    "id" TEXT NOT NULL,
    "surgeonId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "surgeon_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surgeon_videos" (
    "id" TEXT NOT NULL,
    "surgeonId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "surgeon_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "before_after_cases" (
    "id" TEXT NOT NULL,
    "procedureId" TEXT,
    "surgeonId" TEXT,
    "patientAgeRange" TEXT,
    "caseNotes" TEXT,
    "beforeImageUrl" TEXT NOT NULL,
    "afterImageUrl" TEXT NOT NULL,
    "angle" "PhotoAngle" NOT NULL DEFAULT 'FRONTAL',
    "consentStatus" "ConsentStatus" NOT NULL DEFAULT 'PENDING',
    "publishStatus" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "before_after_cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "heroImage" TEXT,
    "category" "BlogCategory" NOT NULL,
    "body" TEXT NOT NULL,
    "authorId" TEXT,
    "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',
    "procedureId" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_content" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "title" TEXT,
    "body" JSONB NOT NULL DEFAULT '{}',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "channel" TEXT NOT NULL DEFAULT 'web_widget',
    "locale" TEXT NOT NULL DEFAULT 'en',
    "status" "ConversationStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_messages" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversation_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intake_summaries" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "caseId" TEXT,
    "structuredData" JSONB NOT NULL,
    "missingFields" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "intake_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SurgeonProcedures" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_source_idx" ON "leads"("source");

-- CreateIndex
CREATE INDEX "leads_createdAt_idx" ON "leads"("createdAt");

-- CreateIndex
CREATE INDEX "medical_cases_status_idx" ON "medical_cases"("status");

-- CreateIndex
CREATE INDEX "activity_logs_leadId_idx" ON "activity_logs"("leadId");

-- CreateIndex
CREATE INDEX "activity_logs_caseId_idx" ON "activity_logs"("caseId");

-- CreateIndex
CREATE UNIQUE INDEX "procedures_slug_key" ON "procedures"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "surgeons_slug_key" ON "surgeons"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_status_idx" ON "blog_posts"("status");

-- CreateIndex
CREATE INDEX "blog_posts_category_idx" ON "blog_posts"("category");

-- CreateIndex
CREATE UNIQUE INDEX "page_content_key_locale_key" ON "page_content"("key", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "_SurgeonProcedures_AB_unique" ON "_SurgeonProcedures"("A", "B");

-- CreateIndex
CREATE INDEX "_SurgeonProcedures_B_index" ON "_SurgeonProcedures"("B");

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_cases" ADD CONSTRAINT "medical_cases_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_cases" ADD CONSTRAINT "medical_cases_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "procedures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_cases" ADD CONSTRAINT "medical_cases_surgeonId_fkey" FOREIGN KEY ("surgeonId") REFERENCES "surgeons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_photos" ADD CONSTRAINT "case_photos_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "medical_cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_photos" ADD CONSTRAINT "case_photos_uploadedByUserId_fkey" FOREIGN KEY ("uploadedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_notes" ADD CONSTRAINT "case_notes_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "medical_cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_notes" ADD CONSTRAINT "case_notes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "medical_cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_consultations" ADD CONSTRAINT "video_consultations_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "medical_cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_consultations" ADD CONSTRAINT "video_consultations_surgeonId_fkey" FOREIGN KEY ("surgeonId") REFERENCES "surgeons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "medical_cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surgeon_images" ADD CONSTRAINT "surgeon_images_surgeonId_fkey" FOREIGN KEY ("surgeonId") REFERENCES "surgeons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surgeon_videos" ADD CONSTRAINT "surgeon_videos_surgeonId_fkey" FOREIGN KEY ("surgeonId") REFERENCES "surgeons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "before_after_cases" ADD CONSTRAINT "before_after_cases_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "procedures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "before_after_cases" ADD CONSTRAINT "before_after_cases_surgeonId_fkey" FOREIGN KEY ("surgeonId") REFERENCES "surgeons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "procedures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_messages" ADD CONSTRAINT "conversation_messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intake_summaries" ADD CONSTRAINT "intake_summaries_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intake_summaries" ADD CONSTRAINT "intake_summaries_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "medical_cases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SurgeonProcedures" ADD CONSTRAINT "_SurgeonProcedures_A_fkey" FOREIGN KEY ("A") REFERENCES "procedures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SurgeonProcedures" ADD CONSTRAINT "_SurgeonProcedures_B_fkey" FOREIGN KEY ("B") REFERENCES "surgeons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

