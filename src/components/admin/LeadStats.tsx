// import type { Lead } from "@/types/lead";
// import { AlertTriangle, Inbox, MailCheck, Users } from "lucide-react";

// export default function LeadStats({ leads }: { leads: Lead[] }) {
//   const stats = [
//     {
//       label: "Total Leads",
//       value: leads.length,
//       icon: Users,
//     },
//     {
//       label: "New Leads",
//       value: leads.filter((lead) => lead.status === "New").length,
//       icon: Inbox,
//     },
//     {
//       label: "High Priority",
//       value: leads.filter((lead) => lead.priority === "High").length,
//       icon: AlertTriangle,
//     },
//     {
//       label: "Customer Replied",
//       value: leads.filter((lead) => lead.status === "Customer Replied").length,
//       icon: MailCheck,
//     },
//   ];

//   return (
//     <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//       {stats.map((stat) => (
//         <div
//           key={stat.label}
//           className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
//         >
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <p className="text-sm font-bold text-slate-500">{stat.label}</p>
//               <p className="mt-3 text-4xl font-black tracking-tight text-slate-950">
//                 {stat.value}
//               </p>
//             </div>
//             <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
//               <stat.icon className="h-5 w-5" />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import type { Lead } from "@/types/lead";
import {
  AlertTriangle,
  Inbox,
  MessageSquareReply,
  UsersRound,
} from "lucide-react";

export default function LeadStats({ leads }: { leads: Lead[] }) {
  const stats = [
    {
      label: "Total leads",
      value: leads.length,
      icon: UsersRound,
    },
    {
      label: "New",
      value: leads.filter((lead) => lead.status === "New").length,
      icon: Inbox,
    },
    {
      label: "High priority",
      value: leads.filter((lead) => lead.priority === "High").length,
      icon: AlertTriangle,
    },
    {
      label: "Replied",
      value: leads.filter((lead) => lead.status === "Customer Replied").length,
      icon: MessageSquareReply,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-slate-950">
                {stat.value}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 ring-1 ring-slate-200">
              <stat.icon className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
