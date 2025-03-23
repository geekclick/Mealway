import FlashDeals from "@/assets/homepage/NavGrid/1.png";
import NiceShop from "@/assets/homepage/NavGrid/2.png";
import Points from "@/assets/homepage/NavGrid/3.png";
import Rice from "@/assets/homepage/NavGrid/4.png";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFoodByCategory } from "@/services/food-services"; 

const links = [
  {
    name: "Vegetarian",
    img: FlashDeals,
    category: "veg" 
  },
  {
    name: "Non-Vegetarian",
    img: NiceShop,
    category: "non-veg" 
  },
  {
    name: "Dessert",
    img: Points,
    category: "dessert" 
  },
  {
    name: "Beverage",
    img: Rice,
    category: "beverage" 
  },
];

function NavGrid() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const handleCategoryClick = async (category) => {

    await getFoodByCategory(category, dispatch);
    navigate(`/category/${category}`); 
  };


  return (
    <section className="space-y-10">
    <div className="flex justify-between items-center w-full">
      <h1 className="text-xl md:text-2xl italic">What are you looking for?</h1>
      <AiOutlineRight />
    </div>
    <div className="grid md:grid-cols-4 grid-cols-2 xl:px-16 gap-4 place-items-center">
      {links.map((link, i) => (
        <div
          key={i}
          onClick={() => handleCategoryClick(link.category)} 
          className="flex flex-col items-center justify-center space-y-3 rounded-xl hover:shadow-xl hover:border border-primary transition-all bg-white aspect-square w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] cursor-pointer"
        >
          <img src={link.img} alt="" className="lg:w-[70px] w-[40px]" />
          <p className="lg:text-lg">{link.name}</p>
        </div>
      ))}
    </div>
  </section>
  );
}

export default NavGrid;
