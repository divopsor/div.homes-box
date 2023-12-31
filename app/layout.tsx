'use client';

import { Container } from "./components/ui/Container";
import Providers from "./providers";
import Footer from "./components/Footer";
import { GlobalCss } from "./components/GlobalCss";
import { Header } from "./components/Header";
import { Portal } from "./components/Portal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      {/* add this */}
      <head>
        <link rel='icon' href='/box/favicon.ico'/>
        <title>creco's box</title>
      </head>
      <body>
        <Container width={1200}>
          <Header />

          <Providers>
            {children}
          </Providers>
          <Footer />
        </Container>
        <Portal.Context />
      </body>
      <GlobalCss />
    </html>
  )
}
