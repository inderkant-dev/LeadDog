// "use client";

// import { FormEvent, useMemo, useState } from "react";
// import { ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";

// type FieldKey = "name" | "email" | "phone" | "company" | "requirement";

// type ChatMessage = {
//   id: string;
//   role: "bot" | "user";
//   text: string;
// };

// const fields: Array<{
//   key: FieldKey;
//   label: string;
//   placeholder: string;
//   botQuestion: string;
//   type?: string;
// }> = [
//   {
//     key: "name",
//     label: "Name",
//     placeholder: "e.g. Rahul Sharma",
//     botQuestion: "Hi. I am LeadDog. What is your name?",
//   },
//   {
//     key: "email",
//     label: "Email",
//     placeholder: "e.g. rahul@example.com",
//     botQuestion: "Please share your email so our team can follow up.",
//     type: "email",
//   },
//   {
//     key: "phone",
//     label: "Phone",
//     placeholder: "e.g. 9876543210",
//     botQuestion: "Please share your phone number.",
//   },
//   {
//     key: "company",
//     label: "Company / Organisation",
//     placeholder: "e.g. ABC Healthcare",
//     botQuestion:
//       "Which company or organisation are you from? You can write NA.",
//   },
//   {
//     key: "requirement",
//     label: "Requirement",
//     placeholder: "e.g. Need urgent hospital admission support in Delhi today.",
//     botQuestion: "Now describe your requirement in detail.",
//   },
// ];

// export default function LeadChatWidget() {
//   const [step, setStep] = useState(0);
//   const [input, setInput] = useState("");
//   const [form, setForm] = useState<Record<FieldKey, string>>({
//     name: "",
//     email: "",
//     phone: "",
//     company: "",
//     requirement: "",
//   });
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: "welcome",
//       role: "bot",
//       text: fields[0].botQuestion,
//     },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [createdLead, setCreatedLead] = useState<{
//     id: string;
//     priority: string;
//     intent: string;
//   } | null>(null);
//   const [error, setError] = useState("");

//   const currentField = fields[step];

//   const progress = useMemo(() => {
//     return Math.round((step / fields.length) * 100);
//   }, [step]);

//   function validateValue(key: FieldKey, value: string) {
//     if (!value.trim()) return "This field is required.";

//     if (key === "email") {
//       const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//       if (!valid) return "Please enter a valid email.";
//     }

//     if (key === "phone" && value.replace(/\D/g, "").length < 8) {
//       return "Please enter a valid phone number.";
//     }

//     if (key === "requirement" && value.trim().length < 12) {
//       return "Please describe the requirement in more detail.";
//     }

//     return "";
//   }

//   async function createLead(finalForm: Record<FieldKey, string>) {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("/api/leads", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(finalForm),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.error || "Failed to create lead.");
//       }

//       setCreatedLead({
//         id: result.lead.id,
//         priority: result.lead.priority,
//         intent: result.lead.intent,
//       });

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: "success",
//           role: "bot",
//           text: `Your enquiry has been captured. Priority: ${result.lead.priority}. Intent: ${result.lead.intent}. A confirmation email has been sent if email is configured.`,
//         },
//       ]);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleSubmit(event: FormEvent) {
//     event.preventDefault();
//     if (!currentField || loading || createdLead) return;

//     const value = input.trim();
//     const validationError = validateValue(currentField.key, value);

//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setError("");

//     const updatedForm = {
//       ...form,
//       [currentField.key]: value,
//     };

//     setForm(updatedForm);

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: `${currentField.key}-user`,
//         role: "user",
//         text: value,
//       },
//     ]);

//     setInput("");

//     const nextStep = step + 1;

//     if (nextStep < fields.length) {
//       setStep(nextStep);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: `${fields[nextStep].key}-bot`,
//           role: "bot",
//           text: fields[nextStep].botQuestion,
//         },
//       ]);
//       return;
//     }

//     setStep(nextStep);
//     await createLead(updatedForm);
//   }

