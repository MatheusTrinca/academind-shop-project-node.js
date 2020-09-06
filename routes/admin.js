const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProducts);

// /admin/add-products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProducts);

// podemos ter o mesmo caminho quando os metodos são diferetes (GET/POST)

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product')

module.exports = router;
