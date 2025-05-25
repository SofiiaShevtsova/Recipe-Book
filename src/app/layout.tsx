import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "../components/ui/provider";
import { ColorModeButton } from "@/components/ui/color-mode";

export const metadata: Metadata = {
  title: "Recipe Book",
  description:
    "Web application for managing and displaying your favorite recipes!",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Provider>
          {children}
          <ColorModeButton />
        </Provider>
      </body>
    </html>
  );
}
