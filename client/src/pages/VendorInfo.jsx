import MapComponent from "@/components/MapComponent";
import { FaChevronLeft } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function VendorInfo() {
  const { id } = useParams();
  const { vendorList } = useSelector((state) => state.vendorSlice);
  const thisVendor = vendorList.filter((item) => item._id == id)[0];
  return (
    <section>
      <div className="flex justify-center items-center shadow-md py-6">
        <Link
          to={`/vendor/${thisVendor._id}`}
          className="flex justify-center items-center"
        >
          <FaChevronLeft className="absolute left-10 scale-150 text-muted-foreground" />
        </Link>
        <h1 className="text-center">Vendor Information</h1>
      </div>
      <div className="px-4 py-4 flex flex-col justify-center items-start space-y-6">
        <div className="w-full space-y-3">
          <MapComponent
            className={" w-full rounded-lg h-[140px] overflow-hidden"}
            vendors={[thisVendor]}
          />
          <p className="flex text-base">
            <TiLocation className="text-xl mx-1" />
            {thisVendor.address}
          </p>
        </div>
        <div className="h-[2px] w-full bg-[#BFC6CC]"></div>
        <div className=" space-y-2">
          <h4>About Us</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim
            ad. <span className="text-primary font-semibold">See more...</span>
          </p>
        </div>
        <div className="h-[2px] w-full bg-[#BFC6CC] mt-6"></div>
        <div className=" space-y-4 w-11/12">
          <h5 className="flex justify-between">
            Opening Time <span>:</span>{" "}
            <span className="text-primary">
              {thisVendor.openCloseHours?.open || "-"}
            </span>
          </h5>
          <h5 className="flex justify-between">
            Closing Time <span>:</span>{" "}
            <span className="text-primary">
              {thisVendor.openCloseHours?.close || "-"}
            </span>
          </h5>
        </div>
        <div className="h-[2px] w-full bg-[#BFC6CC] mt-6"></div>
        <div className="flex justify-between items-center w-11/12">
          <h5>Phone Number </h5>
          <h5 className="text-primary">+91 {thisVendor.contact}</h5>
        </div>
      </div>
    </section>
  );
}

export default VendorInfo;
