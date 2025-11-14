import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rastera",
  description: "No-code GeoAI platform for raster analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: "#020617", color: "#e5e7eb" }}>
        {children}
      </body>
    </html>
  );
}
