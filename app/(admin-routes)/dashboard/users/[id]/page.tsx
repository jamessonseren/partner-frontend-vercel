import { fetchSingleUser } from '@/app/lib/actions';
import { CompanyUser } from '../page';
import EditUserForm from '@/app/components/editUser/editUser';


const SingleUserPage = async ({ params }: any) => {

  const { id } = params
  const user: CompanyUser = await fetchSingleUser(id);

  
  return (
    <EditUserForm user={user}/>
  );
};

export default SingleUserPage