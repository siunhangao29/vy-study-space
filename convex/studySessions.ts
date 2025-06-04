import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const logStudySession = mutation({
  args: {
    type: v.union(v.literal("study"), v.literal("break")),
    duration: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("studySessions", {
      userId: undefined,
      type: args.type,
      duration: args.duration,
      completedAt: Date.now(),
    });
  },
});

export const getTodayStats = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    
    const sessions = await ctx.db
      .query("studySessions")
      .filter((q) => q.gte(q.field("completedAt"), todayTimestamp))
      .collect();
    
    const studySessions = sessions.filter(s => s.type === "study");
    const totalStudyTime = studySessions.reduce((sum, s) => sum + s.duration, 0);
    const completedSessions = studySessions.length;
    
    return {
      totalStudyTime: Math.round(totalStudyTime / 60), // in minutes
      completedSessions,
    };
  },
});
