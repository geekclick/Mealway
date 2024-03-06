import { Button } from "@/components/ui/button";
import { FaChevronLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleChange } from "@/helpers/handleChange";
import { handleSignUp } from "@/services/auth-services";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsPlus } from "react-icons/bs";
import { handleShopRegistration } from "@/services/vendor-services";

function RegisterShop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    console.log(formData);
    handleShopRegistration(e, formData, dispatch, navigate);
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
            <Button>
              <BsPlus /> Add Menu
            </Button>
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
