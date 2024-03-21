import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "...",
};

export default function NotFound() {
  return (
    <>
      <title>404 Not Found</title>
      <main className="flex min-h-[620px] flex-col items-center text-neutral-900">
        <div className="container flex flex-col items-center">
          <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
          </div>
        </div>
      </main>
    </>
  );
}
