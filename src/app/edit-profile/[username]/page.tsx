import getCurrentUser from "@/app/actions/getCurrentUser";
import FeedHeader from "@/app/components/feed-header/FeedHeader";
import EditProfileHeader from "@/app/components/profile/edit-profile-header/EditProfileHeader";

import styles from './Page.module.scss';
import EditProfileBody from "@/app/components/profile/edit-profile-body/EditProfileBody";

interface IParams {
 username: string;
}

const EditProfile = async ({ params }: { params: IParams }) => {
 const [currentUser] = await Promise.all([getCurrentUser()]);

 return (
  <div className={styles.main}>
   <FeedHeader
    label='Back'
    isBack
    currentUsername={currentUser?.username}
    currentUserPhoto={currentUser?.photo || '/images/placeholder.png'} />

   <EditProfileHeader />

   <EditProfileBody currentUser={currentUser} />

  </div>
 );
}

export default EditProfile;