//   function resetChat() {
//     setStep(0);
//     setInput("");
//     setForm({
//       name: "",
//       email: "",
//       phone: "",
//       company: "",
//       requirement: "",
//     });
//     setMessages([
//       {
//         id: "welcome",
//         role: "bot",
//         text: fields[0].botQuestion,
//       },
//     ]);
//     setCreatedLead(null);
//     setError("");
//   }

//   return (
//     <section id="lead-capture" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
//       <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
//         <div className="flex flex-col justify-center">
//           <p className="text-sm font-black uppercase tracking-[0.26em] text-sky-600">
//             Live lead capture
//           </p>
//           <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
//             A premium chatbot experience without API delays.
//           </h2>
//           <p className="mt-5 text-lg leading-8 text-slate-600">
//             The customer speaks to a guided chat interface. Once the required
//             details are complete, LeadDog creates a CRM lead, detects priority,
//             and sends an email acknowledgement.
//           </p>

//           <div className="mt-8 grid gap-3 sm:grid-cols-2">
//             {[
//               "No WhatsApp approval dependency",
//               "No AI setup required for MVP",
//               "Supabase-ready backend",
//               "Resend-ready follow-up system",
//             ].map((item) => (
//               <div
//                 key={item}
//                 className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700"
//               >
//                 <CheckCircle2 className="h-5 w-5 text-emerald-500" />
//                 {item}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="glass-card overflow-hidden rounded-[2rem]">
//           <div className="border-b border-slate-200 bg-white/80 p-5">
//             <div className="flex items-center justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
//                   <MessageCircle className="h-5 w-5" />
//                 </div>
//                 <div>
//                   <p className="font-black text-slate-950">LeadDog Assistant</p>
//                   <p className="text-sm text-slate-500">
//                     Online · Usually replies instantly
//                   </p>
//                 </div>
//               </div>

//               <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-600 sm:block">
//                 {createdLead ? "Complete" : `${progress}% complete`}
//               </div>
//             </div>
//           </div>

//           <div className="h-[520px] overflow-y-auto bg-slate-50/70 p-5">
//             <div className="space-y-4">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${
//                     message.role === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[85%] rounded-3xl px-5 py-3 text-sm leading-7 shadow-sm ${
//                       message.role === "user"
//                         ? "bg-slate-950 text-white"
//                         : "border border-slate-200 bg-white text-slate-700"
//                     }`}
//                   >
//                     {message.text}
//                   </div>
//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex justify-start">
//                   <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-500">
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     Creating lead...
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="border-t border-slate-200 bg-white p-5">
//             {error && (
//               <p className="mb-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
//                 {error}
//               </p>
//             )}

//             {createdLead ? (
//               <div className="flex flex-col gap-3 sm:flex-row">
//                 <a
//                   href="/admin"
//                   className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800"
//                 >
//                   Open Admin Dashboard
//                 </a>
//                 <button
//                   type="button"
//                   onClick={resetChat}
//                   className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-700 transition hover:bg-slate-50"
//                 >
//                   Capture Another Lead
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="flex gap-3">
//                 <input
//                   value={input}
//                   onChange={(event) => setInput(event.target.value)}
//                   type={currentField?.type || "text"}
//                   placeholder={currentField?.placeholder || "Type here..."}
//                   className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
//                 />
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   <ArrowRight className="h-5 w-5" />
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// "use client";

// import { FormEvent, useMemo, useState } from "react";
// import {
//   ArrowRight,
//   CheckCircle2,
//   ChevronDown,
//   Loader2,
//   MessageCircle,
//   RotateCcw,
// } from "lucide-react";

// type FieldKey = "name" | "email" | "phone" | "company" | "requirement";

// type ChatMessage = {
//   id: string;
//   role: "bot" | "user";
//   text: string;
// };

