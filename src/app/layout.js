import "./globals.css";

export const metadata = {
  title: "DevCake",
  description:
    "Confeitaria DevCake: bolos artesanais para seu café e seu código.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
