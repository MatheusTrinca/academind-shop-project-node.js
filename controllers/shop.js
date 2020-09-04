const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products, 
      pageTitle: 'My Shop - All Products', 
      path: '/products', 
    });
  });
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail',{
      product: product, 
      pageTitle: product.title, 
      path: '/products', 
    })
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products, 
      pageTitle: 'My Shop', 
      path: '/', 
    });
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart',{
    pageTitle: 'My Shop - Your Cart',
    path: '/cart'
  });
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders',{
    pageTitle: 'My Shop - Your Orders',
    path: '/orders'
  });
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'My Shop - Checkout',
    path: '/checkout'
  })
}