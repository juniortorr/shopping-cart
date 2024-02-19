class Storage {
  setData([...args]) {
    this.allProducts = [...args];
    console.log(this.allProducts);
  }
  setCart({ ...args }) {
    this.cart = { ...args };
  }
  getProductById(id) {
    const response = this.allProducts.filter((item) => item.id === Number(id));
    return response[0];
  }
  printCart() {
    console.log(this.cart);
  }
  setItems([...args]) {
    this.cart.items = [...args];
    console.log(this.cart);
  }
}

const storedData = new Storage();
storedData.setCart({ items: [], total: 0 });

export default storedData;
