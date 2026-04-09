require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const path    = require('path')

const authRoutes        = require('./routes/auth')
const menuRoutes        = require('./routes/menu')
const reservationRoutes = require('./routes/reservations')
const contactRoutes     = require('./routes/contact')
const errorHandler      = require('./middleware/errorHandler')

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth',         authRoutes)
app.use('/api/menu',         menuRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/contact',      contactRoutes)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }))

// ── Error Handler ───────────────────────────────────────────
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Bulbul server running on http://localhost:${PORT}`)
})
