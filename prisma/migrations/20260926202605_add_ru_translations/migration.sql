-- AlterTable
ALTER TABLE "before_after_cases" ADD COLUMN     "caseNotesRu" TEXT;

-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "bodyRu" TEXT,
ADD COLUMN     "excerptRu" TEXT,
ADD COLUMN     "seoDescriptionRu" TEXT,
ADD COLUMN     "seoTitleRu" TEXT,
ADD COLUMN     "titleRu" TEXT;

-- AlterTable
ALTER TABLE "faqs" ADD COLUMN     "answerRu" TEXT,
ADD COLUMN     "questionRu" TEXT;

-- AlterTable
ALTER TABLE "procedures" ADD COLUMN     "contentRu" TEXT,
ADD COLUMN     "recoveryOverviewRu" TEXT,
ADD COLUMN     "seoDescriptionRu" TEXT,
ADD COLUMN     "seoTitleRu" TEXT,
ADD COLUMN     "shortDescriptionRu" TEXT,
ADD COLUMN     "titleRu" TEXT;

-- AlterTable
ALTER TABLE "surgeons" ADD COLUMN     "biographyRu" TEXT,
ADD COLUMN     "clinicAffiliationRu" TEXT,
ADD COLUMN     "experienceRu" TEXT,
ADD COLUMN     "seoDescriptionRu" TEXT,
ADD COLUMN     "seoTitleRu" TEXT,
ADD COLUMN     "specialtyRu" TEXT;
