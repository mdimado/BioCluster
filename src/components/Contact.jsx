import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const ContactCard = ({ icon, title, content, href, index, noIconBackground }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.3 });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative h-full"
    >
      {/* Card background using brand colors */}
      <div className="relative p-8 transition-all duration-300 group-hover:scale-[1.02] h-full flex flex-col" 
           style={{
             backgroundColor: '#1C1C3F',
             border: '2px solid #493F70',
             boxShadow: '4px 4px 0px #8A86FF',
             minHeight: '320px'
           }}>
        
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 mb-6 mx-auto"
             style={{ backgroundColor: noIconBackground ? 'transparent' : '#C2C2FF' }}>
          <div style={{ color: noIconBackground ? '#C2C2FF' : '#1C1C3F' }}>
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-3xl font-bold mb-6 text-center text-white"
            style={{
              fontFamily: "'Atkinson Hyperlegible', sans-serif"
            }}>
          {title}
        </h3>

        {/* Content */}
        <div className="text-center mb-8 whitespace-pre-line leading-relaxed text-lg flex-grow"
             style={{
               fontFamily: "'Atkinson Hyperlegible', sans-serif",
               color: '#C2C2FF'
             }}>
          {content}
        </div>

        {/* Buttons - positioned at bottom with sharp edges */}
        <div className="flex justify-center mt-auto">
          {href.startsWith('mailto:') || href.startsWith('tel:') ? (
            <a
              href={href}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                backgroundColor: '#C2C2FF',
                color: '#1C1C3F',
                border: '2px solid #C2C2FF'
              }}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Contact
            </a>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Atkinson Hyperlegible', sans-serif",
                backgroundColor: '#C2C2FF',
                color: '#1C1C3F',
                border: '2px solid #C2C2FF'
              }}
            >
              <MapPin className="w-5 h-5 mr-2" />
              View Location
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

  const contactData = [
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Location",
      content: "Chaitanya Bharathi Institute of Technology\nGandipet, Hyderabad",
      href: "https://maps.google.com/?q=Chaitanya+Bharathi+Institute+of+Technology",
      noIconBackground: true
    },
    {
      icon: <Mail className="w-10 h-10" />,
      title: "Email",
      content: "cosc@cbit.ac.in",
      href: "mailto:cosc@cbit.ac.in",
      noIconBackground: true
    },
    {
      icon: <Phone className="w-10 h-10" />,
      title: "Phone",
      content: "Saimanoj: +91 8919312156\nMuqeet: +91 9959525751",
      href: "tel:+918919312156",
      noIconBackground: true
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div
      id="Contact"
      className="scroll-mt-20 relative py-12 px-4 overflow-hidden"
      style={{ backgroundColor: '#1C1C3F' }}
    >
      {/* Shooting stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const colors = ['#493F70', '#8A86FF', '#C2C2FF'];
          const sizes = ['w-1 h-1', 'w-0.5 h-0.5', 'w-2 h-2'];
          
          const position = {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          };
          
          const animationDelay = `${(i * 0.5)}s`;
          const animationDuration = `${3 + (i % 4)}s`;
          
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

        {/* Additional star symbols */}
        {[...Array(8)].map((_, i) => {
          const position = {
            top: `${20 + (i * 10)}%`,
            left: `${10 + (i * 12)}%`,
          };
          
          const animationDelay = `${(i * 0.7)}s`;
          
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
                className="text-lg opacity-60"
                style={{
                  animationDelay,
                  animationDuration: '4s'
                }}
              >
                ✦
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
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
            <span>&#123;</span> CONTACT <span>&#125;</span>
          </h2>
          
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
        >
          {contactData.map((contact, index) => (
            <ContactCard
              key={contact.title}
              icon={contact.icon}
              title={contact.title}
              content={contact.content}
              href={contact.href}
              index={index}
              noIconBackground={contact.noIconBackground}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;