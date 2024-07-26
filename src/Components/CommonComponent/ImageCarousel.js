import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./carousel.scss";

export default function ImageCarousel({ images, selectedImageIndex, isVideo = false, }) {

  return (
    <div className="image-carousel-parent">
      <Carousel selectedItem={selectedImageIndex ? selectedImageIndex : 0}>
        {
          images.length > 0 &&
          images.map((item , ind) => {
            return <div className="image-slide" key={ind}>
              {
                isVideo ?
                  <iframe width="350.4" height="213.2" src={item} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  :
                  <img src={item} width='350.4'
                    height="213.2" alt="img" />
              }

            </div>
          })
        }
      </Carousel>
    </div>

  );
}


