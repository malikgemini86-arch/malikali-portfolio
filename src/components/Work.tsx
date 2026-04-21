import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Project Aether",
      category: "Cinematic AI Narrative",
      features: "Hyper-realistic visual storytelling engineered using advanced prompting.",
      media: "https://www.youtube.com/embed/_YxeMJUYquw",
      isVideo: true,
      isYouTube: true
    },
    {
      id: 2,
      title: "Nexus Engine",
      category: "Channel Architecture",
      features: "Fully automated, high-retention faceless YouTube channels optimized for the US/UK markets.",
      media: "https://www.youtube.com/embed/xtuScPaVfac",
      isVideo: true,
      isYouTube: true
    },
    {
      id: 3,
      title: "Lumina Campaigns",
      category: "Virtual Lookbooks & Try-On",
      features: "High-fidelity AI fashion transformations and synthetic model generation.",
      media: "/projects/project3.jpg",
      isVideo: false,
      isYouTube: false
    }
  ];

  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    // Mobile-optimized ScrollTrigger - disabled auto-sliding for manual control
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: true,
          pin: false,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      // Disabled transform to prevent unexpected movement
      // timeline.to(".work-flex", {
      //   x: -translateX,
      //   ease: "none",
      // });

      return () => {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    }
    
    // For mobile, no auto-sliding - manual drag/swipe only
    return () => {
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{project.id}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Features</h4>
                <p>{project.features}</p>
              </div>
              <div 
                className="work-media-container"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {project.isYouTube ? (
                  <iframe
                    src={project.media}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      width: '100%',
                      height: '300px',
                      borderRadius: '16px'
                    }}
                  />
                ) : project.isVideo ? (
                  <video 
                    src={project.media} 
                    autoPlay={hoveredProject === project.id}
                    loop 
                    muted 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={project.media} 
                    alt={project.title}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
