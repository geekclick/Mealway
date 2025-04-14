import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AiOutlineRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFoodByFoodName } from "@/services/food-services";

function ProdSlide1({ list = [], title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuList = useSelector((state) => state.menuSlice.menuList) || [];

  // console.log("prod slide : ",menuList)

  const handleImageClick = async (foodName) => {
    await getFoodByFoodName(foodName, dispatch);
    navigate(`/getFoodByFoodName/${foodName}`);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 4000,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  if (!menuList) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl md:text-2xl italic text-left">{title}</h2>
        <Link to={"/"}>
          <AiOutlineRight />
        </Link>
      </div>
      <div>
        <Slider {...sliderSettings}>
          {Array.isArray(menuList) &&
            list?.map((dish, i) => (
              <div key={dish._id || i}>
                <div className="space-y-2 text-center">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="rounded-lg rounded-b-none mx-auto cursor-pointer"
                    style={{ maxWidth: "150px", height: "150px" }}
                    onClick={() => handleImageClick(dish.name)}
                  />
                  <div className="mt-2 text-sm text-black">{dish.name}</div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
}

export default ProdSlide1;
