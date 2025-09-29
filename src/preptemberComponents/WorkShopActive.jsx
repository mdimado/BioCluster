import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaCode, 
  FaUsers, 
  FaBrain, 
  FaCogs, 
  FaRocket,
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaTrophy
} from "react-icons/fa";
import styles from "./Preptember.module.css";

const WorkshopActive = forwardRef((props, refs) => {
  // Destructure refs from parent
  const { sectionRef, titleRef, subtitleRef } = refs;

  const topics = [
    {
      icon: <FaGithub className="text-2xl" />,
      title: "Open-source culture",
      description: "Learn contribution workflows and community practices"
    },
    {
      icon: <FaCode className="text-2xl" />,
      title: "Git/GitHub Mastery",
      description: "Team collaboration and version control essentials"
    },
    {
      icon: <FaCogs className="text-2xl" />,
      title: "Full-Stack Development",
      description: "Frontend and backend development with AI integration"
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Technology Stacks",
      description: "Understanding tech stacks and their role in hackathons"
    },
    {
      icon: <FaBrain className="text-2xl" />,
      title: "AI Tools",
      description: "Leveraging AI for faster development and productivity"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Microservices",
      description: "Architecture for scalable applications"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="workshop"
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 px-6 bg-[#1C1C3F] text-white overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full 
                      bg-gradient-to-r from-[#5A5AB5]/20 via-[#A0A0FF]/15 to-[#C2C2FF]/20 
                      blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full 
                      bg-gradient-to-r from-[#C2C2FF]/20 via-[#5A5AB5]/20 to-[#5E577C]/20 
                      blur-[100px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            ref={titleRef}
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="heading"
          >
           <span>&#123;</span> Preptember 2025 <span>&#125;</span>
          </motion.h1>
          
          {/* <motion.h2
            ref={subtitleRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${styles.eyebrow} text-xl md:text-2xl text-[#C2C2FF] mb-8`}
          >
            Hacktoberfest Prep Workshop
          </motion.h2> */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true }}
            className={`${styles.body} text-lg md:text-xl max-w-4xl mx-auto leading-relaxed`}
          >
            A 2-day online workshop by <span className={styles.bodyEm}>CBIT Open Source Community (COSC)</span>, 
            designed to equip students with the skills and knowledge needed to succeed in hackathons and 
            open-source contributions. The sessions will include hands-on training, interactive demos, 
            and practical exercises.
          </motion.p>
        </div>

        {/* Workshop Details Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#403F7D]/70 via-[#1C1C3F]/70 to-[#5E577C]/70
                       border border-[#5A5AB5]/30 backdrop-blur-lg rounded-2xl p-8 text-center
                       hover:shadow-[0_0_25px_rgba(160,160,255,0.25)] transition-all duration-500"
          >
            <FaCalendarAlt className="text-4xl text-[#A0A0FF] mx-auto mb-4" />
            <h3 className={`${styles.textLink} text-xl mb-2`}>Duration</h3>
            <p className={`${styles.body} text-[#C2C2FF]`}>29th & 30th September 2025</p>
            <p className={`${styles.body} text-sm text-[#D0CCE3]`}>(Online)</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#403F7D]/70 via-[#1C1C3F]/70 to-[#5E577C]/70
                       border border-[#5A5AB5]/30 backdrop-blur-lg rounded-2xl p-8 text-center
                       hover:shadow-[0_0_25px_rgba(160,160,255,0.25)] transition-all duration-500"
          >
            <FaClock className="text-4xl text-[#C2C2FF] mx-auto mb-4" />
            <h3 className={`${styles.textLink} text-xl mb-2`}>Time</h3>
            <p className={`${styles.body} text-[#C2C2FF]`}>10:00 AM – 12:30 PM</p>
            <p className={`${styles.body} text-sm text-[#D0CCE3]`}>Daily</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#403F7D]/70 via-[#1C1C3F]/70 to-[#5E577C]/70
                       border border-[#5A5AB5]/30 backdrop-blur-lg rounded-2xl p-8 text-center
                       hover:shadow-[0_0_25px_rgba(160,160,255,0.25)] transition-all duration-500"
          >
            <FaGraduationCap className="text-4xl text-[#5A5AB5] mx-auto mb-4" />
            <h3 className={`${styles.textLink} text-xl mb-2`}>Focus</h3>
            <p className={`${styles.body} text-[#C2C2FF]`}>Open Source, Teamwork</p>
            <p className={`${styles.body} text-sm text-[#D0CCE3]`}>Hackathon Preparation</p>
          </motion.div>
        </div>

        {/* Topics Covered */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className={`${styles.headline} text-3xl md:text-4xl text-center mb-12 text-[#A0A0FF]`}
          >
            What You'll Learn
          </motion.h3>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {topics.map((topic, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-[#403F7D]/70 via-[#1C1C3F]/70 to-[#5E577C]/70
                           border border-[#5A5AB5]/30 backdrop-blur-lg rounded-2xl p-6
                           hover:shadow-[0_0_25px_rgba(160,160,255,0.25)] transition-all duration-500"
              >
                <div className="text-[#A0A0FF] mb-4">{topic.icon}</div>
                <h4 className={`${styles.textLink} text-lg mb-3`}>{topic.title}</h4>
                <p className={`${styles.body} text-sm text-[#D0CCE3]`}>{topic.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Join Now Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-[#403F7D]/70 via-[#1C1C3F]/70 to-[#5E577C]/70
                     border border-[#5A5AB5]/30 backdrop-blur-lg rounded-2xl p-10
                     hover:shadow-[0_0_25px_rgba(160,160,255,0.25)] transition-all duration-500"
        >
          <h3 className={`${styles.headline} text-2xl md:text-3xl mb-4 text-[#A0A0FF]`}>
            Ready to Join?
          </h3>
          <p className={`${styles.body} text-lg mb-8 text-[#C2C2FF]`}>
            Don't miss out! Join our WhatsApp community to get updates, connect with peers, and secure your spot in <span className={styles.bodyEm}>Preptember 2025</span>
          </p>
          <motion.a
            href="https://chat.whatsapp.com/KxOx5cRGTdmBubWJFapXQ0?mode=ems_qr_c"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] 
                       text-white px-8 py-4 rounded-full text-lg font-semibold
                       hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all duration-300
                       border-2 border-transparent hover:border-[#25D366]/30"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Join WhatsApp Group
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
});

WorkshopActive.displayName = "WorkshopActive";

export default WorkshopActive;
