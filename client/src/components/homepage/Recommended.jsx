import { getMenuList } from "@/services/menu-services";
import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";

const menuList = (await getMenuList()) || [];
function Recommended({ list = menuList }) {
  return (
    <section className=" space-y-4">
      <h2 className="text-[20px] italic text-left">Recommended For You </h2>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {list.map((item, i) => {
          return (
            <div key={item._id || i}>
              <div className="space-y-2">
                <img
                  src={item.image}
                  alt=""
                  className="rounded-lg rounded-b-none m-auto"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="italic w-full flex mt-1">
                      1.5 km | <FaStar className="text-yellow-500 mx-1" />{" "}
                      4.8(1.2k)
                    </p>
                  </div>
                  <GoHeart className="mx-4 text-xl" />
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Recommended;
