"use client";

import { Inter } from "next/font/google";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          {children}
        </LocalizationProvider>
      </body>
    </html>
  );
}
