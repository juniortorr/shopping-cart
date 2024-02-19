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
    const items = new Array(quantity).fill(item);
    setShoppingCart({
      items: [...shoppingCart.items, ...items],
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
