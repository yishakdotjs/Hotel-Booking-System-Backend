const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')

const PaymentController = require('../../controller/paymentController')

router.post('/add_payment', PaymentController.addPayment)
router.put('/update_payment',PaymentController.updatePayment)
router.delete('/delete_payment',PaymentController.deletePayment)
router.get('/find_payment',PaymentController.getPaymentByPaymentID)
router.get('/list_user_payment',PaymentController.getUserPayment)
router.get('/list_all_payments',PaymentController.listAllPayments)
//check if it's fully paid before payment

module.exports = router;