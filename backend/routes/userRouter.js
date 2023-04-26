const Router = require('express')
const router = new Router;
const userController = require('../controllers/userController')

router.get('/', userController.get)
router.put('/', userController.edit)

module.exports = router
