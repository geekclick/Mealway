import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "./ui/input";
import { handleChange } from "@/helpers/handleChange";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { sendImagetoCloud } from "@/services/vendor-services";
import { useDispatch } from "react-redux";
import { addMenu } from "@/store/reducers/menuSlice";
import { DialogClose } from "@radix-ui/react-dialog";
import { handleAddFood } from "@/services/food-services";
import { useParams } from "react-router-dom";
import { set } from "react-hook-form";

function MenuDialog({ children }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const imgUrl = await sendImagetoCloud(image, "menu");
    await handleAddFood({ ...formData, image: imgUrl }, id);

    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
    });
    setLoader(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add menu</DialogTitle>
        </DialogHeader>
        <form action="" className=" space-y-5">
          <div>
            <Label>Name</Label>
            <Input
              placeholder="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              placeholder="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select
              name="category"
              onValueChange={(val) =>
                setFormData({ ...formData, category: val })
              }
              defaultValue={formData.category}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="veg">veg</SelectItem>
                <SelectItem value="non-veg">non-veg</SelectItem>
                <SelectItem value="dessert">dessert</SelectItem>
                <SelectItem value="beverage">beverage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Price</Label>
            <Input
              placeholder="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="flex flex-col w-fit space-y-3">
            <Label>Image</Label>
            <Input
              type="file"
              name="image"
              ref={imgRef}
              className="hidden"
              onChange={handleImageChange}
            />
            <Button
              onClick={() => imgRef.current.click()}
              type="button"
              variant="outline"
            >
              Add images
            </Button>
          </div>
          <Button className="w-full" type="button" onClick={handleSubmit}>
            <DialogClose className="w-full">
              {loader ? "Please wait processing.." : "Add menu"}
            </DialogClose>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default MenuDialog;
