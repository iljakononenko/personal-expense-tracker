const Router = require('express')
const router = new Router()
const transactionsRouter = require('./transactionsRouter')

router.use('', transactionsRouter);

module.exports = router;
