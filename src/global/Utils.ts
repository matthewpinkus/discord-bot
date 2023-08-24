/**
 * Formats a YYYY-MM-DD date to human readable date
 */
export function formatDate(date: string) {
  // game.effectiveDate.substring(0, game.effectiveDate.indexOf('T'))
  const year = date.substring(0, date.indexOf("-"));
  const month = date.substring(year.length, date.indexOf("-"));
  const day = date.substring(month.length, date.indexOf("-"));
  console.log(`year: ${year} month: ${month} day: ${day}`);
}
