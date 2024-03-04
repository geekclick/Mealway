const Vendor = require('../models/vendor-model.js');
// const multer = require('multer');
const path = require('path')

// 1. Get Data
// 2. Check email Existence
// 3. Hash Password
// 4. Create user/vendor
// 5. Save to DB
// 6. Respond with registration successfull or handle error

const addVendor = async (req,res)=>{

    try {
        const { name, shopname, address, contact, openCloseHours, menu } = req.body;

        const vendorExist = await Vendor.findOne({contact});

        if(vendorExist){
            return res.status(400).json({msg:"Vendor Already exits"});
        }

        await Vendor.create({ name, shopname,address, contact, openCloseHours, menu });

        res.status(200).json({msg:"Vendor Created Succesfully"});
    }catch (error) {
        res.status(500).json({msg:"Internal Server Error",error});
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
    try{
        const vendors = await Vendor.find();
        console.log(vendors);

        if(!vendors || vendors.length === 0){
            return res.status(404).json({msg:"No vendors found"});
        }
        res.status(200).json(vendors);
    } catch (error){
        next(error);
    } 
};



module.exports = {addVendor, getAllVendors, deleteSelectedVendor, updateSelectedVendor}; 
