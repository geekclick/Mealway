const mongoose = require('mongoose');
const Shop = require('../models/shop-model.js');
const Food = require('../models/food-model.js')
const User = require('../models/user-model.js');
const { addfood } = require('./food-controller.js');

// --------------------------Register the Shop -------------------------------//
// const addShop = async (req, res) => {

//     try {
//         const { shopInfo, user_email } = req.body;
//         const { shop_pic, shop_cover, name, address, description, contact, menuList } = shopInfo;
//         const service_time = `${shopInfo.openingHour} - ${shopInfo.closingHour}`

//         const user = await User.findOne({ email: user_email });
//         const user_id = user._id;
//         const shopExist = await Shop.findOne({ user_id: user_id });

//         // if (shopExist) {
//         //     return res.status(400).json({ msg: "Vendor already exists" });
//         // }
//         const newShop = await Shop.create({ shop_pic, shop_cover, name, address, description, contact, service_time, user_id });
//         req.body = { menuList: menuList, shop_id: newShop._id.toString() };
//         await addfood(req, res);

//         return res.status(200).json({ msg: "Vendor created successfully", Shop: newShop });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ msg: "Internal Server Error", error });
//     }
// };

const addShop = async (req, res) => {
    try {
        const { shopInfo, user_email } = req.body;
        const { shop_pic, shop_cover, name, address, description, contact } = shopInfo;
        const service_time = `${shopInfo.openingHour} - ${shopInfo.closingHour}`;

        // Find user by email
        const user = await User.findOne({ email: user_email });
        console.log(user);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const user_id = user._id;

        // Check if shop already exists
        //   const shopExist = await Shop.findOne({ user_id: user_id });
        //   if (shopExist) {
        //     return res.status(400).json({ msg: "Vendor already exists" });
        //   }

        // Create the shop
        const newShop = await Shop.create({
            shop_pic,
            shop_cover,
            name,
            address,
            description,
            contact,
            service_time,
            user_id,
        });


        // Send the final response
        return res.status(200).json({
            msg: "Vendor created successfully",
            shop: newShop._id,
            foodResponse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error", error });
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

        if (!shops || shops.length === 0) {
            return res.status(404).json({ msg: "No shops found" });
        }
        res.status(200).json(shops);
    } catch (error) {
        console.log(error);
    }
};

// --------------------------------- ********Find vendor by food name********* ----------------------------- //

const findVendorByFoodName = async (req, res) => {
    try {
        const { foodName } = req.body;

        if (!foodName) {
            return res.status(400).send("Please provide a food name");
        }

        const foods = await Food.find({ name: { $regex: new RegExp(foodName, 'i') } });

        if (foods.length === 0) {
            return res.status(200).json({ msg: "No food found with that name" });
        }

        const foodIds = foods.map(food => food._id);

        const shops = await Shop.find({ menuID: { $in: foodIds } });

        if (shops.length === 0) {
            return res.status(200).json({ msg: "No shops found for this food" });
        }

        res.status(200).json({ msg: "Shops found", shops });
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

// --------------------------------- ********Find vendor by shop Id********* ----------------------------- //

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

const getRandomFood = async (req, res) => {
    try {

        const randomShop = await Shop.aggregate([{ $sample: { size: 5 } }]);

        const foodIds = randomShop.flatMap(shop => shop.menuID);

        const randomFoods = await Food.aggregate([
            { $match: { _id: { $in: foodIds } } },
            { $sample: { size: 5 } }
        ]);

        const responseData = randomFoods.map(food => {

            const shop = randomShop.find(shop => shop.menuID.includes(food._id));

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