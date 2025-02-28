import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { handleChange } from "@/helpers/handleChange";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { sendImagetoCloud } from "@/services/vendor-services";
import { useDispatch } from "react-redux";
import { addMenu } from "@/store/reducers/menuSlice";
import { DialogClose } from "@radix-ui/react-dialog";

function MenuDialog({ children }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    const menu = JSON.parse(localStorage.getItem("menu")) || [];
    menu.push({ ...formData, image: image });
    localStorage.setItem("menu", JSON.stringify(menu));

    // Uncomment and implement the image upload if needed
    // const imgUrl = await sendImagetoCloud(image, "menu-images");
    // dispatch(addMenu({ ...formData, image: imgUrl }));

    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
    });
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
            <Input
              placeholder="category"
              name="category"
              value={formData.category}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              placeholder="price"
              name="price"
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
            <DialogClose className="w-full">Add menu</DialogClose>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default MenuDialog;
