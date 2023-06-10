import "./globals.css";

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
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
