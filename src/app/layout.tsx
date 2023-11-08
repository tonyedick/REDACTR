import type { Metadata } from 'next'
import NavBar from "./components/navbar/NavBar";
import './globals.css'
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: 'Redactr App',
  description: 'Created by Dick Tonye',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#fff",
            },
          }}
        />
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  )
}
