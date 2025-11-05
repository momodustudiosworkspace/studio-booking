import { format } from "date-fns";

type DateFormatType =
  | "short" // Sat, Dec 4, 2025
  | "numeric" // 2025-12-04
  | "monthYear" // Dec 2025
  | "time" // 2:00 PM
  | "full"; // Saturday, December 4, 2025

export const formatDate = (
  dateString: string | null | undefined,
  type: DateFormatType = "short"
) => {
  const date = new Date(`${dateString}`);

  switch (type) {
    case "short":
      return format(date, "EEE, MMM d, yyyy");
    case "numeric":
      return format(date, "yyyy-MM-dd");
    case "monthYear":
      return format(date, "MMM yyyy");
    case "time":
      return format(date, "h:mm a");
    case "full":
      return format(date, "EEEE, MMMM d, yyyy");
    default:
      return dateString;
  }
};
