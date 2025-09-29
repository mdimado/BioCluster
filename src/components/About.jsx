import '../styles/About.css'
import { useEffect } from 'react'
import ProbStatements from './ProbStatements';
import Transition from "../assets/transition1.jpg";

function About() {
  useEffect(() => {
    const detailItems = document.querySelectorAll(".detail-item");
    const stats = document.querySelectorAll(".stat");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("detail-item")) {
              entry.target.classList.add("visible");
            }
            if (entry.target.classList.contains("stat")) {
              const el = entry.target;
              const targetValue = parseInt(el.getAttribute("data-value")); 
              const finalText = el.getAttribute("data-text");
              let current = 0;
              const increment = Math.ceil(targetValue / 50);
              const counter = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                  el.textContent = finalText; 
                  clearInterval(counter);
                } else {
                  el.textContent = current;
                }
              }, 20);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    detailItems.forEach((item) => observer.observe(item));
    stats.forEach((stat) => observer.observe(stat));

    return () => {
      detailItems.forEach((item) => observer.unobserve(item));
      stats.forEach((stat) => observer.unobserve(stat));
    };
  }, []);

  return (
    <section id="About" className="about-section">
      <div className="about-container">
        <h2><span>&#123;</span> About the Event <span>&#125;</span></h2>
        <div className="event-info">
          <p className="event-description">
            Welcome to Hacktoberfest, the global celebration that ignites innovation and empowers open-source collaboration!
          </p>
          <div className="event-details">
            {/* Vertical stack */}
            <div className="detail-item">
              <span className="label">What is Hacktoberfest?</span>
              <span className="value">
                Hacktoberfest is DigitalOcean's annual event that inspires people to contribute to open source throughout October. Modern tech, including DigitalOcean's own products, relies on open-source projects maintained by passionate creators with limited resources. Hacktoberfest is about giving back, honing skills, and celebrating the open-source community and the people who make it thrive.
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Who Are We?</span>
              <span className="value">
                We are the Chaitanya Bharathi Institute of Technology Open Source Community (COSC) in Hyderabad. Our mission is to promote open source values, provide a platform for students to explore and contribute to tech, all while crafting experiences that nurture a lifelong love for open source.
              </span>
            </div>

            {/* Horizontal stack */}
            <div className="detail-row">
              <div className="detail-item">
                <span className="label">When?</span>
                <span className="value">Coming Soon!!</span>
              </div>
              <div className="detail-item">
                <span className="label">Where?</span>
                <span className="value">Discord</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About