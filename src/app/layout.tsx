import './styles/globals.scss';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wagerly',
  description: 'Social platform for sports betters and fans.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <div className='layout'>
          <div className='left-sidebar'>
            -
          </div>
          {children}
          <div className='right-sidebar'>
            -
          </div>
        </div>
      </body>
    </html>
  )
}
