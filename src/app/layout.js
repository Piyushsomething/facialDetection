import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata = {
  title: "FRDL",
  description: "FRDL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="h-screen flex flex-col">
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
