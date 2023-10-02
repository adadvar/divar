export interface cat {
  id: number;
  title: string;
  slug: string;
  parent_id: number | null;
  icon: string | null;
  child: cat[];
}