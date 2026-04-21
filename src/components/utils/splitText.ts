import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ 
    ignoreMobileResize: false, // Enable mobile resize detection
    autoRefreshEvents: "resize,load,visibilitychange,orientationchange",
    limitCallbacks: true,
  });
  
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  // Mobile-optimized trigger points - ensure animations fire on mobile
  const TriggerStart = window.innerWidth <= 768 ? "top 70%" : 
                      window.innerWidth <= 1024 ? "top 70%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";
  
  // Force refresh ScrollTrigger on mobile for proper synchronization
  if (window.innerWidth <= 768) {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    // Split text into words for animation
    const words = para.innerText.split(' ');
    para.innerHTML = words.map(word => `<span class="split-word">${word}</span>`).join(' ');

    para.anim = gsap.fromTo(
      para.querySelectorAll('.split-word'),
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
          end: "bottom 20%",
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    // Split text into chars for animation
    const chars = title.innerText.split('');
    title.innerHTML = chars.map(char => `<span class="split-char">${char}</span>`).join(' ');
    title.anim = gsap.fromTo(
      title.querySelectorAll('.split-char'),
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
          end: "bottom 20%",
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
  
  // Add mobile-specific refresh listener
  if (window.innerWidth <= 768) {
    const handleMobileRefresh = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };
    
    window.addEventListener('orientationchange', handleMobileRefresh);
    window.addEventListener('resize', handleMobileRefresh);
  }
}
