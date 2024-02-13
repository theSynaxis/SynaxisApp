import parser from "html-react-parser";

export function parseHtml(html: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return parser(html);
}