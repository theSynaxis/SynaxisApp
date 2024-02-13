import { TRPCReactProvider } from "~/trpc/react";
import { sourceSansPro, synaxisHeader } from "./fonts";
import HeaderMenu from "~/components/layout/header-menu";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${sourceSansPro.variable} ${synaxisHeader.variable} w-full bg-neutral-50`}
      >
        <HeaderMenu />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
