import getCurrentUser from "@/app/actions/getCurrentUser";
import getNotifications from "@/app/actions/getNotifications";
import FeedHeader from "@/app/components/feed/feed-header/FeedHeader";
import Link from "next/link";

import styles from './Page.module.scss';

interface IParams {
 username: string;
}

const Notifications = async ({ params }: { params: IParams }) => {

 const [notifications, currentUser] = await Promise.all([getNotifications(params), getCurrentUser()])

 const noNotifications = notifications.length === 0

 return (
  <div className={styles.main}>
   <FeedHeader
    label='Notifications'
    isBack={false}
    currentUserPhoto={currentUser?.photo || '/images/placeholder.png'}
    currentUsername={currentUser?.username}
   />
   <div className={styles.content}>

    {noNotifications && (
     <div className={styles.noNotificationsMessage}>
      {"You don't have any notifications yet. When other people interact with you, you will see it here"}
     </div>
    )}

    {!noNotifications && notifications.map((notification) => (
     <div key={notification.id} className={styles.notification}>

      <p>@<Link href={`/user/${notification.username}`}>{notification.username}</Link> {notification.body}</p>
      {notification.postId && (
       <Link href={`/post/${notification.postId as string}`} className={styles.viewPostBtn}>View post</Link>
      )}
     </div>
    ))}
   </div>

  </div>
 );
}

export default Notifications;