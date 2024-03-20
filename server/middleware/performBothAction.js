const performBothActions = async (req, res, next) => {
    try {
        // Call the first controller logic
        const { name, description, category, price, image } = req.body;
        const newFood = await Food.create({ name, description, category, price, image });
        req.newFood = newFood; // Pass the newFood data to the next middleware/controller
        // Call the second controller logic
        await pushMenuId(req, res);
        next(); // Call next middleware/controller
    } catch (error) {
        res.status(404).json({ msg: "Menu Error", error });
    }
};

module.exports = performBothActions