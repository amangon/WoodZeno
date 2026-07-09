import "./globals.css";

export const metadata = {
  title: "WoodZeno",
  description: "WoodZeno Furniture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}