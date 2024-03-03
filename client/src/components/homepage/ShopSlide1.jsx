import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AiOutlineRight } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const prods = [
  {
    name: "Elisandra Restaurant",
    img: "https://source.unsplash.com/210x140/?food,shop$1",
  },
  {
    name: "Elisandra Restaurant",
    img: "https://source.unsplash.com/210x140/?food-shop$2",
  },
  {
    name: "Elisandra Restaurant",
    img: "https://source.unsplash.com/210x140/?food_shop$3",
  },
  {
    name: "Elisandra Restaurant",
    img: "https://source.unsplash.com/210x140/?subway$4",
  },
  {
    name: "Elisandra Restaurant",
    img: "https://source.unsplash.com/210x140/?food$5",
  },
];

function ShopSlide1({ title }) {
  return (
    <section className=" space-y-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[20px] italic text-left">{title}</h2>
        <Link to={"/"}>
          <AiOutlineRight />
        </Link>
      </div>
      <div>
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="flex justify-center items-center w-full"
        >
          <CarouselContent>
            {prods.map((item, i) => {
              return (
                <CarouselItem>
                  <Link
                    to={`/${item.name.toLowerCase().split(" ").join("-")}`}
                    className=" space-y-2"
                  >
                    <img
                      src={item.img}
                      alt=""
                      className="rounded-sm rounded-b-none m-auto md:basis-1/2 lg:basis-1/3"
                    />
                    <div>
                      <h4 className="font-semibold">Elisandra Restaurant </h4>
                      <p className="italic w-full flex mt-1">
                        <IoLocationOutline className="mx-1" /> Elisandra
                        Restaurant
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default ShopSlide1;
