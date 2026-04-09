const router = require('express').Router()
const { createReservation, getReservations, updateStatus } = require('../controllers/reservationController')
const { protect, adminOnly } = require('../middleware/auth')

router.post('/',              createReservation)
router.get('/',               protect, adminOnly, getReservations)
router.patch('/:id/status',   protect, adminOnly, updateStatus)

module.exports = router
