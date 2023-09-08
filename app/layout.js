import "./globals.css";
import Header from "../components/webshop/header";
import { Toaster } from "react-hot-toast";
// import image from "../public/img/bg-image.png";

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
      <body className=" h-screen flex flex-col bg-[#f37c62]">
        <header className="h-min w-screen">
          <Header />
        </header>
        <main>{children}</main>
        <footer className="flex h-10 justify-center items-center w-screen mt-auto">
          <p className="mb-4">kaartenvaneva</p>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
