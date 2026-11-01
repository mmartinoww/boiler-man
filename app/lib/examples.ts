/**
 * Real repair examples shown on the city landing pages.
 *
 * HOW TO ADD ONE
 *  1. Put the photo(s) in /public/img/ (webp or jpg, ideally under 250 kB, landscape ~4:3).
 *  2. Add an entry below. Only publish real jobs you have permission to show.
 *  3. The "Примери от ремонти" section appears automatically on the matching city page as soon as
 *     at least one example exists for that city. No code change is needed.
 *
 * Never invent examples, brands, prices or dates: fabricated cases are treated as spam by Google.
 */
export type RepairExample = {
  id: string;
  city: "sofia" | "pazardzhik";
  /** Short headline, e.g. "Смяна на нагревател на Tesy 80 л". */
  title: string;
  brand: string;
  fault: string;
  fix: string;
  /** ISO date of the job, e.g. "2026-10-14". */
  date: string;
  /** Optional price text, only if you want to show it, e.g. "85 евро". */
  price?: string;
  /** Path under /public, e.g. "/img/pazardzhik-tesy-nagrevatel.webp". */
  image: string;
  imageAlt: string;
  /** Optional area of the city (never a street address). */
  area?: string;
};

export const repairExamples: RepairExample[] = [];

export function examplesForCity(city: "sofia" | "pazardzhik"): RepairExample[] {
  return repairExamples.filter((example) => example.city === city);
}
