// import {
//   BellRing,
//   Bot,
//   Inbox,
//   MailCheck,
//   MousePointerClick,
//   UserRoundCheck,
// } from "lucide-react";

// const features = [
//   {
//     icon: Bot,
//     title: "Chat-style capture",
//     text: "A WhatsApp-like website flow collects the customer requirement without WhatsApp API dependency.",
//   },
//   {
//     icon: Inbox,
//     title: "CRM-ready lead record",
//     text: "Every enquiry becomes a structured lead with name, email, phone, requirement, source, and status.",
//   },
//   {
//     icon: BellRing,
//     title: "Urgency scoring",
//     text: "Keyword-based logic detects high, medium, and low priority without requiring AI setup.",
//   },
//   {
//     icon: MailCheck,
//     title: "Auto acknowledgement",
//     text: "Resend sends an email confirmation as soon as a lead is created.",
//   },
//   {
//     icon: MousePointerClick,
//     title: "Secure reply link",
//     text: "Customer replies come back through a unique follow-up page and attach to the same lead.",
//   },
//   {
//     icon: UserRoundCheck,
//     title: "Admin assignment",
//     text: "Admin can assign leads, change status, send follow-ups, and track activity.",
//   },
// ];

// export default function FeatureCards() {
//   return (
//     <section className="px-4 py-16 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="max-w-2xl">
//           <p className="text-sm font-black uppercase tracking-[0.26em] text-sky-600">
//             System design
//           </p>
//           <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
//             Built like a real lead operating system.
//           </h2>
//           <p className="mt-4 text-lg leading-8 text-slate-600">
//             The UI is simple for customers, but the backend flow is designed as
//             a scalable CRM pipeline.
//           </p>
//         </div>

//         <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map((feature) => (
//             <div
//               key={feature.title}
//               className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
//             >
//               <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:scale-105">
//                 <feature.icon className="h-5 w-5" />
//               </div>
//               <h3 className="text-xl font-black text-slate-950">
//                 {feature.title}
//               </h3>
//               <p className="mt-3 text-sm leading-7 text-slate-600">
//                 {feature.text}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import {
  ArrowRightLeft,
  BellRing,
  Database,
  Link2,
  MailCheck,
  UserRoundCheck,
} from "lucide-react";

const features = [
  {
    icon: ArrowRightLeft,
    title: "Channel-independent capture",
    text: "The current source is a website assistant, but the backend can later accept WhatsApp, email, forms, or call-centre leads.",
  },
  {
    icon: Database,
    title: "Structured lead data",
    text: "Every enquiry is stored with profile details, requirement, source, intent, priority, and status.",
  },
  {
    icon: BellRing,
    title: "Priority detection",
    text: "Urgency and intent are detected through deterministic rules, keeping the MVP fast and dependable.",
  },
  {
    icon: MailCheck,
    title: "Acknowledgement email",
    text: "Resend sends a confirmation email immediately after the lead is captured.",
  },
  {
    icon: Link2,
    title: "Secure follow-up link",
    text: "Customers can reply through a unique link, and the response is attached to the same lead timeline.",
  },
  {
    icon: UserRoundCheck,
    title: "Admin ownership",
    text: "The admin team can assign owners, update status, and send follow-up emails from the CRM.",
  },
];

export default function FeatureCards() {
  return (
    <section id="system" className="px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
              Product architecture
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Minimal interface. Complete operational flow.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              The design keeps customer interaction simple while giving the team
              a structured pipeline for qualification and follow-up.
            </p>
          </div>

          <div id="workflow" className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200">
                  <feature.icon className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