// const fields: Array<{
//   key: FieldKey;
//   label: string;
//   placeholder: string;
//   botQuestion: string;
//   type?: string;
// }> = [
//   {
//     key: "name",
//     label: "Name",
//     placeholder: "Rahul Sharma",
//     botQuestion: "Hi. I’m LeadDog. Please share your name.",
//   },
//   {
//     key: "email",
//     label: "Email",
//     placeholder: "rahul@example.com",
//     botQuestion: "Please share your email for follow-up.",
//     type: "email",
//   },
//   {
//     key: "phone",
//     label: "Phone",
//     placeholder: "9876543210",
//     botQuestion: "Please share your phone number.",
//   },
//   {
//     key: "company",
//     label: "Company",
//     placeholder: "ABC Healthcare or NA",
//     botQuestion:
//       "Which company or organisation are you from? You can write NA.",
//   },
//   {
//     key: "requirement",
//     label: "Requirement",
//     placeholder: "Need urgent hospital admission support in Delhi today.",
//     botQuestion: "Please describe your requirement in detail.",
//   },
// ];

// export default function LeadChatWidget() {
//   const [open, setOpen] = useState(false);
//   const [step, setStep] = useState(0);
//   const [input, setInput] = useState("");
//   const [form, setForm] = useState<Record<FieldKey, string>>({
//     name: "",
//     email: "",
//     phone: "",
//     company: "",
//     requirement: "",
//   });
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: "welcome",
//       role: "bot",
//       text: fields[0].botQuestion,
//     },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [createdLead, setCreatedLead] = useState<{
//     id: string;
//     priority: string;
//     intent: string;
//   } | null>(null);
//   const [error, setError] = useState("");

//   const currentField = fields[step];

//   const progress = useMemo(() => {
//     if (createdLead) return 100;
//     return Math.round((step / fields.length) * 100);
//   }, [step, createdLead]);

//   function validateValue(key: FieldKey, value: string) {
//     if (!value.trim()) return "This field is required.";

//     if (key === "email") {
//       const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//       if (!valid) return "Please enter a valid email.";
//     }

//     if (key === "phone" && value.replace(/\D/g, "").length < 8) {
//       return "Please enter a valid phone number.";
//     }

//     if (key === "requirement" && value.trim().length < 12) {
//       return "Please describe the requirement in more detail.";
//     }

//     return "";
//   }

//   async function createLead(finalForm: Record<FieldKey, string>) {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("/api/leads", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(finalForm),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.error || "Failed to create lead.");
//       }

//       setCreatedLead({
//         id: result.lead.id,
//         priority: result.lead.priority,
//         intent: result.lead.intent,
//       });

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: "success",
//           role: "bot",
//           text: `Done. Your enquiry has been captured. Priority: ${result.lead.priority}. Intent: ${result.lead.intent}. A confirmation email has been sent.`,
//         },
//       ]);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleSubmit(event: FormEvent) {
//     event.preventDefault();
//     if (!currentField || loading || createdLead) return;

//     const value = input.trim();
//     const validationError = validateValue(currentField.key, value);

//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setError("");

//     const updatedForm = {
//       ...form,
//       [currentField.key]: value,
//     };

//     setForm(updatedForm);

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: `${currentField.key}-user`,
//         role: "user",
//         text: value,
//       },
//     ]);

//     setInput("");

//     const nextStep = step + 1;

//     if (nextStep < fields.length) {
//       setStep(nextStep);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: `${fields[nextStep].key}-bot`,
//           role: "bot",
//           text: fields[nextStep].botQuestion,
//         },
//       ]);
//       return;
//     }

//     setStep(nextStep);
//     await createLead(updatedForm);
//   }

//   function resetChat() {
//     setStep(0);
//     setInput("");
//     setForm({
//       name: "",
//       email: "",
//       phone: "",
//       company: "",
//       requirement: "",
//     });
//     setMessages([
//       {
//         id: "welcome",
//         role: "bot",
//         text: fields[0].botQuestion,
//       },
//     ]);
//     setCreatedLead(null);
//     setError("");
//   }

//   return (
//     <>
//       {open && (
//         <div className="fixed inset-x-3 bottom-20 z-[9999] animate-soft-in overflow-hidden rounded-3xl border border-slate-200 bg-white sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px]">
//           <div className="border-b border-slate-200 bg-white px-5 py-4">
//             <div className="flex items-start justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
//                   <MessageCircle className="h-4 w-4" />
//                 </div>

