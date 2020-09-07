const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {

  static addProduct(id, productPrice) {
    // Fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyse cart => find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      // Add new Product/Increase quantity
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice; // Esse "+" transforma para number
      fs.writeFile(p, JSON.stringify(cart), err => { console.log(err); });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(p => p.id === id);
      if(!product){
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(p => p.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), err => { console.log(err); });
    });
  }

  static getProducts(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if(err){
        cb(null);
      }else{
        cb(cart);
      }
    });   
  }

}