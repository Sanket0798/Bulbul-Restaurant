import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// Target launch date — update this when ready
const LAUNCH_DATE = new Date('2025-12-31T00:00:00')

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE)
  const heroRef   = useRef(null)
  const titleRef  = useRef(null)
  const subRef    = useRef(null)
  const timerRef  = useRef(null)
  const formRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(titleRef.current,  { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
        .fromTo(subRef.current,    { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
        .fromTo(timerRef.current,  { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.5')
        .fromTo(formRef.current,   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  const units = [
    { label: 'DAYS',    value: pad(days) },
    { label: 'HOURS',   value: pad(hours) },
    { label: 'MINUTES', value: pad(minutes) },
    { label: 'SECONDS', value: pad(seconds) },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(37,35,53,0.75), rgba(37,35,53,0.85)), url('/images/bg/coming.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative blurred circles */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-20"
           style={{ background: '#8A1B61', filter: 'blur(100px)' }} />
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 rounded-full opacity-20"
           style={{ background: '#8A1B61', filter: 'blur(100px)' }} />

      <div className="relative z-10 px-4 max-w-3xl mx-auto flex flex-col items-center gap-8">

        {/* Logo */}
        <div ref={titleRef}>
          <h6 className="text-white tracking-[0.3em] mb-3">BULBUL RESTAURANT</h6>
          <h2 className="text-white">Something Awesome Is</h2>
          <h1 className="text-white" style={{ fontFamily: 'var(--font-delafield)', fontSize: 'clamp(64px,10vw,120px)' }}>
            Coming Soon
          </h1>
        </div>

        <p ref={subRef} className="text-white/80 max-w-md" style={{ fontSize: '14px', lineHeight: '1.8' }}>
          We're crafting an extraordinary dining experience for you. Stay tuned — something delicious is on its way.
        </p>

        {/* Countdown */}
        <div ref={timerRef} className="flex items-center justify-center gap-6 md:gap-12 w-full">
          {units.map(({ label, value }, i) => (
            <div key={label} className="flex items-center gap-6 md:gap-12">
              <div className="flex flex-col items-center">
                <span
                  className="text-white font-light"
                  style={{ fontFamily: 'var(--font-gilda)', fontSize: 'clamp(40px,7vw,80px)', lineHeight: 1 }}
                >
                  {value}
                </span>
                <h6 className="text-white/60 mt-2">{label}</h6>
              </div>
              {i < units.length - 1 && (
                <span className="text-white/40 self-start mt-2"
                      style={{ fontFamily: 'var(--font-gilda)', fontSize: 'clamp(32px,5vw,60px)' }}>
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Notify form */}
        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 px-5 py-3 bg-white/10 border border-white/30 text-white placeholder-white/50 outline-none focus:border-white/70 transition-colors"
            style={{ fontFamily: 'var(--font-josefin)', fontSize: '14px' }}
          />
          <button type="submit" className="btn-outline-white whitespace-nowrap" style={{ fontSize: '14px', padding: '12px 28px' }}>
            Notify Me
          </button>
        </form>

        {/* Social links */}
        <div className="flex items-center gap-4 mt-2">
          {['facebook-f', 'instagram', 'twitter', 'youtube'].map((icon) => (
            <a
              key={icon}
              href="#"
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#8A1B61] hover:border-[#8A1B61] transition-all duration-300"
            >
              <i className={`fa-brands fa-${icon} text-sm`} />
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
