const express = require('express');
const router = express.Router();

const {register, login, cart, getCart, delCart, userInfo, updateInfo, emptyCart, wishlist, getWishlist, delWishlist, manageUser} = require('../controllers/User');

router.post('/register', register);
router.post('/login', login);
router.post('/add-cart', cart);
router.post('/get-cart', getCart);
router.post('/del-cart', delCart);
router.post('/info', userInfo);
router.post('/update-info', updateInfo);
router.post('/empty-cart', emptyCart);

router.post('/add-wishlist', wishlist);
router.post('/get-wishlist', getWishlist);
router.post('/del-wishlist', delWishlist);

router.post('/users', manageUser);

module.exports = router;