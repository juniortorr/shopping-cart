import styles from '../styles/Nav.module.scss';

function Nav() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.h1}>Good Store</h1>
      <button>
        <img src="/shopping-cart.png" alt="shopping card icon" />
      </button>
    </nav>
  );
}

export default Nav;
