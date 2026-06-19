// import Link from "next/link";
// import CustomerReplyForm from "@/components/followup/CustomerReplyForm";
// import { createServerSupabase } from "@/lib/supabase";
// import type { Lead } from "@/types/lead";

// type PageProps = {
//   params: Promise<{ token: string }> | { token: string };
// };

// async function getLeadByToken(token: string) {
//   const supabase = createServerSupabase();

//   const { data, error } = await supabase
//     .from("leads")
//     .select("*")
//     .eq("follow_up_token", token)
//     .single();

//   if (error) throw error;

//   return data as Lead;
// }

// export default async function FollowUpPage({ params }: PageProps) {
//   const { token } = await params;

//   try {
//     const lead = await getLeadByToken(token);

//     return (
//       <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-3xl">
//           <Link href="/" className="text-sm font-black text-slate-500">
//             ← LeadDog
//           </Link>

//           <div className="mt-6 rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/15">
//             <p className="text-sm font-bold text-slate-300">
//               Secure customer follow-up
//             </p>
//             <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">
//               Hi {lead.name}
//             </h1>
//             <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
//               You are replying to your existing enquiry. Your response will be
//               saved directly in the LeadDog CRM timeline.
//             </p>
//           </div>

//           <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
//             <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-400">
//               Your original requirement
//             </p>
//             <p className="mt-3 text-base leading-8 text-slate-700">
//               {lead.requirement}
//             </p>
//           </div>

//           <div className="mt-6">
//             <CustomerReplyForm token={token} />
//           </div>
//         </div>
//       </main>
//     );
//   } catch {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
//         <div className="max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
//           <h1 className="text-3xl font-black text-slate-950">
//             Invalid follow-up link
//           </h1>
//           <p className="mt-3 text-sm leading-7 text-slate-500">
//             This link is invalid, expired, or Supabase is not configured yet.
//           </p>
//           <Link
//             href="/"
//             className="mt-5 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"
//           >
//             Go to LeadDog
//           </Link>
//         </div>
//       </main>
//     );
//   }
// }
import Link from "next/link";
import CustomerReplyForm from "@/components/followup/CustomerReplyForm";
import { createServerSupabase } from "@/lib/supabase";
import type { Lead } from "@/types/lead";

type PageProps = {
  params: Promise<{ token: string }> | { token: string };
};

async function getLeadByToken(token: string) {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("follow_up_token", token)
    .single();

  if (error) throw error;

  return data as Lead;
}

export default async function FollowUpPage({ params }: PageProps) {
  const { token } = await params;

  try {
    const lead = await getLeadByToken(token);

    return (
      <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-950"
          >
            ← LeadDog
          </Link>

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
              Secure follow-up
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950">
              Hi {lead.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              You are replying to your existing enquiry. Your response will be
              saved directly in the LeadDog CRM timeline.
            </p>
          </section>

          <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              Original requirement
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {lead.requirement}
            </p>
          </section>

          <div className="mt-4">
            <CustomerReplyForm token={token} />
          </div>
        </div>
      </main>
    );
  } catch {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-slate-950">
            Invalid follow-up link
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            This link is invalid, expired, or the lead could not be found.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white"
          >
            Go to LeadDog
          </Link>
        </div>
      </main>
    );
  }
}
