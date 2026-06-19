// import Link from "next/link";
// import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";

// export default function Hero() {
//   return (
//     <section className="relative overflow-hidden px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-4">
//         <Link href="/" className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/20">
//             <span className="text-lg font-black">LD</span>
//           </div>
//           <div>
//             <p className="text-lg font-black tracking-tight text-slate-950">
//               LeadDog
//             </p>
//             <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
//               Lead Intelligence CRM
//             </p>
//           </div>
//         </Link>

//         <Link
//           href="/admin"
//           className="hidden rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-white sm:inline-flex"
//         >
//           Open Admin
//         </Link>
//       </div>

//       <div className="mx-auto grid max-w-7xl items-center gap-12 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16">
//         <div>
//           <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700">
//             <Sparkles className="h-4 w-4" />
//             Website chatbot + CRM + email follow-up
//           </div>

//           <h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
//             Capture leads before they go cold.
//           </h1>

//           <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
//             LeadDog turns website enquiries into structured CRM leads, scores
//             urgency, sends email acknowledgements, and keeps customer replies
//             inside one follow-up timeline.
//           </p>

//           <div className="mt-9 flex flex-col gap-3 sm:flex-row">
//             <a
//               href="#lead-capture"
//               className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
//             >
//               Capture a Lead
//               <ArrowRight className="h-4 w-4" />
//             </a>

//             <Link
//               href="/admin"
//               className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
//             >
//               View Dashboard
//             </Link>
//           </div>

//           <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
//             {[
//               {
//                 icon: ShieldCheck,
//                 label: "Structured CRM",
//                 text: "Every enquiry saved cleanly.",
//               },
//               {
//                 icon: Zap,
//                 label: "Priority Scoring",
//                 text: "Urgent leads surface first.",
//               },
//               {
//                 icon: Sparkles,
//                 label: "Follow-up Link",
//                 text: "Replies return to the CRM.",
//               },
//             ].map((item) => (
//               <div
//                 key={item.label}
//                 className="rounded-3xl border border-slate-200 bg-white/75 p-4 shadow-sm"
//               >
//                 <item.icon className="mb-3 h-5 w-5 text-slate-950" />
//                 <p className="font-black text-slate-950">{item.label}</p>
//                 <p className="mt-1 text-sm leading-6 text-slate-500">
//                   {item.text}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="relative">
//           <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-sky-300/30 blur-3xl" />
//           <div className="absolute -bottom-8 -right-8 h-44 w-44 rounded-full bg-indigo-300/30 blur-3xl" />

//           <div className="dark-glass relative overflow-hidden rounded-[2rem] p-5 text-white">
//             <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
//               <div className="mb-8 flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-bold text-slate-300">
//                     Live Pipeline
//                   </p>
//                   <p className="text-3xl font-black tracking-tight">
//                     128 leads
//                   </p>
//                 </div>
//                 <div className="rounded-2xl bg-emerald-400/15 px-4 py-2 text-sm font-black text-emerald-300">
//                   +24% this week
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 {[
//                   ["Urgent hospital support", "High", "New"],
//                   ["Pricing enquiry", "Medium", "Contacted"],
//                   ["Consultation request", "Medium", "Follow-up"],
//                   ["General support", "Low", "Assigned"],
//                 ].map(([title, priority, status]) => (
//                   <div
//                     key={title}
//                     className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
//                   >
//                     <div className="flex items-center justify-between gap-3">
//                       <p className="font-bold">{title}</p>
//                       <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
//                         {priority}
//                       </span>
//                     </div>
//                     <p className="mt-2 text-sm text-slate-400">{status}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  MailCheck,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

const metrics = [
  { label: "Lead source", value: "Website assistant" },
  { label: "Routing", value: "Admin assignment" },
  { label: "Follow-up", value: "Email + secure link" },
];

export default function Hero() {
  return (
    <section className="relative px-5 pb-16 pt-5 sm:px-6 lg:px-8">
      <div className="subtle-grid absolute inset-0 -z-10 opacity-60" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
            LD
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-950">LeadDog</p>
            <p className="text-xs text-slate-500">Lead operations platform</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#workflow" className="hover:text-slate-950">
            Workflow
          </a>
          <a href="#system" className="hover:text-slate-950">
            System
          </a>
          <Link href="/admin" className="hover:text-slate-950">
            Admin
          </Link>
        </div>

        <Link
          href="/admin"
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Open CRM
        </Link>
      </nav>

      <div className="mx-auto grid max-w-7xl items-center gap-12 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:pt-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live lead capture system
          </div>

          <h1 className="mt-7 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
            A cleaner way to capture and follow up with customer enquiries.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            LeadDog converts website conversations into structured CRM records,
            detects urgency, sends acknowledgement emails, and gives every lead
            a secure follow-up path.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#assistant-note"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Use floating assistant
              <ArrowRight className="h-4 w-4" />
            </a>

            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400"
            >
              View admin dashboard
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-slate-200 bg-white/80 p-4"
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  {metric.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="enterprise-card rounded-[2rem] p-3">
          <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Lead pipeline
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Captured from website assistant
                </p>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Active
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                {
                  title: "Urgent admission support",
                  meta: "Healthcare / Patient Support",
                  status: "High priority",
                  icon: ShieldCheck,
                },
                {
                  title: "Pricing enquiry",
                  meta: "Quotation request",
                  status: "Medium priority",
                  icon: MailCheck,
                },
                {
                  title: "Product demo request",
                  meta: "Appointment / Consultation",
                  status: "Assigned",
                  icon: Layers3,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 ring-1 ring-slate-200">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-950">
                          {item.title}
                        </p>
                        <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              id="assistant-note"
              className="mt-5 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <MessageSquareText className="h-4 w-4 text-slate-500" />
                <p className="text-sm font-medium text-slate-700">
                  Click the assistant in the bottom-right corner to capture a
                  live lead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
