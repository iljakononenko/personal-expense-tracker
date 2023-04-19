const Router = require('express')
const router = new Router;
const transactionsController = require('../controllers/transactionsController')

router.get('/transactions', transactionsController.getAll)
router.get('/futureTransactions', transactionsController.getFutureTransactions)
router.post('/transactions', transactionsController.create)
router.put('/transactions', transactionsController.edit)
router.delete('/transactions/:id', transactionsController.remove)

module.exports = router
