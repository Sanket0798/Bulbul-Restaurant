const db = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length) return res.status(400).json({ success: false, message: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 12)
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?,?,?)',
      [name, email, hashed]
    )
    const token = generateToken(result.insertId, 'user')
    res.status(201).json({ success: true, token, data: { id: result.insertId, name, email, role: 'user' } })
  } catch (err) { next(err) }
}

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    if (!rows.length) return res.status(401).json({ success: false, message: 'Invalid credentials' })

    const user = rows[0]
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' })

    const token = generateToken(user.id, user.role)
    res.json({ success: true, token, data: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) { next(err) }
}

// GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.user.id])
    if (!rows.length) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, data: rows[0] })
  } catch (err) { next(err) }
}

module.exports = { register, login, getMe }
