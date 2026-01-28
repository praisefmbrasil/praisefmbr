export type FavoriteItemType =
  | "program"
  | "track"
  | "devotional"
  | "artist";

export interface FavoriteItem {
  id: string;
  title: string;
  subtitle?: string;
  host?: string;
  image: string;
  type: FavoriteItemType;
}
