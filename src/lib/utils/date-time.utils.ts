import { addMinutes, format, parseISO } from "date-fns";
import formatInTimeZone from "date-fns-tz/formatInTimeZone";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import { Deal, DealUpsert } from "~/lib/supabase/public-types";

const DATE_FORMAT = "yyyy-MM-dd";
const DATE_TIME_FORMAT_WITHOUT_TIMEZONE = DATE_FORMAT + "'T'HH:mm";
const DATE_TIME_FORMAT_WITH_TIMEZONE = DATE_TIME_FORMAT_WITHOUT_TIMEZONE + "XXX";

export function formatDateWithTimeZone(date: Date | string): string {
  return formatInTimeZone(date, "Europe/Berlin", DATE_TIME_FORMAT_WITH_TIMEZONE);
}

export function getDateTimeAsIsoString(date = new Date(), offsetInMinutes = 0, timezone = "Europe/Berlin"): string {
  const dateWithOffset = addMinutes(date, offsetInMinutes);
  return formatInTimeZone(dateWithOffset, timezone, DATE_TIME_FORMAT_WITHOUT_TIMEZONE);
}

export function getDateAsIsoString(date = new Date(), offsetInMinutes = 0, timezone = "Europe/Berlin"): string {
  const dateWithOffset = addMinutes(date, offsetInMinutes);
  return formatInTimeZone(dateWithOffset, timezone, DATE_FORMAT);
}

export function convertToTimeZonedDateTimeString(date: string | Date, timezone = "Europe/Berlin"): string {
  const timeZonedDate = utcToZonedTime(date, timezone);
  return getDateTimeAsIsoString(timeZonedDate);
}

export function formatDate(date: string | number, offsetInMinutes = 0, timezone = "Europe/Berlin"): string {
  const dateWithOffset = addMinutes(new Date(date), offsetInMinutes);
  return formatInTimeZone(dateWithOffset, timezone, "dd.MM.yyyy 'um' HH:mm");
}

function addTimezoneOffset(datetime: string): string {
  const date = new Date(datetime);
  const offsetInMinutes = date.getTimezoneOffset();
  const offsetInHours = Math.floor(Math.abs(offsetInMinutes) / 60);
  const offsetInMinutesRemainder = Math.abs(offsetInMinutes) % 60;

  return format(
    date,
    `${DATE_TIME_FORMAT_WITHOUT_TIMEZONE}${offsetInMinutes < 0 ? "+" : "-"}${offsetInHours
      .toString()
      .padStart(2, "0")}:${offsetInMinutesRemainder.toString().padStart(2, "0")}`
  );
}

function removeTimezoneOffset(datetime: string): string {
  const date = parseISO(datetime);
  return format(date, DATE_TIME_FORMAT_WITHOUT_TIMEZONE);
}

function addTimezoneOffsetToDeal(deal: Deal | DealUpsert) {
  deal.start = addTimezoneOffset(deal.start);
}

function removeTimezoneOffsetFromDeal(deal: Deal) {
  deal.start = removeTimezoneOffset(deal.start);
}

function getTimeString(datetime: string | Date = new Date(), timezone = "Europe/Berlin"): string {
  return formatInTimeZone(new Date(datetime), timezone, "HH:mm:ss");
}

export default {
  addTimezoneOffsetToDeal,
  getTimeString,
  removeTimezoneOffsetFromDeal,
  formatDateWithTimeZone
};
