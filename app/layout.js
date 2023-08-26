import "./globals.css";
import Header from "../components/webshop/header";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "kaartenvaneva",
  description: "Kaarten van Eva",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🙃</text></svg>"
        ></link>
      </head>
      <body className="bg-gray-100">
        <header className="h-min w-screen ">
          <Header />
        </header>
        {children}
        <Toaster />.<footer></footer>
      </body>
    </html>
  );
}
