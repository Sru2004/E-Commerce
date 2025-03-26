const express = require('express');
const router = express.Router();

const {createProduct, getAllProducts} = require('../controllers/Product');

router.post('/create', createProduct);
router.get('/get-all', getAllProducts);

module.exports = router;