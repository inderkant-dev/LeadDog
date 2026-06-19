// "use client";

// import { FormEvent, useState } from "react";
// import { Loader2, Send } from "lucide-react";

// export default function SendFollowupButton({
//   leadId,
//   leadName,
// }: {
//   leadId: string;
//   leadName: string;
// }) {
//   const [subject, setSubject] = useState("Follow-up regarding your enquiry");
//   const [message, setMessage] = useState(
//     `Hi ${leadName}, thank you for your enquiry. Please use the secure link below to reply or update your requirement.`,
//   );
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState("");

//   async function handleSubmit(event: FormEvent) {
//     event.preventDefault();
//     setLoading(true);
//     setResult("");

//     try {
//       const response = await fetch(`/api/leads/${leadId}/send-followup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ subject, message }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to send follow-up.");
//       }

//       setResult(
//         data.email?.skipped
//           ? "Follow-up recorded. Email skipped because Resend is not configured yet."
//           : "Follow-up email sent and recorded.",
//       );
//     } catch (error) {
//       setResult(
//         error instanceof Error ? error.message : "Something went wrong.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
//     >
//       <h3 className="text-lg font-black text-slate-950">
//         Send follow-up email
//       </h3>
//       <p className="mt-1 text-sm leading-6 text-slate-500">
//         This email includes the secure customer reply link.
//       </p>

//       <div className="mt-5 space-y-3">
//         <input
//           value={subject}
//           onChange={(event) => setSubject(event.target.value)}
//           className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-slate-400 focus:bg-white"
//         />

//         <textarea
//           value={message}
//           onChange={(event) => setMessage(event.target.value)}
//           rows={5}
//           className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold leading-7 outline-none focus:border-slate-400 focus:bg-white"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
//       >
//         {loading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <Send className="h-4 w-4" />
//         )}
//         Send Follow-up
//       </button>

//       {result && (
//         <p className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
//           {result}
//         </p>
//       )}
//     </form>
//   );
// }
"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function SendFollowupButton({
  leadId,
  leadName,
}: {
  leadId: string;
  leadName: string;
}) {
  const [subject, setSubject] = useState("Follow-up regarding your enquiry");
  const [message, setMessage] = useState(
    `Hi ${leadName}, thank you for your enquiry. Please use the secure link below to reply or update your requirement.`,
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const response = await fetch(`/api/leads/${leadId}/send-followup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send follow-up.");
      }

      setResult(
        data.email?.skipped
          ? "Follow-up recorded. Email skipped because Resend is not configured."
          : "Follow-up email sent and recorded.",
      );
    } catch (error) {
      setResult(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5"
    >
      <h3 className="text-base font-semibold text-slate-950">Send follow-up</h3>
      <p className="mt-1 text-sm leading-6 text-slate-500">
        The message includes the customer’s secure reply link.
      </p>

      <div className="mt-5 space-y-3">
        <input
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
        />

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm leading-7 text-slate-900 outline-none transition focus:border-slate-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Send email
      </button>

      {result && (
        <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
          {result}
        </p>
      )}
    </form>
  );
}
