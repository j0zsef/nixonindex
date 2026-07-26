import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseFiles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-files' }),
  schema: z.object({
    caseNumber: z.string(), // e.g. "001"
    title: z.string(), // "How many Nixons is the Qatari Air Force One?"
    subject: z.string(), // short label, e.g. "The Qatari Jet"
    ruled: z.coerce.date(),
    summary: z.string(), // one-paragraph teaser for cards + meta description
    scores: z.object({
      f1: z.number().min(0).max(10), // Benefit Magnitude
      f2: z.number().min(0).max(10), // Personal Accrual
      f3: z.number().min(0).max(10), // Source Conflict
      f4: z.number().min(0).max(10), // Process Integrity
      f5: z.number().min(0).max(10), // Concealment
    }),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })),
  }),
});

export const collections = { 'case-files': caseFiles };
