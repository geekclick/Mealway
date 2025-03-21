const mongoose = require('mongoose');
const Shop = require('../models/shop-model.js');
const Food = require('../models/food-model.js')
const User = require('../models/user-model.js');
const { addfood } = require('./food-controller.js');

// --------------------------Register the Shop -------------------------------//
const addShop = async (req, res) => {
    // console.log(req.body)

    try {
        const { shopInfo, user_email } = req.body;
        const { shop_pic, shop_cover, name, address, description, contact, menuList } = shopInfo;
        const service_time = `${shopInfo.openingHour} - ${shopInfo.closingHour}`

        const user = await User.findOne({ email: user_email });
        const user_id = user._id;
        const shopExist = await Shop.findOne({ user_id: user_id });

        // if (shopExist) {
        //     return res.status(400).json({ msg: "Vendor already exists" });
        // }
        const newShop = await Shop.create({ shop_pic, shop_cover, name, address, description, contact, service_time, user_id });
        req.body = { menuList: menuList, shop_id: newShop._id.toString() };
        await addfood(req, res);

        return res.status(200).json({ msg: "Vendor created successfully", Shop: newShop });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", error });
    }
};

// --------------------- Add the menu in the Food Model --------------------//
// const addMenu = async (req, res) => {
//     try {
//         const { name, description, category, price, image } = req.body;
//         const newFood = await Food.create({ name, description, category, price, image });
//         res.status(200).json({ msg: "Menu created successfully", newFood });
//     } catch (error) {
//         res.status(404).json({ msg: "Menu Error", error });
//     }
// }

// ------------------Delete the menu if not login in---------------------------//
// const deleteMenu = async (req, res) => {
//     try {
//         const deleteFood = await Food.deleteOne(
//             { name: req.body.name }
//         );
//         res.json({ deleteFood });
//     } catch (error) {
//         res.status(402).send("Error");
//     }
// }

// ----------------- Push the Food Id in menu array in vendor model ----------------//
// const pushMenuId = async (req, res) => {
//     try {
//         const { vendorId, menuId } = req.body;

//         // Find the vendor by its ID
//         const vendor = await Vendor.findById(vendorId);

//         if (!vendor) {
//             return res.status(404).json({ msg: "Vendor not found" });
//         }

//         // Push the menu ID into the menuid array
//         vendor.menuID.push(menuId);
//         await vendor.save();

//         res.status(200).json({ msg: "MenuId pushed successfully", vendor });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: "Internal Server Error", error });
//     }
// };

// --------------------------------- ********deleteSelectedVendor********* ----------------------------- //

const deleteSelectedVendor = async (req, res) => {
    const deleteVendor = await Vendor.deleteOne(
        { contact: req.body.contact }
    );
    res.json({ deleteVendor });
};

// --------------------------------- ********updateSelectedVendor********* ----------------------------- //

const updateSelectedVendor = async (req, res) => {
    try {
        const updatedResult = await Shop.findOneAndUpdate(
            { contact: req.body.contact },
            {
                img: req.body.img,
                coverImg: req.body.coverImg,
                name: req.body.name,
                shopname: req.body.shopname,
                address: req.body.address,
                openingHour: req.body.openingHour,
                closingHour: req.body.closingHour,
                menudata: req.body.menudata,
                ratings: req.body.ratings,
            },
            { new: true }
        );
        // console.log("From updateSelectedVendor : \n \n", updatedResult);
        res.json(updatedResult);
    } catch (error) {
        console.log(error);
        res.status(402).send("Error");
    }
};

// --------------------------------- ********getAllVendors********* ----------------------------- //

const getAllVendors = async (req, res) => {
    try {
        const shops = await Shop.find();
        // console.log("From getAllVendors : \n \n",shops);

        if (!shops || shops.length === 0) {
            return res.status(404).json({ msg: "No shops found" });
        }
        res.status(200).json(shops);
    } catch (error) {
        // next(error);
        console.log(error);
    }
};

// -------------------------------------- ******Get vendor by foods *********** -----------------------------//

// const findVendorByFood = async (req, res) => {
//     try {
//       const { foodId } = req.body; // Assuming food ID comes from a route parameter

//       // Validate food ID format
//       if (!mongoose.Types.ObjectId.isValid(foodId)) {
//         return res.status(400).send("Invalid food ID format");
//       }

//       // Find the food document by ID
//       const food = await Food.findById(foodId);

//       if (!food) {
//         return res.status(404).json({ msg: "Food not found" });
//       }

