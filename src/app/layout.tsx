import getCurrentUser from './actions/getCurrentUser';
import Search from './components/search/Search';
import Auth from './components/user/auth/Auth';
import CurrentUserBox from './components/user/current-user-box/CurrentUserBox';
import './styles/globals.scss';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wagerly',
  description: 'Social platform for sports betters and fans.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [currentUser] = await Promise.all([getCurrentUser()])



  return (
    <html lang="en">

      <body className={inter.className}>
        <div className='layout'>
          <div className='left-sidebar'>
            {!currentUser ? (
              <Auth currentUser={currentUser} />
            ) : (
              <>
                <Search />
                <CurrentUserBox currentUser={currentUser} />
              </>
            )}
            <div className='disclaimer'>
              <p>Sports data is provided by ESPN. To learn more about the api used, <a href="https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b" target='_blank'>click here.</a></p>
              <p>To see what technologies are used in Wagerly and how it was built, checkout our <a href="https://github.com/jDelille/fullstack-next-prisma" target='_blank'>github repo</a></p>
            </div>
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
