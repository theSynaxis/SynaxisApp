import { TRPCReactProvider } from "~/trpc/react";
import { sourceSansPro, synaxisHeader } from "./fonts";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${sourceSansPro.variable} ${synaxisHeader.variable} bg-neutral-50`}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
