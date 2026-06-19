import type { LeadPriority } from "@/types/lead";

const highPriorityWords = [
  "urgent",
  "immediate",
  "asap",
  "emergency",
  "today",
  "critical",
  "admission",
  "call me now",
  "very important",
  "serious",
];

const mediumPriorityWords = [
  "price",
  "cost",
  "quotation",
  "quote",
  "appointment",
  "consultation",
  "details",
  "tomorrow",
  "callback",
  "call back",
];

export function detectPriority(requirement: string): LeadPriority {
  const text = requirement.toLowerCase();

  if (highPriorityWords.some((word) => text.includes(word))) {
    return "High";
  }

  if (mediumPriorityWords.some((word) => text.includes(word))) {
    return "Medium";
  }

  return "Low";
}

export function detectIntent(requirement: string): string {
  const text = requirement.toLowerCase();

  if (
    text.includes("hospital") ||
    text.includes("doctor") ||
    text.includes("patient") ||
    text.includes("admission") ||
    text.includes("treatment") ||
    text.includes("clinic")
  ) {
    return "Healthcare / Patient Support";
  }

  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("quote") ||
    text.includes("quotation") ||
    text.includes("budget")
  ) {
    return "Pricing Enquiry";
  }

  if (
    text.includes("appointment") ||
    text.includes("meeting") ||
    text.includes("demo") ||
    text.includes("consultation")
  ) {
    return "Appointment / Consultation";
  }

  if (
    text.includes("support") ||
    text.includes("help") ||
    text.includes("issue") ||
    text.includes("problem")
  ) {
    return "Support Request";
  }

  return "General Enquiry";
}
