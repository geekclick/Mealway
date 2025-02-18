const mongoose = require('mongoose');
const Vendor = require('../models/shop-model.js');
const Food = require('../models/food-model.js')

// --------------------------Register the Shop -------------------------------//
const addShop = async (req, res) => {
    try {
        const { img, coverImg, name, shopname, location, address, description, menuid, menudata, contact, openingHour, closingHour } = req.body;

        const vendorExist = await Vendor.findOne({ contact });

        if (vendorExist) {
            return res.status(400).json({ msg: "Vendor already exists" });
        }

        const newVendor = await Vendor.create({ img, coverImg, name, shopname, address, menuid, location, description, menudata, contact, openingHour, closingHour });

        res.status(200).json({ msg: "Vendor created successfully", vendor: newVendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};

// --------------------- Add the menu in the Food Model --------------------//
const addMenu = async (req, res) => {
    try {
        const { name, description, category, price, image } = req.body;
        const newFood = await Food.create({ name, description, category, price, image });
        res.status(200).json({ msg: "Menu created successfully", newFood });
    } catch (error) {
        res.status(404).json({ msg: "Menu Error", error });
    }
}

// ------------------Delete the menu if not login in---------------------------//
const deleteMenu = async (req, res) => {
    try {
        const deleteFood = await Food.deleteOne(
            { name: req.body.name }
        );
        res.json({ deleteFood });
    } catch (error) {
        res.status(402).send("Error");
    }
}

// ----------------- Push the Food Id in menu array in vendor model ----------------//
const pushMenuId = async (req, res) => {
    try {
        const { vendorId, menuId } = req.body;

        // Find the vendor by its ID
        const vendor = await Vendor.findById(vendorId);

        if (!vendor) {
            return res.status(404).json({ msg: "Vendor not found" });
        }

        // Push the menu ID into the menuid array
        vendor.menuID.push(menuId);
        await vendor.save();

        res.status(200).json({ msg: "MenuId pushed successfully", vendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};

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
        const updatedResult = await Vendor.findOneAndUpdate(
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
        console.log(updatedResult);
        res.json(updatedResult);
    } catch (error) {
        console.log(error);
        res.status(402).send("Error");
    }
};

// --------------------------------- ********getAllVendors********* ----------------------------- //

const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        console.log(vendors);

        if (!vendors || vendors.length === 0) {
            return res.status(404).json({ msg: "No vendors found" });
        }
        res.status(200).json(vendors);
    } catch (error) {
        next(error);
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
        console.log("foodname from get vendor by name : ", foodName);
        // Validate food name presence
        if (!foodName) {
            return res.status(400).send("Please provide a food name");
        }

        // Search for foods with a case-insensitive match on the name
        const foods = await Food.find({ name: { $regex: new RegExp(foodName, 'i') } });
        console.log("foods after finding all foods : ", foods);
        if (foods.length === 0) {
            return res.status(200).json({ msg: "No food found with that name" });
        }

        // Get all food object IDs efficiently
        const foodIds = foods.map(food => food._id);
        console.log("food ids from same food name : ", foodIds);
        // Search for vendors with matching menu IDs (efficiently)
        const vendors = await Vendor.find({ menuID: { $in: foodIds } });
        console.log("vendors having food : ", vendors)
        if (vendors.length === 0) {
            return res.status(200).json({ msg: "No vendors found for this food" });
        }

        // Respond with the found vendors
        res.status(200).json({ msg: "Vendors found", vendors }); // Include vendors data
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};

// --------------------------------- ********Find vendor by shop name********* ----------------------------- //  

const findVendorsByShopName = async (req, res) => {
    const { shopname } = req.body;

    try {
        const vendors = await Vendor.find({ shopname });

        if (vendors.length === 0) {
            return res.status(404).json({ error: 'No vendors found with the specified shop name' });
        }

        res.status(200).json(vendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// --------------------------------- ********Find vendor by food Id********* ----------------------------- //

const findVendorById = async (req, res) => {
    const { vendorId } = req.body;

    try {
        const vendor = await Vendor.findById(vendorId);

        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        res.status(200).json(vendor);
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
        const randomVendors = await Vendor.aggregate([{ $sample: { size: 5 } }]);
        console.log("Random Vendors", randomVendors);

        // Extract food IDs from random vendors
        const foodIds = randomVendors.flatMap(vendor => vendor.menuID);
        console.log("Food ID", foodIds);

        // Retrieve random foods associated with these vendors
        const randomFoods = await Food.aggregate([
            { $match: { _id: { $in: foodIds } } },
            { $sample: { size: 5 } }
        ]);
        console.log("Random Food", randomFoods);

        // Prepare response data
        const responseData = randomFoods.map(food => {
            // Find vendor for the current food
            const vendor = randomVendors.find(vendor => vendor.menuID.includes(food._id));

            // Check if vendor is found
            if (vendor) {
                return {
                    foodName: food.name,
                    price: food.price,
                    vendor: {
                        name: vendor.shopname,
                        address: vendor.address
                    }
                };
            } else {
                // Handle case where vendor is not found
                console.log("Vendor not found for food:", food);
                return {
                    foodName: food.name,
                    price: food.price,
                    vendor: {
                        name: "Vendor Not Found",
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
    addShop, addMenu, deleteMenu, pushMenuId,
    deleteSelectedVendor, updateSelectedVendor,
    findVendorByFoodName, getRandomFood, getAllVendors,
    findVendorsByShopName, findVendorById
};
