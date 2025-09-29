import React, { forwardRef } from "react";
import styles from "./Preptember.module.css";

const Videos = forwardRef(({}, refs) => {
  // Destructure refs from parent
  const { sectionRef, titleRef, subtitleRef } = refs;

  return (
    <section
      id="workshop"
      ref={sectionRef}
      className="relative w-full min-h-[55vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F2F4F7] to-[#D0CCE3]"
    >
      <div className="container mx-auto text-center px-4 py-12">
        {/* Animated Heading */}
        <h1
          ref={titleRef}
          className="heading"
        >
          Workshop
        </h1>

        {/* Sub Message */}
        <div
          ref={subtitleRef}
          className={`${styles.subheadingFont} text-xl sm:text-2xl md:text-3xl font-semibold text-[#5A5AB5]`}
        >
          <span className="animate-pulse">Coming Soon...</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#C2C2FF]/40 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#FFFFFF] to-transparent" />
    </section>
  );
});

Videos.displayName = "Videos";

export default Videos;
