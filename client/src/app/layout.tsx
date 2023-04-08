import "./globals.css";

export const metadata = {
  title: "Bezos Empire",
  description: "Bezos Empire Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
