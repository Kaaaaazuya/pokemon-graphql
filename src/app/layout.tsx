"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "urql";
import { client } from "@/lib/graphql";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider value={client}>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
