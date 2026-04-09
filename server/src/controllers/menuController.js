const db = require('../config/db')

// GET /api/menu  — optionally filter by ?category=starters
const getMenu = async (req, res, next) => {
  try {
    const { category } = req.query
    const [rows] = category
      ? await db.query('SELECT * FROM menu_items WHERE category = ? AND is_available = 1', [category])
      : await db.query('SELECT * FROM menu_items WHERE is_available = 1')
    res.json({ success: true, data: rows })
  } catch (err) { next(err) }
}

// GET /api/menu/:id
const getMenuItem = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM menu_items WHERE id = ?', [req.params.id])
    if (!rows.length) return res.status(404).json({ success: false, message: 'Item not found' })
    res.json({ success: true, data: rows[0] })
  } catch (err) { next(err) }
}

// POST /api/menu  (admin)
const createMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, category, image_url } = req.body
    const [result] = await db.query(
      'INSERT INTO menu_items (name, description, price, category, image_url) VALUES (?,?,?,?,?)',
      [name, description, price, category, image_url]
    )
    res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } })
  } catch (err) { next(err) }
}

// PUT /api/menu/:id  (admin)
const updateMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, category, image_url, is_available } = req.body
    await db.query(
      'UPDATE menu_items SET name=?, description=?, price=?, category=?, image_url=?, is_available=? WHERE id=?',
      [name, description, price, category, image_url, is_available, req.params.id]
    )
    res.json({ success: true, message: 'Menu item updated' })
  } catch (err) { next(err) }
}

// DELETE /api/menu/:id  (admin)
const deleteMenuItem = async (req, res, next) => {
  try {
    await db.query('DELETE FROM menu_items WHERE id = ?', [req.params.id])
    res.json({ success: true, message: 'Menu item deleted' })
  } catch (err) { next(err) }
}

module.exports = { getMenu, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem }
