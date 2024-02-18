import styles from '../styles/Nav.module.scss';

function Nav({ shoppingCart }) {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.h1}>Good Store</h1>
      <button>
        <img src="/shopping-cart.png" alt="shopping card icon" />
      </button>
      {shoppingCart.length > 0 && <p data-testid="shopping-cart">{shoppingCart.length}</p>}
    </nav>
  );
}

export default Nav;
