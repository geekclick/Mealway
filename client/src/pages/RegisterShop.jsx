import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
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
import { getLocation } from "@/helpers/getLocation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { vendorSchema } from "@/schemas/vendorSchema";

function RegisterShop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const coverImgRef = useRef(null);
  const [loc, setLoc] = useState({});
  const [image, setImage] = useState({ img: "", coverImg: "" });
  const { menuList } = useSelector((state) => state.menuSlice);
  const { user } = useSelector((state) => state.authSlice);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setImage({ ...image, [name]: file });
  };

  const handleGetLocation = async () => {
    try {
      const userLocation = await getLocation();
      setLoc({
        type: "Point",
        coordinates: userLocation,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const form = useForm({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: "",
      // shopname: "",
      address: "",
      customer_care_number: "",
      openingHour: "",
      closingHour: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values) {
    try {
      if (image.img !== "" && image.coverImg !== "") {
        const imgUrl = await sendImagetoCloud(image.img, "vendor-logo");
        const coverImgUrl = await sendImagetoCloud(
          image.coverImg,
          "vendor-cover"
        );
        values.img = imgUrl;
        values.coverImg = coverImgUrl;
        values.location = loc;
        values.menu = menuList;
        values.service_time = `${values.openingHour} - ${values.closingHour}`;
      }
      console.log(values);
      handleShopRegistration(values, dispatch, navigate, user.email);
    } catch (error) {
      console.error("Error occurred during image upload:", error);
    }
  }

  return (
    <section>
      <div className="flex justify-center items-center shadow-md py-6">
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="absolute left-10 scale-150 text-muted-foreground" />
        </Link>
        <h1 className="text-center">Register Shop</h1>
      </div>
      <div className="py-10 px-4 drop-shadow-md space-y-10">
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
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter menu name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="shopname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter shop name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="w-full flex flex-col space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Enter your location"
                type="text"
                name="location"
                value={loc.coordinates}
                onChange={() => 1}
              />
              <Button
                type="button"
                className="w-fit"
                onClick={handleGetLocation}
              >
                Get Current Location
              </Button>
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full space-y-2">
              <div className="flex items-center space-x-10">
                <h5>Opening time:</h5>
                <FormField
                  control={form.control}
                  name="openingHour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} type="time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-12">
                <h5>Closing time:</h5>
                <FormField
                  control={form.control}
                  name="closingHour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} type="time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                  menuList.map((item, index) => {
                    return (
                      <Badge 
                        key={item.id || index}
                        className="w-fit h-[35px] flex justify-center m-auto font-medium capitalize">
                        {item.name}
                      </Badge>
                    );
                  })}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Log in"}
            </Button>
            {errors.root && (
              <p className=" text-red-500 text-center mt-0">
                {errors.root.message}
              </p>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
}

export default RegisterShop;
