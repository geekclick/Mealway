import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleChange } from "@/helpers/handleChange";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsPlus } from "react-icons/bs";
import {
  handleShopRegistration,
  sendImagetoCloud,
} from "@/services/vendor-services";
import { MdEdit } from "react-icons/md";
import MenuDialog from "@/components/MenuDialog";
import { Badge } from "@/components/ui/badge";

function RegisterShop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const coverImgRef = useRef(null);
  const { menuList } = useSelector((state) => state.vendorSlice);

  const [formData, setFormData] = useState({
    img: "",
    coverImg: "",
    name: "",
    shopname: "",
    location: "",
    address: "",
    contact: "",
    ratings: "",
    reviews: "",
    opnCloseHours: "",
    menu: [],
  });

  const [image, setImage] = useState({ img: "", coverImg: "" });
  const [submitButton, setSubmitButton] = useState(false);

  const handleSubmitButtonState = () => {
    if (
      formData.name.trim() !== "" &&
      formData.shopname.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.contact.trim() !== ""
    ) {
      setSubmitButton(true);
    } else {
      setSubmitButton(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    let coverImgUrl = "";
    if (image.img != "" && image.coverImg != "") {
      imgUrl = await sendImagetoCloud(image.img);
      coverImgUrl = await sendImagetoCloud(image.coverImg);
    }
    handleShopRegistration(
      e,
      { ...formData, img: imgUrl, coverImg: coverImgUrl, menu: menuList },
      dispatch,
      navigate
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    console.log(file);
    setImage({ ...image, [name]: file });
    console.log(image);
  };

  useEffect(() => {
    handleSubmitButtonState();
  }, [formData]);
  return (
    <section>
      <div className="flex justify-center items-center shadow-md py-6">
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="absolute left-10 scale-150 text-muted-foreground" />
        </Link>
        <h1 className="text-center">Register Shop</h1>
      </div>
      <div className="py-10 px-4 drop-shadow-md space-y-10">
        <form
          action=""
          className="flex justify-center items-center flex-col space-y-6"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex justify-around items-center w-full">
            <div
              onClick={() => coverImgRef.current.click()}
              className="absolute top-0 z-0 bg-cover bg-center h-[150px] w-full bg-gray-200"
            >
              {image.coverImg && (
                <img
                  src={URL.createObjectURL(image.coverImg)}
                  alt=""
                  className="h-[150px] w-full "
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
              <MdEdit className="absolute bottom-4 right-4 text-4xl bg-muted text-muted-foreground rounded-full p-2" />
            </div>
            <div
              className=" mt-10 relative  bg-muted w-[100px] h-[100px] rounded-full flex items-center"
              onClick={() => imgRef.current.click()}
            >
              {image.img ? (
                <img
                  src={URL.createObjectURL(image.img)}
                  alt="tttt"
                  className="w-[100px] h-[100px]"
                />
              ) : (
                <FaRegUser className="text-4xl m-auto text-center text-black" />
              )}
            </div>
            <Input
              type="file"
              name="img"
              ref={imgRef}
              className="hidden"
              onChange={handleImageChange}
            />
            <Input
              type="file"
              name="coverImg"
              ref={coverImgRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="w-full space-y-2">
            <Label>Full name*</Label>
            <Input
              placeholder="Enter your full name"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Shop Name*</Label>
            <Input
              placeholder="Enter your shop name"
              type="text"
              name="shopname"
              value={formData.shopname}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Location (Optional)</Label>
            <Input
              placeholder="Enter your location"
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Address*</Label>
            <Input
              placeholder="Enter your Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Contact*</Label>
            <Input
              placeholder="Enter your Contact"
              type="number"
              name="contact"
              value={formData.contact}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Open Close Hours</Label>
            <Input
              placeholder="Enter your Open hours"
              type="text"
              name="opnCloseHours"
              value={formData.opnCloseHours}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="w-full justify-start items-start flex flex-col space-y-2">
            <Label>Menu</Label>
            <div className="flex space-x-3 flex-wrap space-y-2">
              <MenuDialog>
                <Button variant="outline">
                  <BsPlus className="text-xl mx-1" /> Add Menu
                </Button>
              </MenuDialog>
              {menuList &&
                menuList.map((item) => {
                  return (
                    <Badge className="w-fit h-[35px] flex justify-center m-auto font-medium capitalize">
                      {item.name}
                    </Badge>
                  );
                })}
            </div>
          </div>

          <Button
            className="w-full"
            variant={`${submitButton ? "" : "disabled"}`}
            disabled={!submitButton}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}

export default RegisterShop;
