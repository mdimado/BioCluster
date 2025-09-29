import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What is CBIT Hacktoberfest Hackathon?",
    answer:
      "The CBIT Hacktoberfest Hackathon 2025 is a thrilling 24-hour hackathon that inspires students and enthusiasts through community, collaboration and skill-building. Participants will embrace the spirit of open source while diving into innovation and teamwork."
  },
  {
    question: "Who can participate?",
    answer:
      "Anyone! This hackathon is open to students of all skill levels, whether you're a complete beginner or an experienced coder. No prior hackathon experience is required. If you're curious, motivated, and ready to learn, you're welcome to join!"
  },
  {
    question: "Is there a registration fee?",
    answer:
      "No, CBIT Hacktoberfest Hackathon 2025 is completely free to join and participate in."
  },
  {
    question: "Is this event open to beginners?",
    answer:
      "Absolutely! This hackathon is beginner-friendly. Students of all skill levels are welcome to participate and learn."
  },
  {
    question: "What is Open Source?",
    answer:
      "Open Source refers to software whose source code is freely available for anyone to view, modify, and distribute. It promotes collaboration and transparency in software development."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div
      id="FAQ"
      className="scroll-mt-20 relative py-20 px-6 overflow-hidden"
      style={{ backgroundColor: '#1C1C3F' }}
    >
      {/* Background effects matching Contact section */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated background elements */}
        {[...Array(15)].map((_, i) => {
          const colors = ['#493F70', '#8A86FF', '#C2C2FF'];
          const sizes = ['w-2 h-2', 'w-1 h-1', 'w-3 h-3'];
          
          const position = {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          };
          
          const animationDelay = `${(i * 0.7)}s`;
          const animationDuration = `${4 + (i % 3)}s`;
          
          return (
            <div 
              key={i}
              className="absolute animate-pulse"
              style={position}
            >
              <div 
                className={`${sizes[i % 3]} rounded-full animate-ping`}
                style={{
                  backgroundColor: colors[i % 3],
                  animationDelay,
                  animationDuration
                }}
              />
            </div>
          );
        })}

        {/* Star symbols */}
        {[...Array(6)].map((_, i) => {
          const position = {
            top: `${15 + (i * 15)}%`,
            left: `${5 + (i * 15)}%`,
          };
          
          const animationDelay = `${(i * 1)}s`;
          
          return (
            <div 
              key={`star-${i}`}
              className="absolute animate-pulse"
              style={{
                ...position,
                color: '#8A86FF'
              }}
            >
              <div 
                className="text-xl opacity-40"
                style={{
                  animationDelay,
                  animationDuration: '5s'
                }}
              >
                ✦
              </div>
            </div>
          );
        })}

        {/* Large background glows */}
        <div className="absolute top-1/4 left-16 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-20"
             style={{ backgroundColor: '#8A86FF' }}></div>
        <div className="absolute bottom-1/4 right-16 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 opacity-15"
             style={{ backgroundColor: '#C2C2FF' }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2
            className="heading"
            // style={{
            //   fontFamily: "'Atkinson Hyperlegible', sans-serif",
            //   color: '#C2C2FF',
            //   textShadow: '3px 3px #8A86FF, 6px 6px #493F70',
            //   letterSpacing: '3px',
            //   textTransform: 'uppercase'
            // }}
          >
            <span>&#123;</span> FAQ <span>&#125;</span>
          </h2>
          {/* <motion.p 
            className="text-xl"
            style={{
              fontFamily: "'Atkinson Hyperlegible', sans-serif",
              color: '#8A86FF'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Frequently Asked Questions about Hacktoberfest
          </motion.p> */}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div
                className="relative transition-all duration-300 group-hover:scale-[1.01]"
                style={{
                  backgroundColor: '#1C1C3F',
                  border: '2px solid #493F70',
                  boxShadow: '4px 4px 0px #8A86FF'
                }}
              >
                <motion.button
                  className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <span 
                    className="text-xl font-bold text-white pr-4"
                    style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif" }}
                  >
                    {faq.question}
                  </span>
                  <motion.span 
                    className="font-bold text-3xl flex-shrink-0"
                    style={{ color: '#C2C2FF' }}
                    animate={{ rotate: openIndex === index ? 0 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === index ? "−" : "+"}
                  </motion.span>
                </motion.button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        className="px-8 pb-6 leading-relaxed text-lg"
                        style={{
                          fontFamily: "'Atkinson Hyperlegible', sans-serif",
                          color: '#C2C2FF'
                        }}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </div>
  );
};

export default FAQ;