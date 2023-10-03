import React from "react";
import { ReactNode } from "react";
/* lightgallery */
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-rotate.css";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgRotate from "lightgallery/plugins/rotate";
import lgVideo from "lightgallery/plugins/video";
/* import videojs from "video.js"; */
import "lightgallery/css/lg-video.css";
import "./styles/lightgallery.css";

interface TProp {
  children: ReactNode;
  mediaURL: string;
  isImage: boolean;
}

const Lightbox: React.FC<TProp> = ({ mediaURL, isImage, children }) => {
  return (
    <LightGallery
      speed={200}
      plugins={[lgZoom, lgRotate, lgVideo]}
      /* videojs={videojs} */
      videojsTheme="vjs-theme-fantasy"
      download={false}
      flipHorizontal={false}
      flipVertical={false}
      rotate={isImage}
      zoom={isImage}
    >
      <a
        href={isImage ? mediaURL : ""}
        data-video={
          isImage
            ? ""
            : `{"source": [{"src": "${mediaURL}", "type": "video/mp4"}], "attributes": {"preload": false, "controls": true}}`
        }
      >
        {children}
      </a>
    </LightGallery>
  );
};

export default Lightbox;
