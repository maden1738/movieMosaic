export function extractYear(timestampStr: string): string {
  const dateObj = new Date(timestampStr);
  return dateObj.getFullYear().toString();
}

//Jul 02 2024
export function extractDate(timestamp: string): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options).replace(/,/g, "");
}

export function extractDayAndMonth(timestamp: string): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };

  return date.toLocaleDateString("en-US", options).replace(/,/g, "");
}

export function convertRating(rating: number): number {
  const scaledRating = (rating / 10) * 5;
  return Number(scaledRating.toFixed(1));
}

export function convertIntoStar(rating: number) {
  let ratings = "";
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      ratings += `<i class="fa-solid fa-star "></i>`;
    } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
      ratings += `<i class="fa-solid fa-star-half-stroke  "></i>`;
    }
  }

  return ratings;
}
