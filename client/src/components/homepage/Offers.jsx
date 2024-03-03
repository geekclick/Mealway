import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function Offers() {
  return (
    <section className="flex justify-center items-start flex-col w-full space-y-2">
      <h2 className="ml-2 italic">Special offer</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="flex justify-center items-center w-full"
      >
        <CarouselContent>
          <CarouselItem>
            <img
              src={"https://source.unsplash.com/327x148/?cake$1"}
              alt=""
              className="rounded-lg m-auto"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={"https://source.unsplash.com/327x148/?burger$2"}
              alt=""
              className="rounded-lg m-auto"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={"https://source.unsplash.com/327x148/?piza$3"}
              alt=""
              className="rounded-lg m-auto"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={"https://source.unsplash.com/327x148/?noodles$4"}
              alt=""
              className="rounded-lg m-auto"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default Offers;
