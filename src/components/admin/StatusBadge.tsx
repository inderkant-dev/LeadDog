// import type { LeadPriority, LeadStatus } from "@/types/lead";

// export function PriorityBadge({ priority }: { priority: LeadPriority }) {
//   const styles = {
//     High: "bg-red-50 text-red-700 ring-red-100",
//     Medium: "bg-amber-50 text-amber-700 ring-amber-100",
//     Low: "bg-emerald-50 text-emerald-700 ring-emerald-100",
//   };

//   return (
//     <span
//       className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${styles[priority]}`}
//     >
//       {priority}
//     </span>
//   );
// }

// export default function StatusBadge({ status }: { status: LeadStatus }) {
//   const styles: Record<LeadStatus, string> = {
//     New: "bg-sky-50 text-sky-700 ring-sky-100",
//     Contacted: "bg-indigo-50 text-indigo-700 ring-indigo-100",
//     "Follow-up Scheduled": "bg-amber-50 text-amber-700 ring-amber-100",
//     "Customer Replied": "bg-purple-50 text-purple-700 ring-purple-100",
//     Qualified: "bg-emerald-50 text-emerald-700 ring-emerald-100",
//     Converted: "bg-green-50 text-green-700 ring-green-100",
//     Lost: "bg-slate-100 text-slate-600 ring-slate-200",
//   };

//   return (
//     <span
//       className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${styles[status]}`}
//     >
//       {status}
//     </span>
//   );
// }
import type { LeadPriority, LeadStatus } from "@/types/lead";

export function PriorityBadge({ priority }: { priority: LeadPriority }) {
  const styles = {
    High: "bg-red-50 text-red-700 ring-red-100",
    Medium: "bg-amber-50 text-amber-700 ring-amber-100",
    Low: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

export default function StatusBadge({ status }: { status: LeadStatus }) {
  const styles: Record<LeadStatus, string> = {
    New: "bg-blue-50 text-blue-700 ring-blue-100",
    Contacted: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    "Follow-up Scheduled": "bg-amber-50 text-amber-700 ring-amber-100",
    "Customer Replied": "bg-violet-50 text-violet-700 ring-violet-100",
    Qualified: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Converted: "bg-green-50 text-green-700 ring-green-100",
    Lost: "bg-slate-100 text-slate-600 ring-slate-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${styles[status]}`}
    >
      {status}
    </span>
  );
}
