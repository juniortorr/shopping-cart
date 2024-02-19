import styles from '../styles/Nav.module.scss';
import storedData from '../data';
import { Link } from 'react-router-dom';

function Nav({ shoppingCart, isActive }) {
  function handleShowCart() {
    storedData.setCart(shoppingCart);
  }

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <h1 className={styles.h1}>Good Store</h1>
      </Link>

      {isActive ? (
        <button onClick={handleShowCart}>
          <img src="/shopping-cart.png" alt="shopping card icon" />
        </button>
      ) : (
        <Link to="cart">
          <button onClick={handleShowCart}>
            <img src="/shopping-cart.png" alt="shopping card icon" />
          </button>
        </Link>
      )}

      {shoppingCart > 0 && <p data-testid="shopping-cart">{shoppingCart.cart.items}</p>}
    </nav>
  );
}

export default Nav;
