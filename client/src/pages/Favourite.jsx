import BottomNav from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Link } from "react-router-dom";

const vendorList = [
  { name: "Grandma's shop", address: "NYC, Broadway ave 79" },
  { name: "Grandma's shop", address: "NYC, Broadway ave 79" },
  { name: "Grandma's shop", address: "NYC, Broadway ave 79" },
  { name: "Grandma's shop", address: "NYC, Broadway ave 79" },
  { name: "Grandma's shop", address: "NYC, Broadway ave 79" },
];

const dishList = [
  { name: "Hamburger" },
  { name: "Hamburger" },
  { name: "Hamburger" },
  { name: "Hamburger" },
  { name: "Hamburger" },
  { name: "Hamburger" },
];

function Favourite() {
  return (
    <section>
      <div className="flex justify-center items-center py-6">
        <h1 className="text-center">Favourite List</h1>
      </div>
      <div className="w-full flex justify-center items-center pb-16">
        <Tabs defaultValue="vendors">
          <TabsList>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="dishes">Dishes</TabsTrigger>
          </TabsList>
          <TabsContent value="vendors">
            {vendorList.map((item, i) => {
              return (
                <div className="flex space-x-4 my-10">
                  <img
                    src={`https://source.unsplash.com/92x92/?shop$${i}`}
                    alt=""
                    className="rounded-xl"
                  />
                  <div className="flex flex-col justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p>{item.address}</p>
                    </div>
                    <p className="italic w-full flex mt-1">
                      <FaStar className="text-yellow-500 mx-1 mb-4" /> 4.8(1.2k)
                      | 1.5 km
                    </p>
                  </div>
                  <GoHeartFill className="m-2 text-primary text-xl" />
                  <div className="flex flex-col justify-center items-center">
                    <Link to="/" className="flex justify-center items-center">
                      <FaChevronRight className="text-black" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </TabsContent>
          <TabsContent value="dishes">
            <div className="grid grid-cols-2 gap-4 my-10">
              {dishList.map((item, i) => {
                return (
                  <div>
                    <img
                      src={`https://source.unsplash.com/155x126/?food$${i}`}
                      alt=""
                      className="rounded-xl rounded-b-none"
                    />
                    <h4 className="font-semibold">{item.name}</h4>
                    <div className="flex justify-between items-start">
                      <p className="italic w-full flex mt-1">
                        <FaStar className="text-yellow-500 mx-1 mb-4" /> 4.8
                        (1.2k)
                      </p>
                      <GoHeartFill className="text-primary text-xl" />
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </section>
  );
}

export default Favourite;