//                 <div>
//                   <p className="text-sm font-semibold text-slate-950">
//                     LeadDog Assistant
//                   </p>
//                   <div className="mt-1 flex items-center gap-2">
//                     <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
//                     <p className="text-xs text-slate-500">Online</p>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
//                 aria-label="Close chat"
//               >
//                 <ChevronDown className="h-4 w-4" />
//               </button>
//             </div>

//             <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
//               <div
//                 className="h-full rounded-full bg-slate-950 transition-all duration-300"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           <div className="chat-scrollbar h-[58vh] max-h-[470px] min-h-[360px] overflow-y-auto bg-slate-50 px-4 py-5 sm:h-[470px]">
//             <div className="space-y-3">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${
//                     message.role === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${
//                       message.role === "user"
//                         ? "bg-slate-950 text-white"
//                         : "border border-slate-200 bg-white text-slate-700"
//                     }`}
//                   >
//                     {message.text}
//                   </div>
//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex justify-start">
//                   <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     Creating lead...
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="border-t border-slate-200 bg-white p-4">
//             {error && (
//               <p className="mb-3 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
//                 {error}
//               </p>
//             )}

//             {createdLead ? (
//               <div className="space-y-2">
//                 <a
//                   href="/admin"
//                   className="flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
//                 >
//                   Open admin dashboard
//                 </a>

//                 <button
//                   type="button"
//                   onClick={resetChat}
//                   className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
//                 >
//                   <RotateCcw className="h-4 w-4" />
//                   Capture another lead
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="flex gap-2">
//                 <input
//                   value={input}
//                   onChange={(event) => setInput(event.target.value)}
//                   type={currentField?.type || "text"}
//                   placeholder={currentField?.placeholder || "Type here..."}
//                   className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
//                 />

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
//                   aria-label="Send"
//                 >
//                   <ArrowRight className="h-4 w-4" />
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}

//       <button
//         type="button"
//         onClick={() => setOpen((value) => !value)}
//         className={`fixed bottom-4 right-4 z-[10000] flex h-14 w-14 items-center justify-center rounded-full border border-slate-800 bg-slate-950 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 sm:bottom-6 sm:right-6 sm:h-auto sm:w-auto sm:gap-3 sm:px-4 sm:py-3 ${
//           open ? "" : "pulse-ring"
//         }`}
//         aria-label={open ? "Close LeadDog Assistant" : "Open LeadDog Assistant"}
//       >
//         <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-950 sm:h-8 sm:w-8">
//           {createdLead ? (
//             <CheckCircle2 className="h-4 w-4" />
//           ) : (
//             <MessageCircle className="h-4 w-4" />
//           )}
//         </span>

//         <span className="hidden pr-1 text-sm font-medium sm:block">
//           {open ? "Close assistant" : "Capture lead"}
//         </span>
//       </button>
//     </>
//   );
//   //   return (
//   //     <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
//   //       {open && (
//   //         <div className="animate-soft-in mb-4 w-[calc(100vw-2.5rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white sm:w-[420px]">
//   //           <div className="border-b border-slate-200 bg-white px-5 py-4">
//   //             <div className="flex items-start justify-between gap-4">
//   //               <div className="flex items-center gap-3">
//   //                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
//   //                   <MessageCircle className="h-4 w-4" />
//   //                 </div>
//   //                 <div>
//   //                   <p className="text-sm font-semibold text-slate-950">
//   //                     LeadDog Assistant
//   //                   </p>
//   //                   <div className="mt-1 flex items-center gap-2">
//   //                     <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
//   //                     <p className="text-xs text-slate-500">Online</p>
//   //                   </div>
//   //                 </div>
//   //               </div>

//   //               <button
//   //                 type="button"
//   //                 onClick={() => setOpen(false)}
//   //                 className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
//   //                 aria-label="Close chat"
//   //               >
//   //                 <ChevronDown className="h-4 w-4" />
//   //               </button>
//   //             </div>

//   //             <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
//   //               <div
//   //                 className="h-full rounded-full bg-slate-950 transition-all duration-300"
//   //                 style={{ width: `${progress}%` }}
//   //               />
//   //             </div>
//   //           </div>

