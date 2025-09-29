import React, { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue } from "framer-motion";

const PrepSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

  // Spotlight animation
  const spotlightOpacity = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      spotlightOpacity.set(0.6);
    } else {
      spotlightOpacity.set(0);
    }
  }, [isInView, spotlightOpacity]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  return (
    <section
      id="Preptember"
      className="scroll-mt-20 relative py-20 px-6 overflow-hidden"
      style={{ backgroundColor: "#1C1C3F" }}
    >
      {/* Animated background effects matching other components */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(160, 160, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(160, 160, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => {
          const colors = ["#493F70", "#8A86FF", "#C2C2FF"];
          const sizes = ["w-2 h-2", "w-1 h-1", "w-3 h-3"];

          const position = {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          };

          const animationDelay = `${i * 0.5}s`;
          const animationDuration = `${3 + (i % 4)}s`;

          return (
            <div key={i} className="absolute animate-pulse" style={position}>
              <div
                className={`${sizes[i % 3]} rounded-full animate-ping`}
                style={{
                  backgroundColor: colors[i % 3],
                  animationDelay,
                  animationDuration,
                }}
              />
            </div>
          );
        })}

        {/* Large background glows */}
        <div
          className="absolute top-1/4 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-15"
          style={{ backgroundColor: "#A0A0FF" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 opacity-10"
          style={{ backgroundColor: "#C2C2FF" }}
        ></div>
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
            //   color: "#C2C2FF",
            //   textShadow: "3px 3px #8A86FF, 6px 6px #493F70",
            //   letterSpacing: "3px",
            //   textTransform: "uppercase",
            // }}
          >
            <span>&#123;</span> Preptember <span>&#125;</span>
          </h2>
          {/* <motion.div
            className="w-20 h-1 mx-auto"
            style={{ backgroundColor: "#A0A0FF" }}
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          /> */}
        </motion.div>

        {/* Main content card */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative group"
        >
          {/* Spotlight overlay */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at 50% 30%, rgba(160, 160, 255, 0.3) 0%, rgba(160, 160, 255, 0.1) 40%, transparent 70%)`,
              opacity: spotlightOpacity,
            }}
            animate={{
              opacity: isInView ? 0.6 : 0,
              scale: isInView ? [0.8, 1.1, 1] : 0.8,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />

          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02]"
            style={{
              backgroundColor: "rgba(28, 28, 63, 0.8)",
              border: "3px solid #C2C2FF",
              boxShadow: "8px 8px 0px #5A5AB5",
              borderRadius: "16px",
            }}
          >
            {/* Decorative corners */}
            <div
              className="absolute top-0 left-0 w-4 h-4"
              style={{ backgroundColor: "#A0A0FF" }}
            ></div>
            <div
              className="absolute top-0 right-0 w-4 h-4"
              style={{ backgroundColor: "#A0A0FF" }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-4 h-4"
              style={{ backgroundColor: "#A0A0FF" }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-4 h-4"
              style={{ backgroundColor: "#A0A0FF" }}
            ></div>

            <div className="p-8 sm:p-12 text-center relative z-20">
              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl mb-8 leading-relaxed"
                style={{
                  fontFamily: "'Atkinson Hyperlegible', sans-serif",
                  color: "#F2F4F7",
                }}
              >
                Prepare for{" "}
                <span className="font-bold" style={{ color: "#C2C2FF" }}>
                  Hacktoberfest
                </span>{" "}
                with Preptember. Get on board with COSC as a month of{" "}
                <span className="font-bold" style={{ color: "#A0A0FF" }}>
                  learning
                </span>
                ,{" "}
                <span className="font-bold" style={{ color: "#A0A0FF" }}>
                  coding
                </span>
                , and{" "}
                <span className="font-bold" style={{ color: "#A0A0FF" }}>
                  open source contributions
                </span>{" "}
                awaits!
              </motion.p>

              {/* Features grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              >
                {[
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        className="w-8 h-8 mx-auto transition-all duration-300"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(366%) hue-rotate(202deg) brightness(102%) contrast(97%) drop-shadow(0 0 1px rgba(194, 194, 255, 0.5))",
                        }}
                      >
                        <path d="m2,2.5c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5-1.119,2.5-2.5,2.5-2.5-1.119-2.5-2.5Zm12,5.5c.552,0,1-.447,1-1s-.448-1-1-1H4C1.794,6,0,7.794,0,10v3c0,.553.448,1,1,1s1-.447,1-1v-3c0-1.103.897-2,2-2h2v5c0,.553.448,1,1,1s1-.447,1-1v-5h6ZM19.5,0h-9.5c-.552,0-1,.447-1,1s.448,1,1,1h9.5c1.378,0,2.5,1.121,2.5,2.5v5c0,1.379-1.122,2.5-2.5,2.5h-.5v-1c0-.553-.448-1-1-1h-2c-.552,0-1,.447-1,1v1h-4c-.552,0-1,.447-1,1s.448,1,1,1h8.5c2.481,0,4.5-2.019,4.5-4.5v-5c0-2.481-2.019-4.5-4.5-4.5Zm1,21c-1.257,0-2.433.478-3.225,1.311-.381.4-.365,1.034.036,1.414.4.382,1.033.364,1.414-.035.82-.863,2.73-.863,3.551,0,.196.206.46.311.725.311.248,0,.496-.091.689-.275.4-.38.417-1.014.036-1.414-.792-.833-1.967-1.311-3.225-1.311Zm-8.5,0c-1.257,0-2.433.478-3.225,1.311-.381.4-.365,1.034.036,1.414.4.382,1.034.364,1.414-.035.82-.863,2.73-.863,3.551,0,.196.206.46.311.725.311.248,0,.496-.091.689-.275.4-.38.417-1.014.036-1.414-.792-.833-1.967-1.311-3.225-1.311Zm-8.5,0c-1.257,0-2.433.478-3.225,1.311-.381.4-.365,1.034.036,1.414.4.382,1.034.364,1.414-.035.82-.863,2.73-.863,3.551,0,.196.206.46.311.725.311.248,0,.496-.091.689-.275.4-.38.417-1.014.036-1.414-.792-.833-1.967-1.311-3.225-1.311Zm2-3c0-1.105-.895-2-2-2s-2,.895-2,2,.895,2,2,2,2-.895,2-2Zm8.5,0c0-1.105-.895-2-2-2s-2,.895-2,2,.895,2,2,2,2-.895,2-2Zm8.5,0c0-1.105-.895-2-2-2s-2,.895-2,2,.895,2,2,2,2-.895,2-2Z"/>
                      </svg>
                    ),
                    title: "Learning",
                    desc: "Master new technologies",
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        className="w-8 h-8 mx-auto transition-all duration-300"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(366%) hue-rotate(202deg) brightness(102%) contrast(97%) drop-shadow(0 0 1px rgba(194, 194, 255, 0.5))",
                        }}
                      >
                        <path d="m3 5.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5zm5.5 1.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm15.5-1v12c0 2.757-2.243 5-5 5h-14c-2.757 0-5-2.243-5-5v-12c0-2.757 2.243-5 5-5h14c2.757 0 5 2.243 5 5zm-22 0v2h20v-2c0-1.654-1.346-3-3-3h-14c-1.654 0-3 1.346-3 3zm20 12v-8h-20v8c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3zm-11.793-4.793c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-2.181 2.181c-.872.872-.872 2.29.019 3.18l2.181 2.071c.399.381 1.033.365 1.413-.036.381-.4.364-1.033-.036-1.413l-2.162-2.054c-.092-.092-.092-.242 0-.334l2.181-2.181zm5-1.414c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l2.181 2.181c.092.092.092.242.011.323l-2.159 2.093c-.396.384-.406 1.018-.021 1.414.385.397 1.018.406 1.414.021l2.17-2.104c.872-.872.872-2.29 0-3.162l-2.181-2.181z"/>
                      </svg>
                    ),
                    title: "Coding",
                    desc: "Strengthen your coding foundations",
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        className="w-8 h-8 mx-auto transition-all duration-300"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(366%) hue-rotate(202deg) brightness(102%) contrast(97%) drop-shadow(0 0 1px rgba(194, 194, 255, 0.5))",
                        }}
                      >
                        <path d="M24,4c0-2.206-1.794-4-4-4s-4,1.794-4,4c0,1.86,1.277,3.428,3,3.873v.127c0,1.654-1.346,3-3,3H8c-1.125,0-2.164,.374-3,1.002V7.873c1.723-.445,3-2.013,3-3.873C8,1.794,6.206,0,4,0S0,1.794,0,4c0,1.86,1.277,3.428,3,3.873v8.253c-1.723,.445-3,2.013-3,3.873,0,2.206,1.794,4,4,4s4-1.794,4-4c0-1.86-1.277-3.428-3-3.873v-.127c0-1.654,1.346-3,3-3h8c2.757,0,5-2.243,5-5v-.127c1.723-.445,3-2.013,3-3.873ZM2,4c0-1.103,.897-2,2-2s2,.897,2,2-.897,2-2,2-2-.897-2-2ZM6,20c0,1.103-.897,2-2,2s-2-.897-2-2,.897-2,2-2,2,.897,2,2ZM20,6c-1.103,0-2-.897-2-2s.897-2,2-2,2,.897,2,2-.897,2-2,2Z" />
                      </svg>
                    ),
                    title: "Open Source",
                    desc: "Contribute to the community",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-4 transition-all duration-300 hover:scale-105 group"
                    style={{
                      backgroundColor: "rgba(90, 90, 181, 0.2)",
                      border: "2px solid #8A86FF",
                      borderRadius: "12px",
                      boxShadow: "4px 4px 0px #493F70",
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: "6px 6px 0px #1C1C3F",
                    }}
                  >
                    <div
                      className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        filter:
                          typeof feature.icon === "object"
                            ? "drop-shadow(0 0 8px rgba(194, 194, 255, 0.5))"
                            : "none",
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3
                      className="font-bold text-lg mb-1"
                      style={{
                        fontFamily: "'Atkinson Hyperlegible', sans-serif",
                        color: "#FFFFFF",
                        textShadow: "1px 1px 0px #5A5AB5",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#D0CCE3" }}>
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <motion.a
                  href="/preptember"
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg uppercase tracking-wider transition-all duration-300"
                  style={{
                    fontFamily: "'Atkinson Hyperlegible', sans-serif",
                    color: "#FFFFFF",
                    backgroundColor: "#5A5AB5",
                    border: "3px solid #C2C2FF",
                    borderRadius: "8px",
                    boxShadow: "4px 4px 0px #1C1C3F",
                    textShadow: "1px 1px 0px #403F7D",
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    backgroundColor: "#A0A0FF",
                    boxShadow: "6px 6px 0px #1C1C3F",
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >
                  Join Preptember Today
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrepSection;
