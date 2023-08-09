'use client'

import Footer from "@divops/component-footer";
import "./styles/index.css";
import { MainNav } from "./components/MainNav";
import { Container } from "./components/ui/Container";
import { Spacing } from "./components/ui/Space";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Container width={1200}>
          <Spacing size={10} />
          <MainNav />
          <Providers>{children}</Providers>
          <Footer />
        </Container>
      </body>
    </html>
  )
}
