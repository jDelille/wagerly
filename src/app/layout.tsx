import './styles/globals.scss';

import getCurrentUser from './actions/getCurrentUser';
import getUsers from './actions/getUsers';
import Gamebar from './components/gamebar/Gamebar';
import MobileTopNav from './components/mobile-navbar/mobile-top-nav/MobileTopNav';
import BetSlip from './components/modals/bet-slip/BetSlip';
import NotLoggedInModal from './components/modals/not-logged-in/NotLoggedInModal';
import Nav from './components/nav/Nav';
import NavigationPanel from './components/navigation-panel/NavigationPanel';
import PostPreview from './components/post-preview/PostPreview';
import Search from './components/search/Search';
import CreatePost from './components/text-input/create-post/CreatePost';
import Auth from './components/user/auth/Auth';
import CurrentUserBox from './components/user/current-user-box/CurrentUserBox';
import Providers from './components/Providers';

export const metadata = {
  title: 'Wagerly',
  description: 'Social platform for sports betters and fans.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [currentUser, users] = await Promise.all([getCurrentUser(), getUsers()])

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className='layout'>
            <BetSlip currentUser={currentUser} />
            <NotLoggedInModal />
            <div className='left-sidebar'>
              {!currentUser ? (
                <Auth currentUser={currentUser} />
              ) : (
                <>
                  <Search />
                  <CurrentUserBox currentUser={currentUser} />
                  <PostPreview />
                  <CreatePost
                    users={users}
                  />
                </>
              )}
              <div className='disclaimer'>
                <p>Sports data is provided by ESPN. To learn more about the api used, <a href="https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b" target='_blank'>click here.</a></p>
                <p>To see what technologies are used in Wagerly and how it was built, checkout our <a href="https://github.com/jDelille/wagerly-production" target='_blank'>github repo</a></p>
              </div>
            </div>
            {children}
            <div className='right-sidebar'>
              <Nav currentUsername={currentUser?.username} hasNotification={currentUser?.hasNotification as boolean} />
            </div>
            <NavigationPanel currentUsername={currentUser?.username} />
          </div>
        </Providers>
      </body>
    </html>
  )
}
