// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import type { Lead, LeadStatus, TeamMember } from "@/types/lead";
// import AssignLead from "./AssignLead";
// import StatusBadge, { PriorityBadge } from "./StatusBadge";

// const statuses: LeadStatus[] = [
//   "New",
//   "Contacted",
//   "Follow-up Scheduled",
//   "Customer Replied",
//   "Qualified",
//   "Converted",
//   "Lost",
// ];

// export default function LeadTable({
//   leads,
//   teamMembers,
// }: {
//   leads: Lead[];
//   teamMembers: TeamMember[];
// }) {
//   const [rows, setRows] = useState(leads);

//   async function updateStatus(id: string, status: LeadStatus) {
//     setRows((prev) =>
//       prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
//     );

//     await fetch(`/api/leads/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status }),
//     });
//   }

//   return (
//     <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
//       <div className="border-b border-slate-200 p-5">
//         <h2 className="text-xl font-black text-slate-950">Lead Pipeline</h2>
//         <p className="mt-1 text-sm text-slate-500">
//           Assign, qualify, and follow up with captured leads.
//         </p>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-[1100px] w-full text-left">
//           <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
//             <tr>
//               <th className="px-5 py-4">Lead</th>
//               <th className="px-5 py-4">Requirement</th>
//               <th className="px-5 py-4">Priority</th>
//               <th className="px-5 py-4">Status</th>
//               <th className="px-5 py-4">Assigned</th>
//               <th className="px-5 py-4">Created</th>
//               <th className="px-5 py-4">Action</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-slate-100">
//             {rows.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={7}
//                   className="px-5 py-12 text-center text-sm font-bold text-slate-500"
//                 >
//                   No leads yet. Capture a lead from the homepage.
//                 </td>
//               </tr>
//             ) : (
//               rows.map((lead) => (
//                 <tr key={lead.id} className="align-top">
//                   <td className="px-5 py-4">
//                     <p className="font-black text-slate-950">{lead.name}</p>
//                     <p className="mt-1 text-sm text-slate-500">{lead.email}</p>
//                     <p className="text-sm text-slate-500">{lead.phone}</p>
//                   </td>

//                   <td className="max-w-sm px-5 py-4">
//                     <p className="line-clamp-2 text-sm font-semibold leading-6 text-slate-700">
//                       {lead.requirement}
//                     </p>
//                     <p className="mt-2 text-xs font-bold text-slate-400">
//                       {lead.intent}
//                     </p>
//                   </td>

//                   <td className="px-5 py-4">
//                     <PriorityBadge priority={lead.priority} />
//                   </td>

//                   <td className="px-5 py-4">
//                     <div className="space-y-2">
//                       <StatusBadge status={lead.status} />
//                       <select
//                         value={lead.status}
//                         onChange={(event) =>
//                           updateStatus(
//                             lead.id,
//                             event.target.value as LeadStatus,
//                           )
//                         }
//                         className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-slate-400"
//                       >
//                         {statuses.map((status) => (
//                           <option key={status} value={status}>
//                             {status}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </td>

//                   <td className="px-5 py-4">
//                     <AssignLead
//                       leadId={lead.id}
//                       assignedTo={lead.assigned_to}
//                       teamMembers={teamMembers}
//                       onAssigned={(assignedTo) =>
//                         setRows((prev) =>
//                           prev.map((row) =>
//                             row.id === lead.id
//                               ? { ...row, assigned_to: assignedTo }
//                               : row,
//                           ),
//                         )
//                       }
//                     />
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-500">
//                     {new Date(lead.created_at).toLocaleString()}
//                   </td>

//                   <td className="px-5 py-4">
//                     <Link
//                       href={`/admin/leads/${lead.id}`}
//                       className="inline-flex rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-white transition hover:bg-slate-800"
//                     >
//                       Open
//                     </Link>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { useState } from "react";
import type { Lead, LeadStatus, TeamMember } from "@/types/lead";
import AssignLead from "./AssignLead";
import StatusBadge, { PriorityBadge } from "./StatusBadge";

const statuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Follow-up Scheduled",
  "Customer Replied",
  "Qualified",
  "Converted",
  "Lost",
];

export default function LeadTable({
  leads,
  teamMembers,
}: {
  leads: Lead[];
  teamMembers: TeamMember[];
}) {
  const [rows, setRows] = useState(leads);

  async function updateStatus(id: string, status: LeadStatus) {
    setRows((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );

    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            Lead pipeline
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Assign ownership, update stage, and open lead records.
          </p>
        </div>

        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
          {rows.length} records
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1120px] w-full text-left">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-5 py-3">Lead</th>
              <th className="px-5 py-3">Requirement</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Owner</th>
              <th className="px-5 py-3">Created</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-14 text-center text-sm font-medium text-slate-500"
                >
                  No leads yet. Capture a lead from the public assistant.
                </td>
              </tr>
            ) : (
              rows.map((lead) => (
                <tr
                  key={lead.id}
                  className="align-top transition hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-950">
                      {lead.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{lead.email}</p>
                    <p className="text-xs text-slate-500">{lead.phone}</p>
                  </td>

                  <td className="max-w-sm px-5 py-4">
                    <p className="line-clamp-2 text-sm leading-6 text-slate-700">
                      {lead.requirement}
                    </p>
                    <p className="mt-2 text-xs font-medium text-slate-400">
                      {lead.intent}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <PriorityBadge priority={lead.priority} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="space-y-2">
                      <StatusBadge status={lead.status} />
                      <select
                        value={lead.status}
                        onChange={(event) =>
                          updateStatus(
                            lead.id,
                            event.target.value as LeadStatus,
                          )
                        }
                        className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-slate-400"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <AssignLead
                      leadId={lead.id}
                      assignedTo={lead.assigned_to}
                      teamMembers={teamMembers}
                      onAssigned={(assignedTo) =>
                        setRows((prev) =>
                          prev.map((row) =>
                            row.id === lead.id
                              ? { ...row, assigned_to: assignedTo }
                              : row,
                          ),
                        )
                      }
                    />
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-500">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                    >
                      Open record
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
