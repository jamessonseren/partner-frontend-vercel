import styles from '../add/singleUser.module.css'
import Image from 'next/image';

const SingleUserPage = async ( params: string) => {
  
    // const { id } = params;
    // const user = await fetchUser(id);
    
    async function updateUser(){
        'use server'
        return
    }
    const user: any = {}
    return (
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.imgContainer}>
            <Image src={user.img || "/noavatar.png"} alt="" fill/>
          </div>
          {user.username}
        </div>
        <div className={styles.formContainer}>
          <form action={updateUser} className={styles.form}>
            <input type="hidden" name="id" value={user.id}/>
            <label>Username</label>
            <input type="text" name="username" placeholder={user.username} />
            <label>Email</label>
            <input type="email" name="email" placeholder={user.email} />
            <label>Password</label>
            <input type="password" name="password" />
            <label>Phone</label>
            <input type="text" name="phone" placeholder={user.phone} />
            <label>Address</label>
            <textarea name="address" placeholder='{user.address}' />
            <label>Is Admin?</label>
            <select name="isAdmin" id="isAdmin">
              <option  selected={user.isAdmin}>Yes</option>
              <option selected={!user.isAdmin}>No</option>
            </select>
            <label>Is Active?</label>
            <select name="isActive" id="isActive">
              <option selected={user.isActive}>Yes</option>
              <option selected={!user.isActive}>No</option>
            </select>
            <button>Update</button>
          </form>
        </div>
      </div>
    );
  };

export default SingleUserPage