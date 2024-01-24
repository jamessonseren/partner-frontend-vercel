
import Image from "next/image";
import Link from "next/link";
import styles from "./products.module.css"
import Search from '../../../../components/search/search'
import Pagination from "@/app/components/pagination/pagination";

export type ProductsProps = {
  id: string
  img: string
  title: string
  name: string
  description: string
  price: number
  stock: number
  createdAt: Date
}

const ProductsPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const { count, products } = await fetchProducts(q, page);

  // const count = 5
  const data: ProductsProps[] = [

    {
      id: '1',
      img: 'https://images.pexels.com/photos/6690916/pexels-photo-6690916.jpeg?auto=compress&cs=tinysrgb&w=600',
      title: "Sabão em Pó",
      name: "Omo",
      description: "Sabão em pó bom",
      price: 3545 / 100,
      stock: 45,
      createdAt: new Date()
    },
    // Novos produtos
    {
      id: '2',
      img: 'https://images.pexels.com/photos/18463824/pexels-photo-18463824/free-photo-of-fotografia-animal-fotografia-de-animais-passaro-ave.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      title: "Shampoo Revitalizante",
      name: "Head & Shoulders",
      description: "Shampoo para cabelos saudáveis",
      price: 1999 / 100,
      stock: 30,
      createdAt: new Date('2022-03-01')
    },
    {
      id: '3',
      img: 'https://images.pexels.com/photos/16061696/pexels-photo-16061696/free-photo-of-outono-declinio-nublado-campo.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      title: "Creme Dental Whitening",
      name: "Colgate",
      description: "Creme dental para dentes brancos",
      price: 2599 / 100,
      stock: 20,
      createdAt: new Date('2022-02-15')
    },
    {
      id: '4',
      img: 'https://images.pexels.com/photos/17088715/pexels-photo-17088715/free-photo-of-abandonado-perdido-arquitetura-arte.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      title: "Desodorante Roll-On Fresh",
      name: "Dove",
      description: "Desodorante com aroma refrescante",
      price: 1599 / 100,
      stock: 50,
      createdAt: new Date('2022-01-20')
    },
    {
      id: '5',
      img: 'https://images.pexels.com/photos/10964535/pexels-photo-10964535.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      title: "Papel Higiênico Ultra Soft",
      name: "Cottonelle",
      description: "Papel higiênico macio e resistente",
      price: 1899 / 100,
      stock: 40,
      createdAt: new Date('2022-04-10')
    },
    {
      id: '6',
      img: 'https://images.pexels.com/photos/10155090/pexels-photo-10155090.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      title: "Enxaguante Bucal Fresh Mint",
      name: "Listerine",
      description: "Enxaguante bucal para hálito fresco",
      price: 1399 / 100,
      stock: 25,
      createdAt: new Date('2022-03-25')
    },
    {
      id: '7',
      img: 'https://images.pexels.com/photos/19557055/pexels-photo-19557055/free-photo-of-pic-du-midi-d-ossau.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      title: "Barbeador Descartável",
      name: "Gillette",
      description: "Barbeador para um barbear suave",
      price: 899 / 100,
      stock: 35,
      createdAt: new Date('2022-02-05')
    },
    {
      id: '8',
      img: 'https://images.pexels.com/photos/19838367/pexels-photo-19838367/free-photo-of-broadway-arquitetura-construcao-predio.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      title: "Condicionador Reparador",
      name: "Pantene",
      description: "Condicionador para cabelos reparados",
      price: 2199 / 100,
      stock: 15,
      createdAt: new Date('2022-01-10')
    },
    {
      id: '9',
      img: 'https://images.pexels.com/photos/5563218/pexels-photo-5563218.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      title: "Algodão Hidrófilo",
      name: "Johnson & Johnson",
      description: "Algodão para cuidados com a pele",
      price: 1299 / 100,
      stock: 60,
      createdAt: new Date('2022-04-05')
    },
    {
      id: '10',
      img: 'https://images.pexels.com/photos/14661238/pexels-photo-14661238.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      title: "Sabonete Líquido Antibacteriano",
      name: "Dettol",
      description: "Sabonete líquido para proteção contra bactérias",
      price: 1799 / 100,
      stock: 28,
      createdAt: new Date('2022-03-15')
    },
    // Adicione mais produtos conforme necessário...
  ];

  async function fetchProduct(q: string, page: any) {
    
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 5;
    //fazer a busca da api para pegar os produtos
    //irá retornar uma lista de produtos

    const products = data
      .filter((product: ProductsProps) => regex.test(product.title))
      .slice(ITEM_PER_PAGE * (page - 1), ITEM_PER_PAGE * page);

      return { count: data.length, products }
  }

  const { count, products } = await fetchProduct(q, page)

  async function deleteProduct() {
    'use server'
    console.log("deletou produto")
  }
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Pesquise por um produto..." />
        <Link href="/dashboard/ecommerce/products/add">
          <button className={styles.addButton}>Adicionar novo</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Título</td>
            <td>Descrição</td>
            <td>Preço</td>
            <td>Criado em</td>
            <td>Estoque</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.img || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.createdAt?.toString().slice(4, 16)}</td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/ecommerce/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Visualizar
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Deletar
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ProductsPage;