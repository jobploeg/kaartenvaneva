import "./globals.css";
import Header from "../components/webshop/header";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

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
      {/* <body className="h-screen bg-cover bg-[url('../public/img/bg-cool2.png')] bg-fixed bg-no-repeat "> */}
      <body
        className={`h-screen flex flex-col bg-[#eae8dc] ${poppins.className}`}
      >
        {/* <body
        className={`h-screen flex flex-col bg-fixed bg-cover bg-no-repeat bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-red-100 via-red-200 to-red-400 ${poppins.className}`}
      ></body> */}
        {/* <body
        className={`h-screen flex flex-col background-theme bg-no-repeat bg-fixed bg-cover ${poppins.className} scroll-smooth`}
      > */}
        <header className="h-min w-screen mb-10">
          <Header />
        </header>
        <main>{children}</main>
        <footer className="flex h-10 justify-center items-center w-screen mt-32">
          <p className={`mb-4 text-[#e85a4f]`}>kaartenvaneva</p>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
