import { useState } from 'react';

function Card({ styles, item, shoppingCart, setShoppingCart, allProducts }) {
  const [quantity, setQuantity] = useState(1);

  function handleQuantityClick(e) {
    if (e.target.textContent === '+') {
      setQuantity(() => quantity + 1);
    } else {
      if (quantity >= 2) {
        setQuantity(() => quantity - 1);
      }
    }
  }

  function handleAddToCart(e) {
    const id = Number(e.target.id);
    const item = allProducts.filter((product) => product.id === id);
    const items = new Array(quantity).fill(item[0]);
    setShoppingCart([...shoppingCart, ...items]);
  }

  return (
    <div className={styles.card} key={item.id}>
      <img src={item.image} alt={item.title} />
      <div className={styles.cardText}>
        <p>{item.title}</p>

        <div className={styles.price}>
          <p>${item.price}</p>
          <div className={styles.quantity}>
            <p>Quantity:</p>
            <p>{quantity}</p>
            <button onClick={handleQuantityClick}>+</button>
            <button onClick={handleQuantityClick}>-</button>
          </div>
        </div>
        <button
          data-testid={item.id}
          onClick={handleAddToCart}
          className={styles.addToCartBtn}
          id={item.id}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
