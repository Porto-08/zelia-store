import { Poppins } from "next/font/google";
import Header from "../components/molecules/Header";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { Providers } from "@/context/providers";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Loja da Zélia",
  description: "A melhor loja de produtos do Brasil.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["loja", "produtos", "compras", "vendas", "pagamentos", "clientes"],
  authors: [
    {
      name: "Samuel Porto",
      url: "https://www.linkedin.com/in/samuelporto/",
    },
  ],
  icons: [
    { rel: "frango icon", url: "./chicken.jpg" },
    { rel: "chicken icon", url: "./chicken2.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <head>
        <title>
          {metadata.title} | {metadata.description}
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.authors[0].name} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta name="theme-color" content="#060930" />
        <link rel="manifest" href={metadata.manifest} />
      </head>
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
