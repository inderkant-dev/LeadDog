import { randomBytes } from "crypto";

export function createFollowUpToken() {
  return randomBytes(24).toString("hex");
}
