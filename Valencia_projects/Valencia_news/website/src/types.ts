export interface Article {
  id: number;
  title_ru: string;
  summary_ru: string;
  source_name: string;
  url: string;
  image_url: string | null;
  category: string;
  published_at: string;
  channel: string;
}

export interface ChannelData {
  updated_at: string;
  channel: string;
  articles: Article[];
}

export type ChannelId = "news" | "events" | "tourism" | "gastronomy";

export const CHANNELS: { id: ChannelId; label: string; emoji: string }[] = [
  { id: "news", label: "Новости", emoji: "📰" },
  { id: "events", label: "Афиша", emoji: "🎭" },
  { id: "tourism", label: "Туризм", emoji: "🏖️" },
  { id: "gastronomy", label: "Еда", emoji: "🍷" },
];
