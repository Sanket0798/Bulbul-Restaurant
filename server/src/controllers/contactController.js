const db = require('../config/db')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
})

// POST /api/contact
const sendMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body

    // Save to DB
    await db.query(
      'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?,?,?,?,?)',
      [name, email, phone || null, subject, message]
    )

    // Send email notification (non-blocking)
    transporter.sendMail({
      from: `"Bulbul Website" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `New Contact: ${subject}`,
      html: `<p><b>From:</b> ${name} (${email})</p><p><b>Phone:</b> ${phone}</p><p>${message}</p>`,
    }).catch(console.error)

    res.status(201).json({ success: true, message: 'Message sent successfully!' })
  } catch (err) { next(err) }
}

module.exports = { sendMessage }
