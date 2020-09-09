const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'My Shop - All Products',
        path: '/products',
      });
    })
    .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      console.log(product);
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product.title,
        path: '/products',
      })
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'My Shop',
        path: '/',
      })
    })
    .catch(err => console.log(err));;
}

exports.getCart = (req, res, next) => {
  Cart.getProducts(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProduct = cart.products.find(prod => prod.id === product.id);
        if (cartProduct) {
          cartProducts.push({ productData: product, qty: cartProduct.qty });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'My Shop - Your Cart',
        path: '/cart',
        products: cartProducts
      });
    });
  });
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'My Shop - Your Orders',
    path: '/orders'
  });
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart')
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'My Shop - Checkout',
    path: '/checkout'
  })
}