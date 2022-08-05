export type TRecordFilter = {
  id: number | null;
  accumulated?: boolean;
  display: string;
  description: string;
  orderBy: string;
  limit: number;
  route: string;
  sortAsc: boolean;
  season: number | null;
  week: number | null;
  userId: string | null;
  needsLoggedUser: boolean;
  weekSelector?: boolean;
};
