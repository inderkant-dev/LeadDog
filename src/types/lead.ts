export type LeadPriority = "High" | "Medium" | "Low";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Follow-up Scheduled"
  | "Customer Replied"
  | "Qualified"
  | "Converted"
  | "Lost";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  requirement: string;
  source: string;
  intent: string;
  priority: LeadPriority;
  status: LeadStatus;
  assigned_to?: string | null;
  follow_up_token: string;
  created_at: string;
  updated_at?: string;
};

export type LeadReply = {
  id: string;
  lead_id: string;
  message: string;
  created_at: string;
};

export type Followup = {
  id: string;
  lead_id: string;
  type: string;
  subject: string;
  message: string;
  status: "Sent" | "Pending" | "Failed";
  sent_at?: string | null;
  created_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
};
