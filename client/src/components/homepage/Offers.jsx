import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import v1 from "@/assets/carousel/v1.mp4";
import v2 from "@/assets/carousel/v2.mp4";
import v3 from "@/assets/carousel/v3.mp4";
import v4 from "@/assets/carousel/v4.mp4";
import v5 from "@/assets/carousel/v5.mp4";
import v6 from "@/assets/carousel/v6.mp4";
import v7 from "@/assets/carousel/v7.mp4";

const videos = [v1, v2, v3, v4, v5, v6, v7];

function Offers() {
  return (
    <section className="flex justify-center items-start flex-col w-full space-y-2">
      <h2 className="ml-2 italic">Explore the local delicacies</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 8000,
          }),
        ]}
        className="flex justify-center items-center w-full"
      >
        <CarouselContent>
          {videos.map((item, i) => {
            return (
              <CarouselItem key={i}>
                <video
                  src={item}
                  width="327"
                  height="148"
                  autoPlay
                  muted
                  loop
                  className="rounded-xl"
                ></video>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default Offers;
