export type IItem = {
  id: number;
  name_vi: string;
  name_en: string;
  link_youtube: string;
  image: string;
  price_vi: number;
  price_en: number;
  created_at: Date;
}
export type IItemTableFilters = {
  name_vi: string
}