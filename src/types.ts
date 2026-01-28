export type FavoriteItemType = "program" | "track" | "devotional" | "artist";

export interface FavoriteItem {
  id: string;
  type: FavoriteItemType;
  title: string;
  subtitle?: string;
  image?: string;
}
