import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { QuizProvider } from "@/contexts/QuizContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "投資心理測驗 | 了解你的投資類型",
  description:
    "透過 10 道生活情境題，精準評測你的投資心理類型，獲得個人化資產配置建議。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-slate-50`}>
        <QuizProvider>
          <Navbar />
          <div className="flex-1 flex flex-col pt-16">{children}</div>
        </QuizProvider>
      </body>
    </html>
  );
}
