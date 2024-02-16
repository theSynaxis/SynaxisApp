import { TRPCReactProvider } from "~/trpc/react";
import { sourceSansPro, synaxisHeader } from "../fonts";
import HeaderMenu from "~/components/layout/header-menu";
import Footer from "~/components/layout/footer";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen font-sans ${sourceSansPro.variable} ${synaxisHeader.variable} w-full bg-neutral-50`}
      >
        <div className="max-w-7xl">
          <HeaderMenu />
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
