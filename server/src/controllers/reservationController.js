const db = require('../config/db')

// POST /api/reservations
const createReservation = async (req, res, next) => {
  try {
    const { name, email, phone, date, time, guests, special_requests } = req.body
    const [result] = await db.query(
      `INSERT INTO reservations (name, email, phone, date, time, guests, special_requests)
       VALUES (?,?,?,?,?,?,?)`,
      [name, email, phone, date, time, guests, special_requests || null]
    )
    res.status(201).json({
      success: true,
      message: 'Reservation confirmed! We will contact you shortly.',
      data: { id: result.insertId }
    })
  } catch (err) { next(err) }
}

// GET /api/reservations  (admin)
const getReservations = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservations ORDER BY date DESC, time DESC')
    res.json({ success: true, data: rows })
  } catch (err) { next(err) }
}

// PATCH /api/reservations/:id/status  (admin)
const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body // pending | confirmed | cancelled
    await db.query('UPDATE reservations SET status = ? WHERE id = ?', [status, req.params.id])
    res.json({ success: true, message: 'Status updated' })
  } catch (err) { next(err) }
}

module.exports = { createReservation, getReservations, updateStatus }
