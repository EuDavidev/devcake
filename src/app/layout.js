import "./globals.css";

export const metadata = {
  title: "DevCake",
  description: "O acompanhamento perfeito para seu café e seu código.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
