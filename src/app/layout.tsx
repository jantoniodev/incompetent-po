import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Incompetent PO',
    description: 'Genera historias de usuario con IA',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            <body className={inter.className}>{children}</body>
        </html>
    )
}
