const express = require('express');
const router = express.Router();

const {createOrder, getUserOrder, getAllOrder, acceptOrder, deliveredOrder} = require('../controllers/Order');

router.post('/create-order', createOrder);
router.post('/user-order', getUserOrder);
router.post('/admin-order', getAllOrder);
router.post('/accept-order', acceptOrder);
router.post('/delivered-order', deliveredOrder);

module.exports = router;