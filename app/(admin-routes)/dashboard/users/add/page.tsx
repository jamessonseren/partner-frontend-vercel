// import { addUser } from "@/app/lib/actions";

import AddUserForm from '@/app/components/addUser/addUser';
import { auth } from '@/app/lib/auth';


const AddUserPage = async () => {

  return (
    <>
      <AddUserForm />    
    </>
  );
};
export default AddUserPage;