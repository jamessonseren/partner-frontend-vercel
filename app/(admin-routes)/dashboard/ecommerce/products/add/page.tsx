// import { addProduct } from "@/app/lib/actions";
import styles from "./addProduct.module.css"

const AddProductPage = () => {

  async function addProduct(){
    'use server'
    alert('adicionou produto')
  }
  return (
    <div className={styles.container}>
      <form action={addProduct} className={styles.form}>
        <input type="text" placeholder="Título" name="title" required />
        <select name="cat" id="cat">
          <option value="general">Escolha uma categoria</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" placeholder="Preço" name="price" required />
        <input type="number" placeholder="Estoque" name="stock" required />
        <textarea
          required
          name="desc"
          id="desc"
          rows={16}
          placeholder="Descrição"
        ></textarea>
        <button type="submit">Criar produto</button>
      </form>
    </div>
  );
};

export default AddProductPage;