import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "../components/molecules/Header";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { OrdersProvider } from "@/context/orders/OrdersContext";
import { Providers } from "@/context/providers";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loja da Zélia",
  description: "A melhor loja de produtos do Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body className={poppins.className}>
        <Providers>
          <ToastContainer />
          <Header />

          <div
            className="bg-neutral py-2 md:py-10"
            style={{ height: "100%", minHeight: "100vh" }}
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
