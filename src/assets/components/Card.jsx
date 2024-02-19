import { useState } from 'react';
import { Link } from 'react-router-dom';
import storedData from '../data';

function Card({ styles, item, shoppingCart, setShoppingCart, setDisplayAddedNoti }) {
  const [quantity, setQuantity] = useState(1);

  function handleQuantityClick(e) {
    if (e.target.textContent === '+') {
      setQuantity(() => quantity + 1);
    } else {
      if (quantity >= 2) {
        setQuantity(quantity - 1);
      }
    }
  }

  function handleAddToCart() {
    let isDuplicate = false;
    let newList;
    const price = item.price * quantity;
    const cartItems = shoppingCart.items;
    item.quantity = quantity;
    shoppingCart.items.map((product) => {
      if (product.id === item.id) {
        isDuplicate = true;
        const removeOriginalProduct = cartItems.filter((piece) => piece.id !== product.id);
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
          total: Number((shoppingCart.total + price).toFixed(2)),
        });
        setShoppingCart(() => {
          return { ...storedData.cart };
        });
      }
    });
    if (isDuplicate === false) {
      console.log('hello');
      storedData.setCart({
        items: [...shoppingCart.items, item],
        total: shoppingCart.total + price,
      });
      console.log(storedData.cart);
      setShoppingCart(() => {
        return { ...storedData.cart };
      });
    }

    setQuantity(() => 1);
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
