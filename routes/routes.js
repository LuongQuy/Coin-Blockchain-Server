const express = require('express');
const router = express.Router();

const coinController = require('../controllers/coinController');

router.post('/addCoin', coinController.addCoin);
router.get('/getCoin', coinController.getCoin);
router.post('/withdrawEth', coinController.withdrawEth);
router.get('/getHistory', coinController.getHistory);
module.exports = router;