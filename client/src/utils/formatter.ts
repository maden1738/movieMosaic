export function extractYear(timestampStr: string): string {
  const dateObj = new Date(timestampStr);
  return dateObj.getFullYear().toString();
}

export function convertRating(rating: number): number {
  const scaledRating = (rating / 10) * 5;
  return Number(scaledRating.toFixed(1));
}
