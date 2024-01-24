

import styles from "./singleProduct.module.css"
import Image from "next/image";
import { ProductsProps } from "../page";

const SingleProductPage = async ({ params }: any) => {
  const { id } = params;
  // const product = await fetchProduct(id);
  const product: ProductsProps =
  {
    id: '1',
    img: 'https://images.pexels.com/photos/6690916/pexels-photo-6690916.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: "Sabão em Pó",
    name: "Omo",
    description: "Sabão em pó bom",
    price: 3545 / 100,
    stock: 45,
    createdAt: new Date()
  }


    async function updateProduct() {
      'use server'
      console.log('clicou em atualizar produto')
    }

return (
  <div className={styles.container}>
    <div className={styles.infoContainer}>
      <div className={styles.imgContainer}>
        <Image src="/noavatar.png" alt="" fill />
      </div>
      {product.title}
    </div>
    <div className={styles.formContainer}>
      <form action={updateProduct} className={styles.form}>
        <input type="hidden" name="id" value={product.id} />
        <label>Título</label>
        <input type="text" name="title" placeholder={product.title} />
        <label>Preço</label>
        <input type="number" name="price" placeholder={product.price.toString()} />
        <label>Estoque</label>
        <input type="number" name="stock" placeholder={product.stock.toString()} />
        <label>Categoria</label>
        <select name="cat" id="cat">
          <option value="kitchen">Kitchen</option>
          <option value="computers">Computers</option>
        </select>
        <label>Descrição</label>
        <textarea
          name="desc"
          id="desc"
          rows={10}
          placeholder={product.description}
        ></textarea>
        <button>Atualizar</button>
      </form>
    </div>
  </div>
);
};

export default SingleProductPage;