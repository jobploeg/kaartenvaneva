import Sidebar from "../../components/sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        <aside>
          <Sidebar />
        </aside>
        <main className="w-5/6 absolute right-0">{children}</main>
      </body>
    </html>
  );
}
