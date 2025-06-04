import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  motivationalQuotes: defineTable({
    text: v.string(),
    author: v.optional(v.string()),
    category: v.string(),
  }),
  studySessions: defineTable({
    userId: v.optional(v.id("users")),
    type: v.union(v.literal("study"), v.literal("break")),
    duration: v.number(),
    completedAt: v.number(),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
