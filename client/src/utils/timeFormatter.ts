// src/utils/formatTime.ts

export function formatTime(
  isoString: string | null | undefined,
  useUTC = false
): string {
  const date = new Date(`${isoString}`);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: useUTC ? "UTC" : undefined,
  };

  // Example: "08:00 AM"
  return date.toLocaleTimeString("en-US", options);
}
