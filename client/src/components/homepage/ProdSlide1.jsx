import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getMenuList } from "@/services/menu-services";
import { AiOutlineRight } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { Link } from "react-router-dom";

const menuList = await getMenuList();
function ProdSlide1({ title, list = menuList }) {
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
            {list &&
              list.map((item, i) => {
                return (
                  <CarouselItem key={item._id || i}>
                    <div className=" space-y-2">
                      <img
                        src={item.image}
                        alt=""
                        className="rounded-lg rounded-b-none m-auto md:basis-1/2 lg:basis-1/3"
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="italic w-full flex mt-1">
                            1.5 km | <FaStar className="text-yellow-500 mx-1" />{" "}
                            4.8(1.2k)
                          </p>
                        </div>
                        <GoHeart className="mx-4 text-xl text-primary " />
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default ProdSlide1;