//   //           <div className="chat-scrollbar h-[430px] overflow-y-auto bg-slate-50 px-4 py-5 sm:h-[470px]">
//   //             <div className="space-y-3">
//   //               {messages.map((message) => (
//   //                 <div
//   //                   key={message.id}
//   //                   className={`flex ${
//   //                     message.role === "user" ? "justify-end" : "justify-start"
//   //                   }`}
//   //                 >
//   //                   <div
//   //                     className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${
//   //                       message.role === "user"
//   //                         ? "bg-slate-950 text-white"
//   //                         : "border border-slate-200 bg-white text-slate-700"
//   //                     }`}
//   //                   >
//   //                     {message.text}
//   //                   </div>
//   //                 </div>
//   //               ))}

//   //               {loading && (
//   //                 <div className="flex justify-start">
//   //                   <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
//   //                     <Loader2 className="h-4 w-4 animate-spin" />
//   //                     Creating lead...
//   //                   </div>
//   //                 </div>
//   //               )}
//   //             </div>
//   //           </div>

//   //           <div className="border-t border-slate-200 bg-white p-4">
//   //             {error && (
//   //               <p className="mb-3 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
//   //                 {error}
//   //               </p>
//   //             )}

//   //             {createdLead ? (
//   //               <div className="space-y-2">
//   //                 <a
//   //                   href="/admin"
//   //                   className="flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
//   //                 >
//   //                   Open admin dashboard
//   //                 </a>

//   //                 <button
//   //                   type="button"
//   //                   onClick={resetChat}
//   //                   className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
//   //                 >
//   //                   <RotateCcw className="h-4 w-4" />
//   //                   Capture another lead
//   //                 </button>
//   //               </div>
//   //             ) : (
//   //               <form onSubmit={handleSubmit} className="flex gap-2">
//   //                 <input
//   //                   value={input}
//   //                   onChange={(event) => setInput(event.target.value)}
//   //                   type={currentField?.type || "text"}
//   //                   placeholder={currentField?.placeholder || "Type here..."}
//   //                   className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
//   //                 />

//   //                 <button
//   //                   type="submit"
//   //                   disabled={loading}
//   //                   className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
//   //                   aria-label="Send"
//   //                 >
//   //                   <ArrowRight className="h-4 w-4" />
//   //                 </button>
//   //               </form>
//   //             )}
//   //           </div>
//   //         </div>
//   //       )}

//   //       <button
//   //         type="button"
//   //         onClick={() => setOpen((value) => !value)}
//   //         className={`group flex items-center gap-3 rounded-full border border-slate-200 bg-slate-950 px-4 py-3 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 ${
//   //           open ? "" : "pulse-ring"
//   //         }`}
//   //         aria-label="Open LeadDog Assistant"
//   //       >
//   //         <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-950">
//   //           {createdLead ? (
//   //             <CheckCircle2 className="h-4 w-4" />
//   //           ) : (
//   //             <MessageCircle className="h-4 w-4" />
//   //           )}
//   //         </span>

//   //         <span className="hidden pr-1 text-sm font-medium sm:block">
//   //           {open ? "Close assistant" : "Capture lead"}
//   //         </span>
//   //       </button>
//   //     </div>
//   //   );
// }
"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MessageCircle,
  RotateCcw,
} from "lucide-react";

type FieldKey = "name" | "email" | "phone" | "company" | "requirement";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

const fields: Array<{
  key: FieldKey;
  placeholder: string;
  botQuestion: string;
  type?: string;
}> = [
  {
    key: "name",
    placeholder: "Rahul Sharma",
    botQuestion: "Hi. I’m LeadDog. Please share your name.",
  },
  {
    key: "email",
    placeholder: "rahul@example.com",
    botQuestion: "Please share your email for follow-up.",
    type: "email",
  },
  {
    key: "phone",
    placeholder: "9876543210",
    botQuestion: "Please share your phone number.",
  },
  {
    key: "company",
    placeholder: "ABC Healthcare or NA",
    botQuestion:
      "Which company or organisation are you from? You can write NA.",
  },
  {
    key: "requirement",
    placeholder: "Need urgent hospital admission support in Delhi today.",
    botQuestion: "Please describe your requirement in detail.",
  },
];

