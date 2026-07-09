import "./globals.css";
import Header from "./Components/Header";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "WoodZeno",
  description:
    "This website is a modern furniture showcase platform designed to present high-quality home and office furniture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${ubuntu.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
