import { useState, useEffect } from 'react';
import styles from '../styles/App.module.scss';
import Nav from './Nav';
import Card from './Card';

function App() {
  const [apiData, setApiData] = useState(null);
  const [shoppingCart, setShoppingCart] = useState([]);

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
        <section className={styles.cardsContainer}>
          {apiData ? (
            apiData.map((item) => {
              return (
                <Card
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
        </section>
      </main>
    </>
  );
}

export default App;
