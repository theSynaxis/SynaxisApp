import parser from "html-react-parser";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate } from "date-fns";

/*
 * This parser is used throughout the dynamic WP pages and posts
 * to turn special character strings into the symbol they represent.
 * This function is needed, instead of importing the parser directly
 * into those components that need it so that we only need to turn
 * off the linter one time.
 *
 * Ideally, we wouldn't need to do this.
 */
export function parseHtml(html: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return parser(html);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const today = formatDate(new Date(), "EEEE, dd MMMM, y");
export const todayAsNumbers = formatDate(new Date(), "M/d");
