import Link from "next/link";
import "./globals.css";
import { Fugaz_One,Open_Sans } from 'next/font/google';
import { AuthProvider } from "@/context/AuthContext";


const fugaz = Fugaz_One({
  weight: ['400'], 
  subsets: ['latin'],
});

const opensans = Open_Sans({
  weight: ['400'], 
  subsets: ['latin'],
});



export const metadata = {
  title: "Mood Tracker",
  description: "Track your mood everyday",
};

const header = (
  <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
    <Link href={'/'}>
      <h1 className={'text-base sm:text-lg textGradient ' + fugaz.className}>Your Mood</h1>
    </Link>
    <div className="flex item-center justify-between">
      PLACEHOLDER
    </div>
  </header>
)
const footer = (
  <footer className="p-4 sm:p-8 grid place-items-center">
    <p className={"text-indigo-600 "+ fugaz.className}>Developed By <span className="textGradient ">SL-FireFlash </span> </p>
  </footer>
)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={"w-full max-w[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 " + opensans.className}>
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>

    </html>
  );
}
