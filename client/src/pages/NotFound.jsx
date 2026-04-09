import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(37,35,53,0.8),rgba(37,35,53,0.8)), url('/images/bg/error.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-white" style={{ fontSize: 'clamp(80px,15vw,180px)' }}>404</h1>
      <h2 className="text-white mb-4">Page Not Found</h2>
      <p className="text-white/70 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-outline-white" style={{ fontSize: '16px' }}>Back to Home</Link>
    </div>
  )
}
