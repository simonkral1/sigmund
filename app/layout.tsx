import { cn } from '@/lib/utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata = {
  title: 'Sigmund - Podpora duševního zdraví',
  description: 'Váš důvěryhodný společník pro podporu duševního zdraví, využívající technologii Claude od Anthropic.',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body
        className={cn('min-h-screen bg-gray-50', inter.className)}
      >
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </body>
    </html>
  )
}



import './globals.css'