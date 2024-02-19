class Storage {
  setData([...args]) {
    this.allProducts = [...args];
    console.log(this.allProducts);
  }
  getProductById(id) {
    const response = this.allProducts.filter((item) => item.id === Number(id));
    return response[0];
  }
}

const storedData = new Storage();

export default storedData;
