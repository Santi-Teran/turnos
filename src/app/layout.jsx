import { Comfortaa } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata = {
  icons: {
    icon: "/turnover.svg",
  },
  title: "Turnover | Marea Tech",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
