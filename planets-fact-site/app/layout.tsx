import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { antonio } from "./lib/fonts";

export const metadata: Metadata = {
  title: "The Planets Fact",
  description:
    "The Planets Fact is a website dedicated to providing information about the planets in our solar system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon-32x32.png"
        />
      </head>
      <body className={clsx([antonio.variable, "font-sans"])}>{children}</body>
    </html>
  );
}
