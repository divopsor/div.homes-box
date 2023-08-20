'use client';

import { Container } from "./components/ui/Container";
import { Spacing } from "./components/ui/Space";
import Providers from "./providers";
import Footer from "./components/Footer";
import { GlobalCss } from "./components/GlobalCss";
import { Stack } from "./components/ui/Stack";
import { Sidebar } from "./containers/Home/Sidebar";
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
            <Spacing size={60} />
            <Stack.Horizontal style={{
              gap: '100px',
              alignItems: 'flex-start'
            }}>
              <Stack.Vertical style={{
                width: '120px',
              }}>
                <Sidebar />
              </Stack.Vertical>

              <Stack.Vertical>
              {children}
              </Stack.Vertical>
            </Stack.Horizontal>
          </Providers>
          <Footer />
        </Container>
        <Portal.Context />
      </body>
      <GlobalCss />
    </html>
  )
}
