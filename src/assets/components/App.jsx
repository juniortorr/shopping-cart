import { useState, useEffect } from 'react';
import styles from '../styles/App.module.scss';
import Nav from './Nav';
import Card from './Card';
import AddedToCart from './Add-cart-alert';
import { Outlet } from 'react-router-dom';

function App() {
  const [apiData, setApiData] = useState(null);
  const [shoppingCart, setShoppingCart] = useState({ items: [], total: 0 });
  const [displayAddedNoti, setDisplayAddedNoti] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch('https://fakestoreapi.com/products', { mode: 'cors' });
      const json = await response.json();
      setApiData([...json]);
      console.log(json);
    }
    getData();
  }, []);

  return (
    <>
      <Nav shoppingCart={shoppingCart} />
      <main className={styles.main}>
        <h1 className={styles.header}>
          The One Place You Can Get <br />
          Everything
        </h1>
        {displayAddedNoti === true && <AddedToCart setDisplayAddedNoti={setDisplayAddedNoti} />}
        <section className={styles.cardsContainer}>
          {apiData ? (
            apiData.map((item) => {
              return (
                <Card
                  setDisplayAddedNoti={setDisplayAddedNoti}
                  shoppingCart={shoppingCart}
                  setShoppingCart={setShoppingCart}
                  allProducts={apiData}
                  key={item.id}
                  styles={styles}
                  item={item}
                />
              );
            })
          ) : (
            <h2>loading...</h2>
          )}
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default App;
