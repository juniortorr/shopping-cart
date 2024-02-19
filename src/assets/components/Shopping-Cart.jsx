import storedData from '../data';
import Nav from './Nav';
import styles from '../styles/Shopping-Cart.module.scss';
import { useState } from 'react';

function ShoppingCart() {
  storedData.printCart();
  const [cart, setCart] = useState(storedData.cart);
  console.log(cart);

  function handleRemoveItem(e) {
    const deletedItem = cart.items.filter((item) => item.id === Number(e.target.id));
    const updatedItems = cart.items.filter((item) => item.id !== Number(e.target.id));
    storedData.setCart({
      items: [...updatedItems],
      total: Number((cart.total - deletedItem[0].price * deletedItem[0].quantity).toFixed(2)),
    });
    setCart({ ...storedData.cart });
  }
  return (
    <>
      <Nav shoppingCart={storedData} isActive={true} />
      <main className={styles.cartMain}>
        <section className={styles.cartContainer}>
          <div className={styles.cartHeader}>
            <h1>Your Cart!</h1>
            <h2>Total: {cart.total}</h2>
            <button>Continue Shopping</button>
            <button>Submit Order</button>
          </div>

          <section>
            {cart.items.map((item) => {
              return (
                <div key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.title} />
                  <div className={styles.itemInfo}>
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                    <p>{item.quantity}</p>
                    <button id={item.id} onClick={handleRemoveItem}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </main>
    </>
  );
}

export default ShoppingCart;
