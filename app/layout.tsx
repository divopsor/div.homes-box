'use client';

import { MainNav } from "./components/MainNav";
import { Container } from "./components/ui/Container";
import { Spacing } from "./components/ui/Space";
import Providers from "./providers";
import Footer from "./components/Footer";
import { GlobalCss } from "./components/GlobalCss";
import { Stack } from "./components/ui/Stack";
import { Sidebar } from "./containers/Home/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Container width={1200}>
          <Spacing size={20} />
          <MainNav />
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
      </body>
      <GlobalCss />
    </html>
  )
}
