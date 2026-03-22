export type Line = {
  jp: string;
  lv: string;
  en: string;
  romaji: string;
};

export type Slide = {
  id: number;
  imageFile: string;
  title: string;
  lines: Line[];
  comments: string[];
  imageUrl: string;
};
