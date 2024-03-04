import Img from "@/assets/order.svg";
import BottomNav from "@/components/BottomNav";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Order() {
  return (
    <section>
      <div className="flex justify-center items-center shadow-md py-6">
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="absolute left-10 scale-150 text-muted-foreground" />
        </Link>
        <h1 className="text-center">Orders</h1>
      </div>
      <div className="flex flex-col justify-center items-center py-16 space-y-4">
        <img src={Img} alt="" className="w-[150px]" />
        <h3 className="text-primary">Comming Soon...</h3>
        <h5 className="text-center w-[300px]">
          Order feature will be available very soon, We will notify you when it
          get available
        </h5>
      </div>
      <BottomNav />
    </section>
  );
}

export default Order;