export default function LeadChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");

  const [form, setForm] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text: fields[0].botQuestion,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [createdLead, setCreatedLead] = useState<{
    id: string;
    priority: string;
    intent: string;
  } | null>(null);
  const [error, setError] = useState("");

  const currentField = fields[step];

  const progress = useMemo(() => {
    if (createdLead) return 100;
    return Math.round((step / fields.length) * 100);
  }, [step, createdLead]);

  function validateValue(key: FieldKey, value: string) {
    if (!value.trim()) return "This field is required.";

    if (key === "email") {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!valid) return "Please enter a valid email.";
    }

    if (key === "phone" && value.replace(/\D/g, "").length < 8) {
      return "Please enter a valid phone number.";
    }

    if (key === "requirement" && value.trim().length < 12) {
      return "Please describe the requirement in more detail.";
    }

    return "";
  }

  async function createLead(finalForm: Record<FieldKey, string>) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalForm),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create lead.");
      }

      setCreatedLead({
        id: result.lead.id,
        priority: result.lead.priority,
        intent: result.lead.intent,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: "success",
          role: "bot",
          text: `Done. Your enquiry has been captured. Priority: ${result.lead.priority}. Intent: ${result.lead.intent}. A confirmation email has been sent.`,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!currentField || loading || createdLead) return;

    const value = input.trim();
    const validationError = validateValue(currentField.key, value);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const updatedForm = {
      ...form,
      [currentField.key]: value,
    };

    setForm(updatedForm);

    setMessages((prev) => [
      ...prev,
      {
        id: `${currentField.key}-user`,
        role: "user",
        text: value,
      },
    ]);

    setInput("");

    const nextStep = step + 1;

    if (nextStep < fields.length) {
      setStep(nextStep);
      setMessages((prev) => [
        ...prev,
        {
          id: `${fields[nextStep].key}-bot`,
          role: "bot",
          text: fields[nextStep].botQuestion,
        },
      ]);
      return;
    }

    setStep(nextStep);
    await createLead(updatedForm);
  }

  function resetChat() {
    setStep(0);
    setInput("");
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      requirement: "",
    });
    setMessages([
      {
        id: "welcome",
        role: "bot",
        text: fields[0].botQuestion,
      },
    ]);
    setCreatedLead(null);
    setError("");
  }

  return (
    <>
      {open && (
        <div className="fixed inset-x-3 bottom-20 z-[9999] animate-soft-in overflow-hidden rounded-3xl border border-slate-200 bg-white sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px]">
          <div className="border-b border-slate-200 bg-white px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
                  <MessageCircle className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    LeadDog Assistant
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <p className="text-xs text-slate-500">Online</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                aria-label="Close chat"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-950 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="chat-scrollbar h-[58vh] min-h-[360px] max-h-[470px] overflow-y-auto bg-slate-50 px-4 py-5 sm:h-[470px]">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-slate-950 text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating lead...
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white p-4">
            {error && (
              <p className="mb-3 rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                {error}
              </p>
            )}

            {createdLead ? (
              <div className="space-y-2">
                <a
                  href="/admin"
                  className="flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Open admin dashboard
                </a>

                <button
                  type="button"
                  onClick={resetChat}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Capture another lead
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  type={currentField?.type || "text"}
                  placeholder={currentField?.placeholder || "Type here..."}
                  className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Send"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`fixed bottom-4 right-4 z-[10000] flex h-14 w-14 items-center justify-center rounded-full border border-slate-800 bg-slate-950 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 sm:bottom-6 sm:right-6 sm:h-auto sm:w-auto sm:gap-3 sm:px-4 sm:py-3 ${
          open ? "" : "pulse-ring"
        }`}
        aria-label={open ? "Close LeadDog Assistant" : "Open LeadDog Assistant"}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-950 sm:h-8 sm:w-8">
          {createdLead ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <MessageCircle className="h-4 w-4" />
          )}
        </span>

        <span className="hidden pr-1 text-sm font-medium sm:block">
          {open ? "Close assistant" : "Ai"}
        </span>
      </button>
    </>
  );
}
