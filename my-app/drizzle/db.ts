// drizzle/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as relations from "./relations";

// Merge all exports
const allSchema = { ...schema, ...relations };

export const db = drizzle(process.env.DATABASE_URL!, { schema: allSchema });
