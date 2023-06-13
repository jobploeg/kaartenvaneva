import Sidebar from "../../components/dashboard/sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        <aside>
          <Sidebar />
        </aside>
        <main className="md:w-5/6 md:absolute md:right-0 px-5 md:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}
