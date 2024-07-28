export function extractYear(timestampStr: string): string {
  const dateObj = new Date(timestampStr);
  return dateObj.getFullYear().toString();
}

export function extractDate(timestamp: string): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options).replace(/,/g, "");
}

export function convertRating(rating: number): number {
  const scaledRating = (rating / 10) * 5;
  return Number(scaledRating.toFixed(1));
}
