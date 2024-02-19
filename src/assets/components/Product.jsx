import styles from '../styles/Product.module.scss';
import { useState } from 'react';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import storedData from '../data';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const item = await storedData.getProductById(params.productId);
  return { item };
}

function Product() {
  const navigate = useNavigate();
  const { item } = useLoaderData();
  const [shoppingCart, setShoppingCart] = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  function handleChangeQuantity(e) {
    if (e.target.textContent === '+') {
      setQuantity(() => quantity + 1);
    } else {
      if (quantity >= 2) {
        setQuantity(() => quantity - 1);
      }
    }
  }

  function handleAddToCart() {
    let isDuplicate = false;
    let newList;
    item.quantity = quantity;
    shoppingCart.items.map((product) => {
      if (product.id === item.id) {
        isDuplicate = true;
        const removeOriginalProduct = shoppingCart.items.filter((piece) => piece.id !== product.id);
        console.log(removeOriginalProduct);
        const updatedProduct = product;
        updatedProduct.quantity = product.quantity + quantity;
        if (removeOriginalProduct.length === 0) {
          newList = [updatedProduct];
        } else {
          newList = [...removeOriginalProduct, updatedProduct];
        }
        storedData.setCart({
          items: [...newList],
          total: Number((shoppingCart.total + item.price * quantity).toFixed(2)),
        });
        setShoppingCart(() => {
          return { ...storedData.cart };
        });
      }
      if (isDuplicate === false) {
        console.log('hello');
        storedData.setCart({
          items: [...shoppingCart.items, item],
          total: Number((shoppingCart.total + item.price * quantity).toFixed(2)),
        });
        console.log(storedData.cart);
        setShoppingCart(() => {
          return { ...storedData.cart };
        });
      }
    });
    setShoppingCart({
      items: [...shoppingCart.items, item],
      total: shoppingCart.total + item.price * quantity,
    });
    navigate('/');
  }

  return (
    <div className={styles.product}>
      <Link to={'/'}>
        <button className={styles.close}>X</button>
      </Link>

      <img src={item.image} alt={item.title} />

      <div className={styles.productInfo}>
        <h2>{item.title}</h2>

        <div className={styles.price}>
          <p>${item.price}</p>
          <div className={styles.quantity}>
            <p>Quantity:</p>
            <p>{quantity}</p>
            <button onClick={handleChangeQuantity}>+</button>
            <button onClick={handleChangeQuantity}>-</button>
          </div>
        </div>
      </div>
      <p className={styles.desc}>{item.description}</p>
      <button onClick={handleAddToCart} className={styles.addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
