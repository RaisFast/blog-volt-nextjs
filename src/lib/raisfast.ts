import { RaisFast } from "@raisfast/sdk";

export const client = new RaisFast(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9898/api/v1",
);
