import { useState, useEffect, useRef } from "react"
import { Menu, X, Sparkles } from "lucide-react"
import Logo from "../assets/logo.svg"
import HacktoberLogo from "../assets/hacktober.svg"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState(null) // Default to null for no active state
  const [isScrolled, setIsScrolled] = useState(false)
  const logoRef = useRef(null)
  const canvasRef = useRef(null)

  const routes = ["About", "Preptember", "Mentors", "FAQ", "Contact"]

  // Scroll detection for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 50) // Change threshold as needed
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reset active state on page load
  useEffect(() => {
    // Check the URL and set active state accordingly
    const path = window.location.hash.slice(1); // Get the current route from URL hash
    if (routes.includes(path)) {
      setActive(path); // Set active to the current route
    } else {
      setActive(null); // If no match, set active to null
    }
  }, []) // Runs only on initial load

  useEffect(() => {
    const sections = ["Hero", ...routes].map(id => document.getElementById(id));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.id === "Hero") {
              setActive(null); // 👈 nothing active while Hero is visible
            } else if (routes.includes(entry.target.id)) {
              setActive(entry.target.id);
            }
          }
        });
      },
      {
        threshold: 0.3, // 60% of section must be visible to count
      }
    );

    sections.forEach(section => section && observer.observe(section));

    return () => {
      sections.forEach(section => section && observer.unobserve(section));
    };
  }, [routes]);

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const colors = ["rgba(194,194,255,0.6)", "rgba(138,134,255,0.5)", "rgba(90,90,181,0.4)", "rgba(73,63,112,0.3)"]
    canvas.width = window.innerWidth
    canvas.height = 80
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.8 + 0.2,
      pulse: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.x += p.speedX; p.y += p.speedY; p.phase += p.pulse
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10
        const pr = p.radius + Math.sin(p.phase) * 0.5
        const po = p.opacity + Math.sin(p.phase) * 0.2
        ctx.save(); ctx.globalAlpha = po
        ctx.beginPath(); ctx.arc(p.x, p.y, pr * 2, 0, 2 * Math.PI); ctx.fillStyle = p.color.replace(/[\d.]+\)$/g, "0.1)"); ctx.fill()
        ctx.beginPath(); ctx.arc(p.x, p.y, pr, 0, 2 * Math.PI); ctx.fillStyle = p.color; ctx.fill()
        ctx.restore()
        particles.slice(i + 1).forEach(o => {
          const d = Math.hypot(p.x - o.x, p.y - o.y)
          if (d < 100) { ctx.save(); ctx.globalAlpha = ((100 - d) / 100) * 0.2; ctx.strokeStyle = "rgba(138,134,255,0.3)"; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(o.x, o.y); ctx.stroke(); ctx.restore() }
        })
      })
      requestAnimationFrame(animate)
    }
    animate()
    window.addEventListener("resize", () => canvas.width = window.innerWidth)
    return () => window.removeEventListener("resize", () => canvas.width = window.innerWidth)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 font-atkinson transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl border-b border-[#8A86FF33] bg-[#1C1C3F] shadow-[0_8px_32px_rgba(28,28,63,0.5),inset_0_1px_0_rgba(138,134,255,0.1)]'
          : 'bg-transparent border-b border-transparent'
      }`} 
      style={{ fontFamily: '"Atkinson Hyperlegible", sans-serif' }}
    >
      {/* Canvas particles - only visible when scrolled */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 pointer-events-none w-full h-full transition-opacity duration-500 ${
          isScrolled ? 'opacity-80' : 'opacity-0'
        }`} 
      />
      
      {/* Background gradient - only visible when scrolled */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-[#8A86FF0D] via-[#5A5AB50A] to-[#C2C2FF0D] transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <div className="flex items-center space-x-3 text-2xl font-bold cursor-pointer">
          <a href="/#Hero">
            <div className="flex items-center space-x-3 text-2xl font-bold cursor-pointer transform transition-all duration-500 hover:scale-105">
              <img src={Logo} className="h-10 w-auto" />
              <img src={HacktoberLogo} alt="Extra Logo" className="h-10 w-auto" />
            </div>
          </a>
        </div>

        <div className="hidden md:flex space-x-2">
          {routes.map((route, i) => (
            <a
              key={route}
              href={`/#${route}`}
              onClick={() => setActive(route)}
              className={`relative px-5 py-2 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] ${active === route
                ? "bg-[#8A86FF33] text-white border border-[#8A86FF66]"
                : `text-white border border-transparent hover:border-[#D6DDE533] hover:bg-white/5 ${isScrolled ? 'hover:text-white' : 'hover:text-white'}`
                }`}
            >
              {route}
              
              {/* Corner brackets for desktop navigation */}
              <div className="absolute inset-0 opacity-0 hover:opacity-70 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white"></div>
              </div>
            </a>
          ))}
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-3 border border-[#D6DDE533] text-white focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-700 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pt-4 pb-6 space-y-3 backdrop-blur-xl border-t border-[#8A86FF33] bg-[#1C1C3F]">
          <div className="flex flex-col w-full">
            {routes.map(route => (
              <a
                key={route}
                href={`#${route}`}
                onClick={() => { setActive(route); setIsOpen(false) }}
                className="relative w-full text-left px-6 py-3 text-base font-semibold hover:scale-[1.02] hover:bg-white/5 transition-transform duration-300 text-white"
              >
                {route}

                {/* Corner brackets for mobile dropdown */}
                <div className="absolute inset-0 opacity-0 hover:opacity-70 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white"></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes gradient-shift{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}`}</style>
    </nav>
  )
}

export default Navbar
