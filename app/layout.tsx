import "./global.css";
import Navbar from "@/components/navigation/Navbar";
import NextAuthProvider from "@/components/providers/NextAuthProvider";

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <NextAuthProvider> 
            <Navbar />
            <main>{children}</main>
          </NextAuthProvider>
        </body>
      </html>
    );
  }