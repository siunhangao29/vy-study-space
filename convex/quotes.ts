import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getRandomQuote = query({
  args: {},
  handler: async (ctx) => {
    const quotes = await ctx.db.query("motivationalQuotes").collect();
    if (quotes.length === 0) {
      return {
        text: "Hãy tin vào bản thân và cố gắng hết mình! 💪",
        author: "Dành riêng cho Vy",
        category: "motivation"
      };
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  },
});

export const addQuote = mutation({
  args: {
    text: v.string(),
    author: v.optional(v.string()),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("motivationalQuotes", args);
  },
});

export const initializeQuotes = mutation({
  args: {},
  handler: async (ctx) => {
    const existingQuotes = await ctx.db.query("motivationalQuotes").collect();
    if (existingQuotes.length > 0) return;

    const quotes = [
      { text: "Vy ơi, hôm nay cũng cố gắng thật nhiều nhé! 🌸", author: "Dành riêng cho Vy", category: "motivation" },
      { text: "Mỗi phút học tập hôm nay là một bước tiến gần hơn đến ước mơ của Vy! ✨", author: "Dành riêng cho Vy", category: "motivation" },
      { text: "Thành công không phải là chìa khóa của hạnh phúc. Hạnh phúc là chìa khóa của thành công.", author: "Albert Schweitzer", category: "success" },
      { text: "Vy có thể làm được! Đừng bao giờ từ bỏ ước mơ của mình! 🌟", author: "Dành riêng cho Vy", category: "motivation" },
      { text: "Học tập không phải là chuẩn bị cho cuộc sống; học tập chính là cuộc sống.", author: "John Dewey", category: "learning" },
      { text: "Hãy nghỉ ngơi khi cần thiết, nhưng đừng bao giờ từ bỏ! 💪", author: "Dành riêng cho Vy", category: "perseverance" },
      { text: "Kiến thức là sức mạnh, nhưng thực hành là chìa khóa.", author: "Thomas Fuller", category: "knowledge" },
      { text: "Vy đang làm rất tốt rồi! Hãy tiếp tục như vậy! 🎯", author: "Dành riêng cho Vy", category: "encouragement" },
      { text: "Đừng so sánh tiến trình của mình với người khác. Hãy tập trung vào việc trở thành phiên bản tốt nhất của chính mình.", author: "Unknown", category: "self-improvement" },
      { text: "Mỗi ngày Vy học là một ngày Vy trở nên thông minh hơn! 🧠✨", author: "Dành riêng cho Vy", category: "growth" },
      { text: "Thất bại là cơ hội để bắt đầu lại một cách thông minh hơn.", author: "Henry Ford", category: "resilience" },
      { text: "Vy có thể vượt qua mọi thử thách! Tin vào bản thân nhé! 🌈", author: "Dành riêng cho Vy", category: "confidence" },
      { text: "Giáo dục là vũ khí mạnh nhất mà bạn có thể sử dụng để thay đổi thế giới.", author: "Nelson Mandela", category: "education" },
      { text: "Hãy nghỉ ngơi đầy đủ để ngày mai học tập hiệu quả hơn! 😴💤", author: "Dành riêng cho Vy", category: "rest" },
      { text: "Sự kiên trì là bí quyết của mọi chiến thắng.", author: "Napoleon Hill", category: "persistence" },
    ];

    for (const quote of quotes) {
      await ctx.db.insert("motivationalQuotes", quote);
    }
  },
});
