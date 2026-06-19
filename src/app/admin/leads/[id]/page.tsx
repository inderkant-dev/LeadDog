// import Link from "next/link";
// import SendFollowupButton from "@/components/admin/SendFollowupButton";
// import StatusBadge, { PriorityBadge } from "@/components/admin/StatusBadge";
// import { createServerSupabase } from "@/lib/supabase";
// import type { Followup, Lead, LeadReply } from "@/types/lead";

// type PageProps = {
//   params: Promise<{ id: string }> | { id: string };
// };

// async function getLeadDetail(id: string) {
//   const supabase = createServerSupabase();

//   const { data: lead, error: leadError } = await supabase
//     .from("leads")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (leadError) throw leadError;

//   const [{ data: replies }, { data: followups }] = await Promise.all([
//     supabase
//       .from("lead_replies")
//       .select("*")
//       .eq("lead_id", id)
//       .order("created_at", { ascending: false }),
//     supabase
//       .from("followups")
//       .select("*")
//       .eq("lead_id", id)
//       .order("created_at", { ascending: false }),
//   ]);

//   return {
//     lead: lead as Lead,
//     replies: (replies || []) as LeadReply[],
//     followups: (followups || []) as Followup[],
//   };
// }

// export default async function LeadDetailPage({ params }: PageProps) {
//   const { id } = await params;

//   try {
//     const { lead, replies, followups } = await getLeadDetail(id);

//     return (
//       <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           <div className="mb-6">
//             <Link href="/admin" className="text-sm font-black text-slate-500">
//               ← Back to dashboard
//             </Link>
//           </div>

//           <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
//             <section className="space-y-6">
//               <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
//                 <div className="flex flex-col justify-between gap-5 sm:flex-row">
//                   <div>
//                     <h1 className="text-4xl font-black tracking-[-0.04em] text-slate-950">
//                       {lead.name}
//                     </h1>
//                     <p className="mt-2 text-sm font-bold text-slate-500">
//                       {lead.email} · {lead.phone}
//                     </p>
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     <PriorityBadge priority={lead.priority} />
//                     <StatusBadge status={lead.status} />
//                   </div>
//                 </div>

//                 <div className="mt-8 grid gap-4 sm:grid-cols-2">
//                   <Info label="Intent" value={lead.intent} />
//                   <Info
//                     label="Assigned To"
//                     value={lead.assigned_to || "Unassigned"}
//                   />
//                   <Info label="Source" value={lead.source} />
//                   <Info
//                     label="Created"
//                     value={new Date(lead.created_at).toLocaleString()}
//                   />
//                 </div>

//                 <div className="mt-6 rounded-3xl bg-slate-50 p-5">
//                   <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
//                     Requirement
//                   </p>
//                   <p className="mt-3 text-base leading-8 text-slate-700">
//                     {lead.requirement}
//                   </p>
//                 </div>
//               </div>

//               <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
//                 <h2 className="text-2xl font-black text-slate-950">
//                   Customer Replies
//                 </h2>

//                 <div className="mt-5 space-y-3">
//                   {replies.length === 0 ? (
//                     <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-500">
//                       No customer reply yet.
//                     </p>
//                   ) : (
//                     replies.map((reply) => (
//                       <div
//                         key={reply.id}
//                         className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
//                       >
//                         <p className="text-sm leading-7 text-slate-700">
//                           {reply.message}
//                         </p>
//                         <p className="mt-2 text-xs font-bold text-slate-400">
//                           {new Date(reply.created_at).toLocaleString()}
//                         </p>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>

//               <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
//                 <h2 className="text-2xl font-black text-slate-950">
//                   Follow-up History
//                 </h2>

//                 <div className="mt-5 space-y-3">
//                   {followups.length === 0 ? (
//                     <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-500">
//                       No follow-up email recorded yet.
//                     </p>
//                   ) : (
//                     followups.map((followup) => (
//                       <div
//                         key={followup.id}
//                         className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
//                       >
//                         <div className="flex flex-wrap justify-between gap-3">
//                           <p className="font-black text-slate-950">
//                             {followup.subject}
//                           </p>
//                           <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 ring-1 ring-slate-200">
//                             {followup.status}
//                           </span>
//                         </div>
//                         <p className="mt-2 text-sm leading-7 text-slate-600">
//                           {followup.message}
//                         </p>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </section>

//             <aside className="space-y-6">
//               <SendFollowupButton leadId={lead.id} leadName={lead.name} />

