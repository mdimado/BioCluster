import { motion, useInView, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';
import WaveText from './Wavetext';
import { useNavigate } from "react-router-dom";


const timelineData = [
  {
    id: 1,
    date: "30th September 2025",
    title: "Preptember Workshop",
    description: "Preptember Workshop helps you gear up for the hackathon with idea-building, tool mastery, and teamwork skills.",
    buttonText: "Learn more",
    href: "/preptember"
  },
  {
    id: 2,
    date: "5th October 2025",
    title: "Registration Opens",
    description: "The registrations for Hacktoberfest 2025 opens for all the students."
  },
  {
    id: 3,
    date: "15th October 2025", 
    title: "Registration Closes",
    description: "Registration period ends."
  },
  {
    id: 4,
    date: "17th October 2025", 
    title: "Git/GitHub Workshop",
    description: "An introduction to Git and GitHub, covering the fundamentals of version control and how teams collaborate on projects, as we gear up for the hackathon."
  },
  {
    id: 5,
    date: "18th October 2025",
    title: "Hackathon Day 1 Begins!",
    description: "4:00 PM - Opening Ceremony\n5:30 PM - Releasing Problem Statements\n6:30 PM - Problem Statement Finalization\n7:00 PM - Coding Begins\n1:30 AM - Ice-Breaker Session 1"
  },
  {
    id: 6,
    date: "19th October 2025",
    title: "Day 2 & Closing",
    description: "8:00 AM - Ice Breaker Session 2\n1:30 PM - Submissions Open\n2:00 PM - Coding Ends\n2:30 PM - Submissions Close\n3:00 PM - Presentations\n6:30 PM - Closing Ceremony"
  }
];

const TimelineItem = ({ item, index, isLast }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.3 });
  const isLeft = index % 2 === 0;

  // Spotlight animation values
  const spotlightOpacity = useMotionValue(0);
  
  useEffect(() => {
    if (isInView) {
      // Animate spotlight in
      spotlightOpacity.set(0.7);
    } else {
      // Animate spotlight out
      spotlightOpacity.set(0);
    }
  }, [isInView, spotlightOpacity]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1
      }
    }
  };

  const dotVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.1 + 0.3
      }
    }
  };

  return (
    <div ref={ref} className="relative mb-8">
      {/* Mobile Layout (default) */}
      <div className="flex items-start md:hidden">
        {/* Left dot for mobile - precisely centered on left-4 line */}
        <motion.div
          variants={dotVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-20 flex items-center justify-center mt-2 mr-4"
          style={{ marginLeft: '7px' }}
        >
          <div className="w-5 h-5 bg-gradient-to-r from-[#A0A0FF] to-[#5A5AB5] rounded-full border-2 border-[#C2C2FF]/50 shadow-lg shadow-[#A0A0FF]/50 ring-4 ring-[#A0A0FF]/20" />
        </motion.div>
        
        {/* Card for mobile */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex-1"
        >
          <div className="relative group overflow-hidden">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"></div>
            
            {/* Spotlight overlay */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-10"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)`,
                opacity: spotlightOpacity
              }}
              animate={{
                opacity: isInView ? 0.8 : 0,
                scale: isInView ? [0.8, 1.2, 1] : 0.8
              }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
            />
            
            {/* Card content */}
            <div className="relative p-6 bg-[#1C1C3F] border-2 border-[#8A86FF]/50 shadow-2xl transition-all duration-300 z-20" style={{
              boxShadow: '6px 6px 0px #493F70',
            }}>
              {/* Timer-style date display */}
              <div className="inline-flex items-center px-4 py-2 bg-[#1C1C3F] border border-[#8A86FF]/30 mb-4">
                <div className="text-sm font-bold text-[#8A86FF] tracking-wider" style={{
                  fontFamily: "'Atkinson Hyperlegible', sans-serif"
                }}>
                  {item.date}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg" style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                textShadow: '2px 2px 0px #5A5AB5'
              }}>
                {item.title}
              </h3>
              
              <div className="text-sm text-[#CFCFFF] whitespace-pre-line mb-4 leading-relaxed" style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif"
              }}>
                {item.description}
              </div>
              
              {item.buttonText && (
                <button 
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#A0A0FF] to-[#5A5AB5] rounded-full border-2 border-[#A0A0FF]/50 hover:from-[#C2C2FF] hover:to-[#A0A0FF] hover:shadow-lg hover:shadow-[#A0A0FF]/25 transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(160,160,255,0.5)]"
                  style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    boxShadow: '3px 3px 0px #1C1C3F'
                  }}
                  onClick={() => console.log(`${item.buttonText} clicked for ${item.title}`)}
                >
                  {item.buttonText}
                  <span className="ml-2">→</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Layout (md and above) - Properly aligned */}
      <div className="hidden md:block relative w-full">
        {/* Central dot - positioned using Framer Motion transform */}
        <motion.div
          variants={dotVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ translateX: '-50%' }}
          className="absolute left-1/2 top-6 z-30 flex items-center justify-center"
        >
          <div className="w-5 h-5 bg-gradient-to-r from-[#A0A0FF] to-[#5A5AB5] rounded-full border-2 border-[#C2C2FF]/50 shadow-lg shadow-[#A0A0FF]/50 ring-4 ring-[#A0A0FF]/20" />
        </motion.div>

        {/* Content container */}
        <div className="flex items-start w-full relative">
          {/* Left side card or empty space */}
          <div className="w-1/2 pr-12">
            {isLeft && (
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -100,
                    scale: 0.8
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.1
                    }
                  }
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-full"
              >
                <div className="relative group overflow-hidden">
                  {/* Glassmorphism background */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"></div>
                  
                  {/* Spotlight overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 80%)`,
                      opacity: spotlightOpacity
                    }}
                    animate={{
                      opacity: isInView ? 0.9 : 0,
                      scale: isInView ? [0.7, 1.3, 1.1] : 0.7
                    }}
                    transition={{
                      duration: 2.5,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Card content */}
                  <div className="relative p-6 bg-[#1C1C3F] border-2 border-[#8A86FF]/50 shadow-2xl transition-all duration-300 z-20" style={{
                    boxShadow: '6px 6px 0px #493F70',
                  }}>
                    {/* Timer-style date display */}
                    <div className="inline-flex items-center px-4 py-2 bg-[#1C1C3F] border border-[#8A86FF]/30 mb-4">
                      <div className="text-sm font-bold text-[#8A86FF] tracking-wider" style={{
                        fontFamily: "'Atkinson Hyperlegible', sans-serif"
                      }}>
                        {item.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg" style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif",
                      textShadow: '2px 2px 0px #5A5AB5'
                    }}>
                      {item.title}
                    </h3>
                    
                    <div className="text-sm text-[#CFCFFF] whitespace-pre-line mb-4 leading-relaxed" style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif"
                    }}>
                      {item.description}
                    </div>
                    
                    {item.buttonText && (
                      <button 
                        className="cursor-pointer inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#A0A0FF] to-[#5A5AB5] rounded-full border-2 border-[#A0A0FF]/50 hover:from-[#C2C2FF] hover:to-[#A0A0FF] hover:shadow-lg hover:shadow-[#A0A0FF]/25 transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(160,160,255,0.5)]"
                        style={{
                          fontFamily: "'Atkinson Hyperlegible', sans-serif",
                          boxShadow: '3px 3px 0px #1C1C3F'
                        }}
                        onClick={() => navigate("/preptember")}
                      >
                        {item.buttonText}
                        <span className="ml-2">→</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right side card or empty space */}
          <div className="w-1/2 pl-12">
            {!isLeft && (
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 100,
                    scale: 0.8
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.1
                    }
                  }
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-full"
              >
                <div className="relative group overflow-hidden">
                  {/* Glassmorphism background */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"></div>
                  
                  {/* Spotlight overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 80%)`,
                      opacity: spotlightOpacity
                    }}
                    animate={{
                      opacity: isInView ? 0.9 : 0,
                      scale: isInView ? [0.7, 1.3, 1.1] : 0.7
                    }}
                    transition={{
                      duration: 2.5,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Card content */}
                  <div className="relative p-6 bg-[#1C1C3F] border-2 border-[#8A86FF]/50 shadow-2xl transition-all duration-300 z-20" style={{
                    boxShadow: '6px 6px 0px #493F70',
                  }}>
                    {/* Timer-style date display */}
                    <div className="inline-flex items-center px-4 py-2 bg-[#1C1C3F] border border-[#8A86FF]/30 mb-4">
                      <div className="text-sm font-bold text-[#8A86FF] tracking-wider" style={{
                        fontFamily: "'Atkinson Hyperlegible', sans-serif"
                      }}>
                        {item.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg" style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif",
                      textShadow: '2px 2px 0px #5A5AB5'
                    }}>
                      {item.title}
                    </h3>
                    
                    <div className="text-sm text-[#CFCFFF] whitespace-pre-line mb-4 leading-relaxed" style={{
                      fontFamily: "'Atkinson Hyperlegible', sans-serif"
                    }}>
                      {item.description}
                    </div>
                    
                    {item.buttonText && (
                      <button 
                        className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#A0A0FF] to-[#5A5AB5] rounded-full border-2 border-[#A0A0FF]/50 hover:from-[#C2C2FF] hover:to-[#A0A0FF] hover:shadow-lg hover:shadow-[#A0A0FF]/25 transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(160,160,255,0.5)]"
                        style={{
                          fontFamily: "'Atkinson Hyperlegible', sans-serif",
                          boxShadow: '3px 3px 0px #1C1C3F'
                        }}
                        onClick={() => navigate("/preptember")}
                      >
                        {item.buttonText}
                        <span className="ml-2">→</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress to line height - stop exactly at last checkpoint
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], [0, 0.83]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div id="Timeline" className="scroll-mt-20 min-h-screen relative py-16 px-4 overflow-hidden" style={{
      background: '#1C1C3F',
      borderTop: '4px solid #8A86FF',
      borderBottom: '4px solid #8A86FF'
    }}>
      {/* Theme-matched background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#8A86FF]/5 rounded-none blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-[#5A5AB5]/5 rounded-none blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#C2C2FF]/5 rounded-none blur-3xl animate-pulse delay-500"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C3F]/40 to-transparent"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            background: `
              linear-gradient(to right, rgba(138, 134, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(90, 90, 181, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Dynamic Twinkling Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => {
            const starTypes = ['dot', 'star', 'plus'];
            const colors = ['text-blue-300', 'text-purple-300', 'text-cyan-300', 'text-blue-400'];
            const dotColors = ['bg-blue-300', 'bg-purple-300', 'bg-cyan-300', 'bg-blue-400'];
            
            const type = starTypes[i % 3];
            const isEven = i % 2 === 0;
            const position = {
              top: `${10 + (i * 5)}%`,
              left: isEven ? `${8 + (i * 2.5)}%` : 'auto',
              right: isEven ? 'auto' : `${6 + (i * 3)}%`,
            };
            
            const animationDelay = `${(i * 0.3)}s`;
            const animationDuration = `${2.5 + (i % 3)}s`;
            
            return (
              <div 
                key={i}
                className="absolute"
                style={position}
              >
                {type === 'dot' ? (
                  <div 
                    className={`w-1 h-1 ${dotColors[i % 4]} rounded-full animate-ping`}
                    style={{animationDelay, animationDuration}}
                  />
                ) : type === 'star' ? (
                  <div 
                    className={`${colors[i % 4]} animate-pulse text-xs`}
                    style={{animationDelay, animationDuration}}
                  >
                    ✦
                  </div>
                ) : (
                  <div 
                    className={`${colors[i % 4]} animate-pulse text-xs`}
                    style={{animationDelay, animationDuration}}
                  >
                    ✚
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black mb-4 justify-center" style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif",
            color: '#FFFFFF',
            textShadow: '3px 3px #5A5AB5, 6px 6px #1C1C3F',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            TIMELINE
          </h2>
          <div className="text-lg text-[#CFCFFF] max-w-2xl mx-auto drop-shadow-lg" style={{
            fontFamily: "'Atkinson Hyperlegible', sans-serif"
          }}>
            Follow our journey through key milestones and important events
          </div>
        </div>

        {/* Timeline Container */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Mobile timeline line */}
          <motion.div
            style={{ scaleY: lineHeight }}
            className="absolute left-4 top-0 w-1 h-full bg-gradient-to-b from-[#A0A0FF] to-[#5A5AB5] origin-top shadow-lg shadow-[#A0A0FF]/50 z-10 md:hidden"
          />

          {/* Desktop timeline line - centered using Framer Motion */}
          <motion.div
            style={{ scaleY: lineHeight, translateX: '-50%' }}
            className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-[#A0A0FF] to-[#5A5AB5] origin-top shadow-lg shadow-[#A0A0FF]/50 z-10 hidden md:block"
          />

          {/* Timeline items */}
          <div className="relative z-10">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLast={index === timelineData.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};


export default Timeline;
