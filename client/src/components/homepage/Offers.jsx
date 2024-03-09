import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const videos = [
  "https://res.cloudinary.com/dxn3cmvet/video/upload/v1709973483/slider-videos/krvbectfjulb1mvlcopm.mp4",
  "https://res.cloudinary.com/dxn3cmvet/video/upload/v1709973991/slider-videos/f06pmykjdeqbb60enja2.mp4",
  "https://res.cloudinary.com/dxn3cmvet/video/upload/v1709974028/slider-videos/ihsrybaymncd8lww7fnp.mp4",
];

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
