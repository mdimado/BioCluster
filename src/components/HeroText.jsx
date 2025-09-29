import { ReactTyped } from "react-typed";

export default function HeroText() {
  return (
    <p
      className="text-xl md:text-2xl glowing-paragraph"
      style={{ color: "var(--lavender)" }}
    >
      &gt;{" "}
      <ReactTyped
        strings={[
          "The Biggest Celebration of Open Source",
          "24 Hour Virtual Hackathon",
        ]}
        typeSpeed={50}
        backSpeed={30}
        backDelay={1500}
        loop
      />
    </p>

  );
}
