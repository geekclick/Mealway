const Vendor = require('../models/vendor-model.js');
const path = require('path')

const addVendor = async (req, res) => {

    try {
        const { img, coverImg, name, shopname, location, address, description, menu, contact, openCloseHours } = req.body;

        const vendorExist = await Vendor.findOne({ contact });

        if (vendorExist) {
            return res.status(400).json({ msg: "Vendor Already exits" });
        }

        await Vendor.create({ img, coverImg, name, shopname, address, location, description, menu, contact, openCloseHours });

        res.status(200).json({ msg: "Vendor Created Succesfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error });
        console.log(error);
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
                openCloseHours: req.body.openCloseHours,
                menu: req.body.menu,
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

const getVendorsByFood = async (req, res) => {

    try {
        const foodItem = req.body.foodItem;

        // Search vendors by food item using the text index
        const vendors = await Vendor.find({ $text: { $search: foodItem } }, { _id: 0, name: 1, shopname: 1, location: 1 });
        const vendorName = vendors.name;


        if (!vendors.length) {
            return res.status(404).json({ message: 'No vendors found for the searched food item.' });
        }

        const simplifiedVendors = [];

        // Iterate over each vendor and extract the required fields
        vendors.forEach(vendor => {
            const simplifiedVendor = {
                name: vendor.name,
                shopname: vendor.shopname,
                location: vendor.location // Include location coordinates
            };
            simplifiedVendors.push(simplifiedVendor);
        });

        res.json(simplifiedVendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};





module.exports = { addVendor, getAllVendors, deleteSelectedVendor, updateSelectedVendor, getVendorsByFood };
