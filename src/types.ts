export type Slide = {
  id: number;
  imageFile: string;
  title: string;
  lines: { jp: string; lv: string; en: string }[];
  comments: string[];
};
