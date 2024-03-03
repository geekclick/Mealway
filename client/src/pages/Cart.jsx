import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Img from "@/assets/smiling-face.png";

function Cart() {
  return (
    <div>
      <div className="flex justify-center items-center shadow-md py-6">
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="absolute left-10 scale-150 text-muted-foreground" />
        </Link>
        <h1 className="text-center">Cart</h1>
      </div>
      <div className="flex flex-col justify-center items-center py-16 space-y-4">
        <img src={Img} alt="" />
        <h3 className="text-primary">No Orders</h3>
        <h5 className="text-center w-[327px]">
          Sorry, you have no orders in your cart, please add your order to your
          cart.
        </h5>
      </div>
    </div>
  );
}

export default Cart;
