// "use client";

// import { useState } from "react";
// import type { TeamMember } from "@/types/lead";

// export default function AssignLead({
//   leadId,
//   assignedTo,
//   teamMembers,
//   onAssigned,
// }: {
//   leadId: string;
//   assignedTo?: string | null;
//   teamMembers: TeamMember[];
//   onAssigned?: (value: string) => void;
// }) {
//   const [value, setValue] = useState(assignedTo || "");
//   const [saving, setSaving] = useState(false);

//   async function handleChange(nextValue: string) {
//     setValue(nextValue);
//     setSaving(true);

//     await fetch(`/api/leads/${leadId}/assign`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ assignedTo: nextValue }),
//     });

//     setSaving(false);
//     onAssigned?.(nextValue);
//   }

//   return (
//     <select
//       value={value}
//       onChange={(event) => handleChange(event.target.value)}
//       className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-slate-400"
//     >
//       <option value="">{saving ? "Saving..." : "Unassigned"}</option>
//       {teamMembers.map((member) => (
//         <option key={member.id} value={member.name}>
//           {member.name}
//         </option>
//       ))}
//     </select>
//   );
// }
"use client";

import { useState } from "react";
import type { TeamMember } from "@/types/lead";

export default function AssignLead({
  leadId,
  assignedTo,
  teamMembers,
  onAssigned,
}: {
  leadId: string;
  assignedTo?: string | null;
  teamMembers: TeamMember[];
  onAssigned?: (value: string) => void;
}) {
  const [value, setValue] = useState(assignedTo || "");
  const [saving, setSaving] = useState(false);

  async function handleChange(nextValue: string) {
    setValue(nextValue);
    setSaving(true);

    await fetch(`/api/leads/${leadId}/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assignedTo: nextValue }),
    });

    setSaving(false);
    onAssigned?.(nextValue);
  }

  return (
    <select
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-slate-400"
    >
      <option value="">{saving ? "Saving..." : "Unassigned"}</option>
      {teamMembers.map((member) => (
        <option key={member.id} value={member.name}>
          {member.name}
        </option>
      ))}
    </select>
  );
}