//               <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
//                 <h3 className="text-lg font-black text-slate-950">
//                   Customer reply link
//                 </h3>
//                 <p className="mt-2 break-all rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-600">
//                   {`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/follow-up/${lead.follow_up_token}`}
//                 </p>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </main>
//     );
//   } catch (error) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
//         <div className="max-w-xl rounded-[2rem] border border-red-200 bg-white p-8 shadow-sm">
//           <h1 className="text-2xl font-black text-slate-950">
//             Lead could not be loaded
//           </h1>
//           <p className="mt-3 text-sm leading-7 text-slate-600">
//             {error instanceof Error ? error.message : "Unknown error"}
//           </p>
//           <Link
//             href="/admin"
//             className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"
//           >
//             Back to Admin
//           </Link>
//         </div>
//       </main>
//     );
//   }
// }

// function Info({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-4">
//       <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
//         {label}
//       </p>
//       <p className="mt-2 font-bold text-slate-800">{value}</p>
//     </div>
//   );
// }
import Link from "next/link";
import SendFollowupButton from "@/components/admin/SendFollowupButton";
import StatusBadge, { PriorityBadge } from "@/components/admin/StatusBadge";
import { createServerSupabase } from "@/lib/supabase";
import type { Followup, Lead, LeadReply } from "@/types/lead";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

async function getLeadDetail(id: string) {
  const supabase = createServerSupabase();

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (leadError) throw leadError;

  const [{ data: replies }, { data: followups }] = await Promise.all([
    supabase
      .from("lead_replies")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("followups")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false }),
  ]);

  return {
    lead: lead as Lead,
    replies: (replies || []) as LeadReply[],
    followups: (followups || []) as Followup[],
  };
}

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const { lead, replies, followups } = await getLeadDetail(id);

    return (
      <main className="min-h-screen bg-slate-50">
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
            <Link
              href="/admin"
              className="text-sm font-medium text-slate-500 hover:text-slate-950"
            >
              ← Back to dashboard
            </Link>

            <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h1 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950">
                  {lead.name}
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  {lead.email} · {lead.phone}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <PriorityBadge priority={lead.priority} />
                <StatusBadge status={lead.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-6 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8">
          <section className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-950">
                Lead profile
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Info label="Intent" value={lead.intent} />
                <Info label="Owner" value={lead.assigned_to || "Unassigned"} />
                <Info label="Source" value={lead.source} />
                <Info
                  label="Created"
                  value={new Date(lead.created_at).toLocaleString()}
                />
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  Requirement
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {lead.requirement}
                </p>
              </div>
            </div>

            <TimelineBlock
              title="Customer replies"
              emptyText="No customer reply yet."
            >
              {replies.map((reply) => (
                <TimelineItem
                  key={reply.id}
                  title="Customer reply"
                  text={reply.message}
                  date={new Date(reply.created_at).toLocaleString()}
                />
              ))}
            </TimelineBlock>

            <TimelineBlock
              title="Follow-up history"
              emptyText="No follow-up email recorded yet."
            >
              {followups.map((followup) => (
                <TimelineItem
                  key={followup.id}
                  title={followup.subject}
                  text={followup.message}
                  date={followup.status}
                />
              ))}
            </TimelineBlock>
          </section>

          <aside className="space-y-5">
            <SendFollowupButton leadId={lead.id} leadName={lead.name} />

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-950">
                Customer reply link
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Share this if the customer needs to continue the conversation.
              </p>
              <p className="mt-4 break-all rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600">
                {`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/follow-up/${lead.follow_up_token}`}
              </p>
            </div>
          </aside>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-xl rounded-2xl border border-red-200 bg-white p-8">
          <h1 className="text-2xl font-semibold text-slate-950">
            Lead could not be loaded
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <Link
            href="/admin"
            className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white"
          >
            Back to admin
          </Link>
        </div>
      </main>
    );
  }
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

function TimelineBlock({
  title,
  emptyText,
  children,
}: {
  title: string;
  emptyText: string;
  children: React.ReactNode;
}) {
  const hasChildren = Array.isArray(children)
    ? children.length > 0
    : !!children;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <div className="mt-5 space-y-3">
        {hasChildren ? (
          children
        ) : (
          <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            {emptyText}
          </p>
        )}
      </div>
    </div>
  );
}

function TimelineItem({
  title,
  text,
  date,
}: {
  title: string;
  text: string;
  date: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
      <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
    </div>
  );
}
