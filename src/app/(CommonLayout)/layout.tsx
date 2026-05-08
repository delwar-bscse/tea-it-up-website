import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: "Hayden",
  description: "Hayden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </body>
  );
}
