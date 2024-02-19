import styles from '../styles/Add-cart-alert.module.scss';

function AddedToCart({ setDisplayAddedNoti }) {
  function handleClick() {
    setDisplayAddedNoti(() => false);
  }
  return (
    <div className={styles.alert}>
      <h2>Added to Cart!</h2>
      <button className={styles.escape} onClick={handleClick}>
        X
      </button>
    </div>
  );
}

export default AddedToCart;
