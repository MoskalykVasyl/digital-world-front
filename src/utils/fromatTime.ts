import { format } from "date-fns";

export function formatTime(isoDate: string): string {
  const date = new Date(isoDate);
  return format(date, "dd MMMM yyyy, HH:mm:ss");
}
