import { useState, useEffect } from 'react';
import styles from '../styles/App.module.scss';
import Nav from './Nav';

function App() {
  const [status, setStatus] = useState('loading');
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch('https://fakestoreapi.com/products', { mode: 'cors' });
      const json = await response.json();
      setApiData([...json]);
      setStatus('done');
      console.log(json);
    }
    getData();
  }, []);

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <h1 className={styles.header}>
          The One Place You Can Get <br />
          Everything
        </h1>
        <section className={styles.cardsContainer}>
          {apiData ? (
            apiData.map((item) => {
              return (
                <div className={styles.card} key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className={styles.cardText}>
                    <p>{item.title}</p>

                    <div className={styles.price}>
                      <p>${item.price}</p>
                      <div className={styles.quantity}>
                        <p>Quantity:</p>
                        <p>1</p>
                        <button>+</button>
                        <button>-</button>
                      </div>
                    </div>
                    <button className={styles.addToCartBtn} id={item.id}>
                      Add to Cart
                    </button>
                  </div>
                </div>
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