//       // Search for vendors with matching menu IDs (efficiently)
//       const vendors = await Vendor.find({ menuID: food._id }); // Use $in operator for efficient match

//       if (vendors.length === 0) {
//         return res.status(200).json({ msg: "No vendors found for this food" });
//       }

//       // Respond with the found vendors
//       res.status(200).json({ msg: "Vendors found", vendors }); // Include vendors data
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ msg: "Internal Server Error", error });
//     }
//   };

// --------------------------------- ********Find vendor by food name********* ----------------------------- //

const findVendorByFoodName = async (req, res) => {
    try {
        const { foodName } = req.body; // Assuming food name comes from request body
        // console.log("foodname from get vendor by name : ", foodName);
        // Validate food name presence
        if (!foodName) {
            return res.status(400).send("Please provide a food name");
        }

        // Search for foods with a case-insensitive match on the name
        const foods = await Food.find({ name: { $regex: new RegExp(foodName, 'i') } });
        // console.log("foods after finding all foods : ", foods);
        if (foods.length === 0) {
            return res.status(200).json({ msg: "No food found with that name" });
        }

        // Get all food object IDs efficiently
        const foodIds = foods.map(food => food._id);
        // console.log("food ids from same food name : ", foodIds);
        // Search for vendors with matching menu IDs (efficiently)
        const shops = await Shop.find({ menuID: { $in: foodIds } });
        // console.log("shops having food : ", shops)
        if (shops.length === 0) {
            return res.status(200).json({ msg: "No shops found for this food" });
        }

        // Respond with the found vendors
        res.status(200).json({ msg: "Shops found", shops }); // Include vendors data
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};

// --------------------------------- ********Find vendor by shop name********* ----------------------------- //  

const findVendorsByShopName = async (req, res) => {
    const { shopname } = req.body;

    try {
        const shops = await Shop.find({ shopname });

        if (shops.length === 0) {
            return res.status(404).json({ error: 'No shops found with the specified shop name' });
        }

        res.status(200).json(shops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// --------------------------------- ********Find vendor by food Id********* ----------------------------- //

const findVendorById = async (req, res) => {
    const { shopId } = req.body;

    try {
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        res.status(200).json(shop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// ********************************** Randomly get the food from the database ********************************//

// const getRandomFood = async (req, res) => {
//     try {
//         // Use aggregation pipeline to randomly select menudata items
//         const menuItems = await Vendor.aggregate([
//             { $unwind: '$menudata' }, // Deconstruct the menudata array
//             { $sample: { size: 5 } }, // Randomly select 5 menudata items
//             { $project: { _id: 0, menudata: 1 } } // Project only the menudata items
//         ]);

//         // If no menu items found, return a 404 Not Found response
//         if (!menuItems || menuItems.length === 0) {
//             return res.status(404).json({ message: 'No menu items found' });
//         }

//         // Extract the menu items from the aggregation result and return as JSON response
//         res.json(menuItems.map(item => item.menudata));
//     } catch (error) {
//         // Handle errors
//         console.error('Error fetching random menu items:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

const getRandomFood = async (req, res) => {
    try {
        // Retrieve random vendors
        const randomShop = await Shop.aggregate([{ $sample: { size: 5 } }]);
        // console.log("Random Shops ", randomShop);

        // Extract food IDs from random vendors
        const foodIds = randomShop.flatMap(shop => shop.menuID);
        // console.log("Food ID", foodIds);

        // Retrieve random foods associated with these vendors
        const randomFoods = await Food.aggregate([
            { $match: { _id: { $in: foodIds } } },
            { $sample: { size: 5 } }
        ]);
        // console.log("Random Food", randomFoods);

        // Prepare response data
        const responseData = randomFoods.map(food => {
            // Find vendor for the current food
            const shop = randomShop.find(shop => shop.menuID.includes(food._id));

            // Check if vendor is found
            if (shop) {
                return {
                    foodName: food.name,
                    price: food.price,
                    shop: {
                        name: shop.shopname,
                        address: shop.address
                    }
                };
            } else {
                // Handle case where vendor is not found
                // console.log("Shop not found for food:", food);
                return {
                    foodName: food.name,
                    price: food.price,
                    shop: {
                        name: "Shop Not Found",
                        address: "Address Not Found"
                    }
                };
            }
        });


        // Respond with the random food items along with associated vendor information
        res.status(200).json({ msg: "Random food items found", data: responseData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};


module.exports = {
    addShop,
    deleteSelectedVendor, updateSelectedVendor,
    findVendorByFoodName, getRandomFood, getAllVendors,
    findVendorsByShopName, findVendorById
};
