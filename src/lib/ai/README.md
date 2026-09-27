# AI consultant — future scope

Not implemented as a conversational feature yet. What exists is the data
model and the API boundary so adding it later is additive, not a rewrite.

## What's already here

- `Conversation` / `ConversationMessage` / `IntakeSummary` Prisma models
  (`prisma/schema.prisma`) — a place to store a chat transcript and the
  structured data extracted from it.
- `Lead.aiAssisted` + `Lead.source` — how an AI-originated lead is tagged and
  told apart from a form submission in the CRM and attribution reports.
- `intake-boundary.ts` — the single function a future conversational agent
  calls once it has collected enough information. It reuses
  `createLeadWithCase` from `src/lib/leads.ts`, the same path the public
  consultation form uses, so leads look identical to the coordination team
  regardless of where they came from.

## Hard rules for whatever builds the conversational layer

The AI must **never**: diagnose, promise an outcome, confirm surgical
candidacy, or replace the surgeon's video consultation. Its only job is
structured intake — asking the same questions the form asks, collecting
photos, flagging what's missing — and then handing off to a human. Enforce
this in the system prompt and in a review step before `intake-boundary.ts`
is called, not just in documentation.

## Wiring it up later

1. Build the conversation UI/agent loop against `Conversation` +
   `ConversationMessage`.
2. When the agent believes intake is complete, write an `IntakeSummary` with
   `structuredData` shaped like `ConsultationInput`
   (`src/lib/validation/consultation.ts`) and `missingFields` for anything it
   couldn't collect.
3. Call `submitAiIntake(conversationId, structuredData, photos)`. It
   validates with the same Zod schema the form uses, then creates the
   Lead/MedicalCase with `aiAssisted: true`.
4. If `missingFields` is non-empty, route to a human instead of calling step
   3 — an incomplete case should become a coordinator task, not a bad Lead.
