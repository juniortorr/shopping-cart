import { useState } from 'react';
import { Link } from 'react-router-dom';

function Card({ styles, item, shoppingCart, setShoppingCart, allProducts, setDisplayAddedNoti }) {
  const [cardInfo, setCardInfo] = useState({
    item: { ...item },
    quantity: 1,
  });

  function handleQuantityClick(e) {
    if (e.target.textContent === '+') {
      setCardInfo({
        ...item,
        quantity: cardInfo.quantity + 1,
      });
    } else {
      if (cardInfo.quantity >= 2) {
        setCardInfo({
          ...item,
          quantity: cardInfo.quantity - 1,
        });
      }
    }
  }

  function handleAddToCart(e) {
    const id = Number(e.target.id);
    const item = allProducts.filter((product) => product.id === id);
    const items = new Array(cardInfo.quantity).fill(item[0]);
    console.log(cardInfo);
    const quantity = cardInfo.quantity;
    const price = item[0].price * cardInfo.quantity;
    const cartTotal = shoppingCart.total;
    console.log(quantity, cartTotal);
    const cartItems = shoppingCart.items;
    setShoppingCart(() => {
      return { items: [...cartItems, ...items], total: cartTotal + price };
    });
    setCardInfo({ item: { ...item }, quantity: 1 });
    setDisplayAddedNoti(() => true);
  }

  return (
    <div className={styles.card} key={item.id}>
      <Link to={'/product/' + item.id} state={{ cart: shoppingCart }}>
        <img src={item.image} alt={item.title} />
      </Link>

      <div className={styles.cardText}>
        <p>{item.title}</p>

        <div className={styles.price}>
          <p>${item.price}</p>
          <div className={styles.quantity}>
            <p>Quantity:</p>
            <p>{cardInfo.quantity}</p>
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
