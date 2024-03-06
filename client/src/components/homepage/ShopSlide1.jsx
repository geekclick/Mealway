import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AiOutlineRight } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getVendorList } from "@/services/vendor-services";

// const prods = [
//   {
//     name: "Elisandra Restaurant",
//     img: "https://source.unsplash.com/210x140/?food,shop$1",
//   },
//   {
//     name: "Elisandra Restaurant",
//     img: "https://source.unsplash.com/210x140/?food-shop$2",
//   },
//   {
//     name: "Elisandra Restaurant",
//     img: "https://source.unsplash.com/210x140/?food_shop$3",
//   },
//   {
//     name: "Elisandra Restaurant",
//     img: "https://source.unsplash.com/210x140/?subway$4",
//   },
//   {
//     name: "Elisandra Restaurant",
//     img: "https://source.unsplash.com/210x140/?food$5",
//   },
// ];

function ShopSlide1({ title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vendorList } = useSelector((state) => state.vendorSlice);

  useEffect(() => {
    getVendorList(dispatch, navigate);
  }, [dispatch]);
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
            {vendorList.map((item) => {
              return (
                <CarouselItem key={item._id}>
                  <Link
                    to={`/${item.shopname.toLowerCase().split(" ").join("-")}`}
                    className=" space-y-2"
                  >
                    <img
                      src={
                        item.img ||
                        "https://imgs.search.brave.com/ToyQYoj6YnON9BI_e-yWUeFl1MxWK6Q56fComCLqEuw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzQ1LzA1Lzky/LzM2MF9GXzM0NTA1/OTIzMl9DUGllVDhS/SVdPVWs0SnFCa2tX/a0lFVFlBa216MmI3/NS5qcGc"
                      }
                      alt=""
                      className="rounded-sm rounded-b-none w-[210px] h-[140px] m-auto md:basis-1/2 lg:basis-1/3"
                    />
                    <div>
                      <h4 className="font-semibold">{item.shopname} </h4>
                      <p className="italic w-full flex mt-1">
                        <IoLocationOutline className="mx-1" /> {item.address}
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
