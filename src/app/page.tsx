// import FeatureCards from "@/components/landing/FeatureCards";
// import Hero from "@/components/landing/Hero";
// import LeadChatWidget from "@/components/landing/LeadChatWidget";

// export default function Home() {
//   return (
//     <main>
//       <Hero />
//       <FeatureCards />
//       <LeadChatWidget />

//       <footer className="border-t border-slate-200 px-4 py-8 sm:px-6 lg:px-8">
//         <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row">
//           <p className="font-bold text-slate-700">LeadDog</p>
//           <p>Website chatbot · Supabase CRM · Resend follow-up engine</p>
//         </div>
//       </footer>
//     </main>
//   );
// }
import FeatureCards from "@/components/landing/FeatureCards";
import Hero from "@/components/landing/Hero";
import LeadChatWidget from "@/components/landing/LeadChatWidget";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Hero />
      <FeatureCards />

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-12 text-center text-white sm:px-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
            Ready for workflow
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Capture, qualify, assign, and follow up from one clean operating
            layer.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            LeadDog keeps acquisition simple for users and structured for teams.
            The floating assistant captures enquiries, while the admin workspace
            handles ownership, status, and follow-up.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <p className="font-semibold text-slate-800">LeadDog</p>
          <p>
            Lead capture · CRM dashboard · Email follow-up · Secure reply links
          </p>
        </div>
      </footer>

      {/* <LeadChatWidget /> */}
    </main>
  );
}
