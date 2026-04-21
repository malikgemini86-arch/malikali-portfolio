import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Split text into chars for animation
  const splitTextIntoChars = (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const text = element.textContent || '';
      const chars = text.split('');
      element.innerHTML = chars.map(char => `<span class="split-char">${char}</span>`).join('');
    });
  };
  
  splitTextIntoChars(".landing-info h3");
  splitTextIntoChars(".landing-intro h2");
  splitTextIntoChars(".landing-intro h1");
  gsap.fromTo(
    ".landing-info h3 .split-char, .landing-intro h2 .split-char, .landing-intro h1 .split-char",
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  
  splitTextIntoChars(".landing-title-word");
  gsap.fromTo(
    ".landing-title-word .split-char",
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

}

