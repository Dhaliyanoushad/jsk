import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScoreProvider } from "./context/ScoreContext";
import ScoreBar from "./components/ScoreBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Goon or Orphan Classifier",
  description: "App to find your inclination and have fun",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-white ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScoreProvider>
          <ScoreBar />
          {children}
        </ScoreProvider>
      </body>
    </html>
  );
}
