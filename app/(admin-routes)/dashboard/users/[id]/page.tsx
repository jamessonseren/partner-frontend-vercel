import { fetchSingleUser } from '@/app/lib/actions';
import styles from '../../../../components/addUser/singleUser.module.css'
import Image from 'next/image';
import { CompanyUser } from '../page';
import Switch from 'react-switch'
import EditUserForm from '@/app/components/editUser/editUser';


const SingleUserPage = async ({ params }: any) => {

  const { id } = params
  const user: CompanyUser = await fetchSingleUser(id);

  async function updateUser() {
    'use server'
    return
  }
  return (
    <EditUserForm user={user}/>
  );
};

export default SingleUserPage