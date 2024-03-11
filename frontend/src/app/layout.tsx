import type { Metadata } from 'next'
import { Providers } from './providers'
import NavBar from '@/components/NavBar'
import { Container } from '@chakra-ui/react'
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "MusixMatch",
  description: "Your daily dose of good music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
      <main>
        <Providers>
          <Container sx={{
            height: '100vh',
            maxWidth: '1200px'
          }}>
            <NavBar/>
            {children}
            <Footer/>
          </Container>
        </Providers>
      </main>
      </body>
    </html>
  )
}
