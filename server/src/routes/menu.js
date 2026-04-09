const router = require('express').Router()
const { getMenu, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController')
const { protect, adminOnly } = require('../middleware/auth')

router.get('/',     getMenu)
router.get('/:id',  getMenuItem)
router.post('/',    protect, adminOnly, createMenuItem)
router.put('/:id',  protect, adminOnly, updateMenuItem)
router.delete('/:id', protect, adminOnly, deleteMenuItem)

module.exports = router
