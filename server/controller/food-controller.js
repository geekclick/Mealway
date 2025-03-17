const Food = require('../models/food-model')
// const multer = require('multer');
// const path = require('path')

// 1. Get Data
// 2. Check email Existence
// 3. Hash Password
// 4. Create user/Food
// 5. Save to DB
// 6. Respond with registration successfull or handle error

const addfood = async (req, res) => {
  try {
    const duplicate = [];
    const { menuList, shop_id } = req.body;
    
    // Create an array of promises for each menu item
    const foodPromises = menuList.map(async (menu) => {
      const foodExist = await Food.findOne({ name: menu.name, shop_id: shop_id });
      if (!foodExist) {
        const { name, description, category, price, image } = menu;
        console.log("from food api menu ",menu)
        return Food.create({ shop_id, name, description, category, price, image });
      } else {
        console.log("Food already exists:", foodExist.name);
        duplicate.push(foodExist);
        return null; // Return null for duplicates
      }
    });

    // Wait for all promises to resolve
    const results = await Promise.all(foodPromises);

    // Filter out null values (duplicates)
    const createdFoods = results.filter(food => food !== null);

    return res.status(200).json({
      msg: "Food created successfully",
      createdFoods,
      duplicates: duplicate
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};

// --------------------------------- ********deleteSelectedFood********* ----------------------------- //

const deleteSelectedFood = async (req, res) => {
  const deleteFood = await Food.deleteOne(
    { name: req.body.name }
  );
  res.json({ deleteFood });
};

// --------------------------------- ********updateSelectedFood********* ----------------------------- //

const updateSelectedFood = async (req, res) => {
  try {
    const updatedResult = await Food.findOneAndUpdate(
      { name: req.body.name },
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        ingredients: req.body.ingredients,
        rating: req.body.rating,
        location: req.body.location,
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

// --------------------------------- ********getAllFoods********* ----------------------------- //

const getAllFoods = async (req, res) => {
  try {
    console.log(req)
    const foods = await Food.find(req.body.shop_id);
    console.log(foods);

    if (!foods || foods.length === 0) {
      return res.status(404).json({ msg: "No foods found" });
    }
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).send(error)
  }
};



module.exports = { addfood, getAllFoods, deleteSelectedFood, updateSelectedFood };