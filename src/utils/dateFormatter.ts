/**
 * Formats a Date object into a string with format "MMM/DD/YYYY"
 * Example: "Jan/19/2024"
 *
 * @param date - The Date object to format
 * @returns A formatted date string
 */
export function formatDate(date: Date): string {
  // Get month abbreviation (Jan, Feb, etc.)
  const month = date.toLocaleString("en-US", { month: "short" });

  // Get day of month with leading zero if needed
  const day = date.getDate();

  // Get full year (4 digits)
  const year = date.getFullYear();

  // Return formatted string
  return `${month}/${day}/${year}`;
}
