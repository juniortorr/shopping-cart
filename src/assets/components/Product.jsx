import styles from '../styles/Product.module.scss';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Product() {
  const location = useLocation();
  const item = location.state.item;

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
            <p>{location.state.quantity}</p>
            <button>+</button>
            <button>-</button>
          </div>
        </div>
      </div>
      <p className={styles.desc}>{item.description}</p>
    </div>
  );
}

export default Product;
