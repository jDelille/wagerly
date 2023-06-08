import getUserByUsername from "@/app/actions/getUserByUsername";

interface IParams {
 username?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {

 const user = await getUserByUsername(params)


 return (
  <div>
   <h1>This is {user?.username}s profile!</h1>
  </div>
 );
}

export default ProfilePage;