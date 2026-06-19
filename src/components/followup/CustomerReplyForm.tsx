// "use client";

// import { FormEvent, useState } from "react";
// import { Loader2, Send } from "lucide-react";

// export default function CustomerReplyForm({ token }: { token: string }) {
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState("");

//   async function handleSubmit(event: FormEvent) {
//     event.preventDefault();

//     if (message.trim().length < 5) {
//       setResult("Please write a little more detail.");
//       return;
//     }

//     setLoading(true);
//     setResult("");

//     try {
//       const response = await fetch(`/api/follow-up/${token}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to submit reply.");
//       }

//       setMessage("");
//       setResult("Your reply has been submitted. Our team will follow up.");
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
//       className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
//     >
//       <h2 className="text-2xl font-black text-slate-950">
//         Reply to this request
//       </h2>
//       <p className="mt-2 text-sm leading-6 text-slate-500">
//         Your response will be attached to your existing LeadDog enquiry.
//       </p>

//       <textarea
//         value={message}
//         onChange={(event) => setMessage(event.target.value)}
//         rows={7}
//         placeholder="Write your update or reply here..."
//         className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold leading-7 outline-none transition focus:border-slate-400 focus:bg-white"
//       />

//       <button
//         disabled={loading}
//         className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
//       >
//         {loading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <Send className="h-4 w-4" />
//         )}
//         Submit Reply
//       </button>

//       {result && (
//         <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
//           {result}
//         </p>
//       )}
//     </form>
//   );
// }
"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function CustomerReplyForm({ token }: { token: string }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (message.trim().length < 5) {
      setResult("Please write a little more detail.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch(`/api/follow-up/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit reply.");
      }

      setMessage("");
      setResult("Your reply has been submitted. Our team will follow up.");
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
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-slate-950">
        Send a reply
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        This response will be attached to your existing LeadDog enquiry.
      </p>

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={7}
        placeholder="Write your update or reply here..."
        className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
      />

      <button
        disabled={loading}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Submit reply
      </button>

      {result && (
        <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
          {result}
        </p>
      )}
    </form>
  );
}
