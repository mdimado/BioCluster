import React, { useEffect, useRef } from 'react';
import { Twitter, Facebook, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import Logo from "../assets/logo.svg" 
import HacktoberLogo from "../assets/hacktober.svg"

const Footer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 400;
    
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#8A86FF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const socialLinks = [
    { href: "https://www.facebook.com/cbitosc/", Icon: Facebook },
    { href: "https://twitter.com/cbitosc/", Icon: Twitter },
    { href: "https://www.instagram.com/cbitosc/", Icon: Instagram },
    { href: "https://www.linkedin.com/company/cbitosc/", Icon: Linkedin }
  ];

  const footerLinks = [
    { href: "https://hacktoberfest.com", text: "Hacktoberfest" },
    { href: "https://cbitosc.github.io/", text: "CBIT Open Source Community" },
    { href: "https://cbitosc.github.io/coc/", text: "Code of Conduct" }
  ];

  const HexCard = ({ title, content, icon = ">" }) => (
    <div className="relative group">
      <div
        className="relative transition-all duration-300 group-hover:scale-[1.01] p-6"
        style={{
          backgroundColor: '#1C1C3F',
          border: '2px solid #493F70',
          boxShadow: '4px 4px 0px #8A86FF'
        }}
      >
        <div className="flex items-start gap-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#8A86FF' }}
          >
            <span className="text-white font-bold text-xl">{icon}</span>
          </div>
          <div className="flex-1">
            <h3 
              className="text-white text-2xl font-bold mb-3 group-hover:text-[#C2C2FF] transition-colors"
              style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif" }}
            >
              {title}
            </h3>
            <p 
              className="text-lg leading-relaxed"
              style={{ 
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                color: '#C2C2FF' 
              }}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <footer 
      className="relative py-20 px-6 overflow-hidden"
      style={{ backgroundColor: '#1C1C3F' }}
    >
      {/* Unique Footer Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        {[...Array(12)].map((_, i) => {
          const shapes = ['◆', '▲', '●', '■', '◇', '△'];
          const colors = ['#493F70', '#8A86FF', '#C2C2FF'];
          
          const position = {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          };
          
          const animationDelay = `${(i * 0.5)}s`;
          const animationDuration = `${6 + (i % 4)}s`;
          
          return (
            <div 
              key={i}
              className="absolute animate-bounce"
              style={{
                ...position,
                color: colors[i % 3],
                animationDelay,
                animationDuration
              }}
            >
              <div 
                className="text-2xl opacity-30"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  animation: `spin ${animationDuration} linear infinite`
                }}
              >
                {shapes[i % shapes.length]}
              </div>
            </div>
          );
        })}

        {/* Diagonal lines pattern */}
        {[...Array(8)].map((_, i) => {
          const position = {
            top: `${i * 12}%`,
            left: `${i * 10}%`,
          };
          
          return (
            <div 
              key={`line-${i}`}
              className="absolute opacity-20 animate-pulse"
              style={{
                ...position,
                width: '200px',
                height: '2px',
                backgroundColor: '#8A86FF',
                transform: `rotate(${30 + i * 15}deg)`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '4s'
              }}
            />
          );
        })}

        {/* Code-like brackets */}
        {[...Array(6)].map((_, i) => {
          const brackets = ['{ }', '< >', '[ ]', '( )', '</>', '{}'];
          const position = {
            top: `${20 + (i * 12)}%`,
            right: `${5 + (i * 8)}%`,
          };
          
          return (
            <div 
              key={`bracket-${i}`}
              className="absolute animate-pulse font-mono text-lg opacity-25"
              style={{
                ...position,
                color: '#C2C2FF',
                animationDelay: `${i * 0.8}s`,
                animationDuration: '3s'
              }}
            >
              {brackets[i]}
            </div>
          );
        })}

        {/* Gradient mesh overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div 
            className="w-full h-full"
            style={{
              background: 'linear-gradient(135deg, #8A86FF 0%, transparent 50%, #C2C2FF 100%)'
            }}
          />
        </div>

        {/* Bottom wave pattern */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path 
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" 
              fill="#8A86FF"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 opacity-30 pointer-events-none w-full h-full" />
      
      <div className="relative z-10 container mx-auto">
        <div className="flex flex-col gap-8 justify-between items-center">
          <div className="flex flex-col-reverse gap-8 lg:flex-row w-full py-6">
            
            {/* Left Section */}
            <div className="flex gap-4 flex-col flex-1">
              <div>
                <div className="flex gap-4">
                  <img src={Logo} alt="Main Logo" className="h-10 w-auto cursor-pointer" 
                       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
                  <img src={HacktoberLogo} alt="Extra Logo" className="h-10 w-auto cursor-pointer"
                       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
                </div>
                <p 
                  className="text-xl font-bold pt-4 text-white"
                  style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif" }}
                >
                  Hacktoberfest 2025<br />CBIT Open Source Community
                </p>
              </div>
              
              <div>
                <p 
                  className="py-2 text-base"
                  style={{ 
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    color: '#C2C2FF' 
                  }}
                >
                  Follow us on Social Media for Updates
                </p>
                <div className="flex gap-4">
                  {socialLinks.map(({ href, Icon }) => (
                    <a key={href} href={href}
                       className="text-3xl hover:scale-110 transition-all duration-300"
                       style={{ 
                         color: '#C2C2FF',
                         filter: 'drop-shadow(0 0 8px #8A86FF)'
                       }}
                       onMouseEnter={(e) => e.target.style.color = '#8A86FF'}
                       onMouseLeave={(e) => e.target.style.color = '#C2C2FF'}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex-[2] flex flex-col gap-6 justify-between">
              <HexCard 
                title="What we do?"
                content={<>We're a community dedicated to advancing open‑source culture. We host <strong className="text-white">hackathons</strong>, conduct <strong className="text-white">bootcamps</strong>, and run <strong className="text-white">workshops</strong> to equip students with the skills they need to thrive in tech.</>}
              />
              
              <HexCard 
                title="Join us on this journey"
                content={<><strong className="text-white">Hacktoberfest</strong> isn't just an event — it's a chance to be part of something bigger and make an impact in tech. Whether you're a <strong className="text-white">seasoned developer</strong>, a <strong className="text-white">curious beginner</strong>, or someone with a passion for technology, we invite you to join us.</>}
              />
            </div>
          </div>

          {/* Bottom Links */}
          <div 
            className="w-full flex flex-col justify-start items-start gap-4 lg:flex-row lg:justify-between pt-6 px-6 py-4 transition-all duration-300 hover:scale-[1.01]"
            style={{
              backgroundColor: '#1C1C3F',
              border: '2px solid #493F70',
              boxShadow: '4px 4px 0px #8A86FF'
            }}
          >
            {footerLinks.map(({ href, text }) => (
              <a key={href} href={href} target="_blank"
                 className="transition-colors text-base flex items-center gap-2 group hover:scale-105"
                 style={{
                   fontFamily: "'Atkinson Hyperlegible', sans-serif",
                   color: '#C2C2FF'
                 }}
                 onMouseEnter={(e) => e.target.style.color = '#8A86FF'}
                 onMouseLeave={(e) => e.target.style.color = '#C2C2FF'}
              >
                {text}
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;