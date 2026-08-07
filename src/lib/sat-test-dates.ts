export type SatTestDate = {
  date: string; // YYYY-MM-DD
  confirmed: boolean;
};

// Official College Board SAT test dates (satsuite.collegeboard.org/sat/dates-deadlines),
// which apply to both U.S. and international administrations.
// "Confirmed" dates are open for registration; "anticipated" 2027-28 dates
// are College Board's published but not-yet-finalized schedule.
export const SAT_TEST_DATES: SatTestDate[] = [
  { date: "2026-08-22", confirmed: true },
  { date: "2026-09-12", confirmed: true },
  { date: "2026-10-03", confirmed: true },
  { date: "2026-11-07", confirmed: true },
  { date: "2026-12-05", confirmed: true },
  { date: "2027-03-06", confirmed: true },
  { date: "2027-05-01", confirmed: true },
  { date: "2027-06-05", confirmed: true },
  { date: "2027-08-28", confirmed: false },
  { date: "2027-09-18", confirmed: false },
  { date: "2027-10-02", confirmed: false },
  { date: "2027-11-06", confirmed: false },
  { date: "2027-12-04", confirmed: false },
  { date: "2028-03-04", confirmed: false },
  { date: "2028-05-06", confirmed: false },
  { date: "2028-06-03", confirmed: false },
];

export function formatSatTestDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function upcomingSatTestDates(fromIso: string = new Date().toISOString().slice(0, 10)) {
  return SAT_TEST_DATES.filter((d) => d.date >= fromIso);
}
