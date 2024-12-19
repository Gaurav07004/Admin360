/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const { getProducts, createProduct } = require('../services/productService');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getProducts).post(protect, createProduct);

module.exports = router;