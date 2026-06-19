// import Link from "next/link";
// import LeadStats from "@/components/admin/LeadStats";
// import LeadTable from "@/components/admin/LeadTable";
// import { createServerSupabase } from "@/lib/supabase";
// import type { Lead, TeamMember } from "@/types/lead";

// const fallbackTeamMembers: TeamMember[] = [
//   {
//     id: "tm-1",
//     name: "Aman Verma",
//     email: "aman@leaddog.local",
//     role: "Sales Executive",
//   },
//   {
//     id: "tm-2",
//     name: "Riya Mehta",
//     email: "riya@leaddog.local",
//     role: "Support Executive",
//   },
//   {
//     id: "tm-3",
//     name: "Karan Singh",
//     email: "karan@leaddog.local",
//     role: "Operations Lead",
//   },
// ];

// async function getDashboardData() {
//   try {
//     const supabase = createServerSupabase();

//     const { data: leads, error } = await supabase
//       .from("leads")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) throw error;

//     return {
//       leads: (leads || []) as Lead[],
//       teamMembers: fallbackTeamMembers,
//       error: "",
//     };
//   } catch (error) {
//     return {
//       leads: [] as Lead[],
//       teamMembers: fallbackTeamMembers,
//       error: error instanceof Error ? error.message : "Failed to load leads.",
//     };
//   }
// }

// export default async function AdminDashboardPage() {
//   const { leads, teamMembers, error } = await getDashboardData();

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <header className="mb-8 flex flex-col justify-between gap-4 rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/15 sm:flex-row sm:items-center">
//           <div>
//             <Link href="/" className="text-sm font-bold text-slate-300">
//               ← Back to LeadDog
//             </Link>
//             <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">
//               Admin Dashboard
//             </h1>
//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
//               Review captured leads, assign ownership, update status, and send
//               customer follow-ups.
//             </p>
//           </div>

//           <Link
//             href="/"
//             className="inline-flex justify-center rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
//           >
//             Capture New Lead
//           </Link>
//         </header>

//         {error && (
//           <div className="mb-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-bold leading-7 text-amber-800">
//             Supabase is not configured yet or the table does not exist. UI is
//             ready. Error: {error}
//           </div>
//         )}

//         <div className="space-y-6">
//           <LeadStats leads={leads} />
//           <LeadTable leads={leads} teamMembers={teamMembers} />
//         </div>
//       </div>
//     </main>
//   );
// }
import Link from "next/link";
import LeadStats from "@/components/admin/LeadStats";
import LeadTable from "@/components/admin/LeadTable";
import { createServerSupabase } from "@/lib/supabase";
import type { Lead, TeamMember } from "@/types/lead";
export const dynamic = "force-dynamic";
export const revalidate = 0;
const fallbackTeamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "Aman Verma",
    email: "aman@leaddog.local",
    role: "Sales Executive",
  },
  {
    id: "tm-2",
    name: "Riya Mehta",
    email: "riya@leaddog.local",
    role: "Support Executive",
  },
  {
    id: "tm-3",
    name: "Karan Singh",
    email: "karan@leaddog.local",
    role: "Operations Lead",
  },
];

async function getDashboardData() {
  try {
    const supabase = createServerSupabase();

    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      leads: (leads || []) as Lead[],
      teamMembers: fallbackTeamMembers,
      error: "",
    };
  } catch (error) {
    return {
      leads: [] as Lead[],
      teamMembers: fallbackTeamMembers,
      error: error instanceof Error ? error.message : "Failed to load leads.",
    };
  }
}

export default async function AdminDashboardPage() {
  const { leads, teamMembers, error } = await getDashboardData();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-slate-500 hover:text-slate-950"
            >
              ← LeadDog
            </Link>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-slate-950">
              Admin workspace
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage leads, owners, status, and follow-up.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex justify-center rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Capture lead
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-5 px-5 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
            Supabase is not configured yet or the table does not exist. Error:{" "}
            {error}
          </div>
        )}

        <LeadStats leads={leads} />
        <LeadTable leads={leads} teamMembers={teamMembers} />
      </div>
    </main>
  );
}
