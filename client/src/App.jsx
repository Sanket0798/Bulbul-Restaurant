import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ComingSoon from './pages/ComingSoon'
import Home from './pages/Home'
import About from './pages/About'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Gallery from './pages/Gallery'
import Pricing from './pages/Pricing'
import Faqs from './pages/Faqs'
import Services from './pages/Services'
import Blogs from './pages/Blogs'
import SinglePost from './pages/SinglePost'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Temporary: show coming soon at root */}
        <Route path="/" element={<ComingSoon />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<SinglePost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
