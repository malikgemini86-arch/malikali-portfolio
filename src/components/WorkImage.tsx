import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image?: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);

  const handleMouseEnter = () => {
    if (props.video) {
      setIsVideo(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVideo(false);
  };

  return (
    <div className="work-image">
      <div
        className="work-image-in"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        {props.image && !props.video && (
          <img src={props.image} alt={props.alt} />
        )}
        {props.video && !isVideo && (
          <img src="/images/placeholder.webp" alt={props.alt} />
        )}
        {props.video && isVideo && (
          <video 
            src={props.video} 
            autoPlay 
            muted 
            playsInline 
            loop
          />
        )}
      </div>
    </div>
  );
};

export default WorkImage;
