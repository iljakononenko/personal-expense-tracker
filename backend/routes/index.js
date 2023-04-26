const Router = require('express')
const router = new Router()
const transactionsRouter = require('./transactionsRouter')
const userRouter = require('./userRouter')

router.use('', transactionsRouter);
router.use('/user', userRouter);

module.exports = router;
