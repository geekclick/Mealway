const Food = require('../models/food-model')

// const addfood = async (req, res) => {
//   try {
//     const duplicate = [];
//     const { menu, shop_id } = req.body;

//     const foodPromises = menu.map(async (menu) => {
//       const foodExist = await Food.findOne({ name: menu.name, shop_id: shop_id });
//       if (!foodExist) {
//         const { name, description, category, price, image } = menu;
//         return Food.create({ shop_id, name, description, category, price, image });
//       } else {
//         console.log("Food already exists:", foodExist.name);
//         duplicate.push(foodExist);
//         return null;
//       }
//     });

//     const results = await Promise.all(foodPromises);

//     const createdFoods = results.filter(food => food !== null);

//     return res.status(200).json({
//       msg: "Food created successfully",
//       createdFoods,
//       duplicates: duplicate
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ msg: "Internal Server Error", error: error.message });
//   }
// };

// --------------------------------- ********deleteSelectedFood********* ----------------------------- //

const addfood = async (req, res) => {
  try {


    console.log("request : ", req.body);

    const { menu, shop_id } = req.body;
    if (!menu) {
      throw new Error("Invalid or missing menu");
    }

    const foodExist = await Food.findOne({ name: menu.name, shop_id: shop_id });
    if (!foodExist) {
      const { name, description, category, price, image } = menu;
      const createdFoods = Food.create({ shop_id, name, description, category, price, image });
      return res.status(200).json({
        msg: "Food created successfully",
        createdFoods,
      });
    } else {
      console.log("Food already exists:", foodExist.name);
      return res.status(400).json({
        msg: "Food already exists"
      })
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error adding food items: " + error.message);
  }
};

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
    // console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// --------------------------------- ********getAllFoods********* ----------------------------- //

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find(req.body.shop_id);

    if (!foods || foods.length === 0) {
      return res.status(404).json({ msg: "No foods found" });
    }
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).send(error)
  }
};

// --------------------------------- ********getFoodByCategory********* ----------------------------- //

const getFoodByCategory = async (req, res) => {

  const { category } = req.params;

  try {
    const foods = await Food.find({ category }).populate('shop_id');
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch foods.", error });
  }
}

// --------------------------------- ********get food by food id********* ----------------------------- //

const getFoodByFoodId = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await Food.findById(id).populate('shop_id');
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    const shopFoods = await Food.find({ shop_id: food.shop_id });

    res.status(200).json({ food, shop: food.shop_id, shopFoods });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food details.", error });
  }
}

const getFoodByFoodName = async (req, res) => {
  const { name } = req.params;

  try {
    const foods = await Food.find({
      name: { $regex: new RegExp(`^${name}$`, "i") }
    });

    if (!foods) {
      return res.status(404).json({ error: "Food not found" });
    }

    res.status(200).json(foods)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch foods", error })
  }
}


module.exports = { addfood, getAllFoods, deleteSelectedFood, updateSelectedFood, getFoodByCategory, getFoodByFoodId, getFoodByFoodName };