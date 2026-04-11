import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LAUNCH_DATE = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)

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

function Orbs() {
  const orbsRef = useRef(null)
  useEffect(() => {
    const orbs = orbsRef.current.querySelectorAll('.orb')
    orbs.forEach((orb) => {
      gsap.set(orb, {
        x: gsap.utils.random(-80, 80),
        y: gsap.utils.random(-80, 80),
        scale: gsap.utils.random(0.6, 1.4),
      })
      gsap.to(orb, {
        x: `+=${gsap.utils.random(-100, 100)}`,
        y: `+=${gsap.utils.random(-100, 100)}`,
        duration: gsap.utils.random(6, 12),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
      gsap.to(orb, {
        opacity: gsap.utils.random(0.08, 0.22),
        duration: gsap.utils.random(3, 6),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
    })
  }, [])

  return (
    <div ref={orbsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="orb absolute rounded-full"
          style={{
            width:  `${[280,180,220,160,300,140][i]}px`,
            height: `${[280,180,220,160,300,140][i]}px`,
            background: i % 2 === 0 ? '#8A1B61' : '#3F3D56',
            filter: 'blur(80px)',
            opacity: 0.12,
            top:  `${[10,60,30,70,5,80][i]}%`,
            left: `${[5,70,40,15,80,50][i]}%`,
            transform: 'translate(-50%,-50%)',
          }}
        />
      ))}
    </div>
  )
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE)
  const [toast, setToast] = useState(false)
  const [emailError, setEmailError] = useState('')
  const toastRef = useRef(null)

  const handleNotify = (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value.trim()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    setToast(true)
    gsap.fromTo(toastRef.current,
      { y: -30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }
    )
    setTimeout(() => {
      gsap.to(toastRef.current, {
        y: -10, opacity: 0, duration: 0.35, ease: 'power2.in',
        onComplete: () => setToast(false),
      })
    }, 3500)
    e.target.reset()
  }

  const wrapperRef  = useRef(null)
  const tagRef      = useRef(null)
  const subtitleRef = useRef(null)
  const titleRef    = useRef(null)
  const descRef     = useRef(null)
  const timerRef    = useRef(null)
  const formRef     = useRef(null)
  const socialRef   = useRef(null)
  const dividerRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(tagRef.current,
        { y: -30, opacity: 0, letterSpacing: '0.6em' },
        { y: 0, opacity: 1, letterSpacing: '0.3em', duration: 1 }
      )
      .fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 }, '-=0.5'
      )
      .fromTo(titleRef.current.querySelectorAll('.title-char'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, '-=0.4'
      )
      .fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.7, transformOrigin: 'center' }, '-=0.3'
      )
      .fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, '-=0.3'
      )
      .fromTo(timerRef.current.querySelectorAll('.timer-block'),
        { y: 40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12 }, '-=0.3'
      )
      .fromTo(timerRef.current.querySelectorAll('.timer-sep'),
        { opacity: 0, scale: 0 },
        { opacity: 0.4, scale: 1, duration: 0.4, stagger: 0.1 }, '-=0.5'
      )
      .fromTo(formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, '-=0.2'
      )
      .fromTo(socialRef.current.querySelectorAll('a'),
        { y: 20, opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.3'
      )

    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  // seconds flip
  const secRef  = useRef(null)
  const prevSec = useRef(seconds)
  useEffect(() => {
    if (secRef.current && seconds !== prevSec.current) {
      prevSec.current = seconds
      gsap.fromTo(secRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [seconds])

  const pad = (n) => String(n).padStart(2, '0')

  const units = [
    { label: 'DAYS',    value: pad(days) },
    { label: 'HOURS',   value: pad(hours) },
    { label: 'MINUTES', value: pad(minutes) },
    { label: 'SECONDS', value: pad(seconds), ref: secRef },
  ]

  return (
    <section
      ref={wrapperRef}
      className="relative min-h-screen w-full flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `url('/images/brand/bg/BlackBg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Orbs />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 md:py-10 flex flex-col items-center gap-5">

        {/* Tag */}
        <h6 ref={tagRef} className="hidden md:block text-white tracking-[0.25em] text-[10px] sm:text-xs">
          BULBUL RESTAURANT
        </h6>

        {/* Mobile logo image — only visible on mobile */}
        <img
          src="/images/brand/bg/MobileBg.png"
          alt="Bulbul Restaurant"
          className="block sm:hidden w-48 object-contain"
        />

        {/* Subtitle */}
        <h2
          ref={subtitleRef}
          className="text-white text-2xl sm:text-3xl md:text-4xl leading-snug"
        >
          Something Awesome Is
        </h2>

        {/* Script title */}
        <h1
          ref={titleRef}
          className="text-white leading-none font-delafield"
          style={{ fontSize: 'clamp(52px, 14vw, 100px)' }}
        >
          {'Coming Soon'.split('').map((char, i) => (
            <span key={i} className="title-char" style={{ display: 'inline-block', opacity: 0 }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Divider */}
        <div ref={dividerRef} className="flex items-center gap-3 w-36 sm:w-48">
          <hr className="flex-1 border-white/30" />
          <span className="text-white/40 text-xs">✦</span>
          <hr className="flex-1 border-white/30" />
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="text-white/70 max-w-sm sm:max-w-md px-2"
          style={{ fontSize: '13px', lineHeight: '1.9' }}
        >
          We're crafting an extraordinary dining experience for you.
          Stay tuned — something delicious is on its way.
        </p>

        {/* Countdown */}
        <div
          ref={timerRef}
          className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 w-full mt-1"
        >
          {units.map(({ label, value, ref }, i) => (
            <div key={label} className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <div className="timer-block flex flex-col items-center px-2 sm:px-4 py-2 sm:py-3 rounded"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                  minWidth: 'clamp(56px, 16vw, 90px)',
                }}
              >
                <span
                  ref={ref || undefined}
                  className="text-white font-light font-gilda"
                  style={{
                    fontSize: 'clamp(28px, 7vw, 68px)',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  {value}
                </span>
                <span
                  className="text-white/50 mt-1 tracking-widest font-josefin"
                  style={{ fontSize: 'clamp(7px, 1.8vw, 11px)' }}
                >
                  {label}
                </span>
              </div>

              {i < units.length - 1 && (
                <span
                  className="timer-sep text-white/40 self-center pb-4 font-gilda"
                  style={{
                    fontSize: 'clamp(22px, 5vw, 50px)',
                    lineHeight: 1,
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Notify form */}
        <form
          ref={formRef}
          onSubmit={handleNotify}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2"
        >
          <div className="flex flex-col flex-1 gap-1">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={() => emailError && setEmailError('')}
              className={`px-4 py-3 bg-white/10 border text-white placeholder-white/40 outline-none transition-colors text-sm w-full font-josefin ${
                emailError ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-white/60'
              }`}
            />
            {emailError && (
              <span className="text-red-400 font-josefin text-left" style={{ fontSize: '11px' }}>
                {emailError}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn-outline-white whitespace-nowrap w-full sm:w-auto"
            style={{ fontSize: '14px', padding: '12px 24px' }}
          >
            Notify Me
          </button>
        </form>

        {/* Social */}
        <div ref={socialRef} className="flex items-center gap-3 sm:gap-4 mt-1">
          {['facebook-f', 'instagram', 'twitter', 'youtube'].map((icon) => (
            <a
              key={icon}
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/25 flex items-center justify-center text-white"
              style={{ fontSize: '13px' }}
              onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.2, backgroundColor: '#8A1B61', borderColor: '#8A1B61', duration: 0.3 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.25)', duration: 0.3 })}
            >
              <i className={`fa-brands fa-${icon}`} />
            </a>
          ))}
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div
          ref={toastRef}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded"
          style={{
            background: 'rgba(20,20,20,0.92)',
            border: '1px solid rgba(138,27,97,0.6)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(138,27,97,0.25)',
          }}
        >
          <span style={{ color: '#8A1B61', fontSize: '18px' }}>✓</span>
          <p className="text-white font-josefin" style={{ fontSize: '13px', letterSpacing: '0.05em' }}>
            You're on the list! We'll notify you at launch.
          </p>
        </div>
      )}

    </section>
  )
}
