import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Img from "@/assets/notification.png";
function Notification() {
  return (
    <div>
      <div className="flex justify-center items-center shadow-md py-6">
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="absolute left-10 scale-150 text-muted-foreground" />
        </Link>
        <h1 className="text-center">Notification</h1>
      </div>
      <div className="flex flex-col justify-center items-center py-16 space-y-4">
        <img src={Img} alt="" className="w-[100px]" />
        <h3 className="text-primary">No Notifications</h3>
        <h5 className="text-center w-[300px]">
          Sorry, you have no notification right now, we will let you know if you
          got any
        </h5>
      </div>
    </div>
  );
}

export default Notification;
