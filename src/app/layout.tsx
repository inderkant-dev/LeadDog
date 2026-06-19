// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "LeadDog | AI-ready Lead Capture CRM",
//   description:
//     "LeadDog captures customer enquiries, scores urgency, sends follow-ups, and keeps every reply inside one CRM timeline.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import LeadChatWidget from "@/components/landing/LeadChatWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadDog | Lead Capture CRM",
  description:
    "LeadDog captures customer enquiries, scores urgency, sends follow-ups, and keeps every reply inside one CRM timeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <LeadChatWidget />
      </body>
    </html>
  );
}
