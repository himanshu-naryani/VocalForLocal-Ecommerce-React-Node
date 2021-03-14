const CategoryModel = require('../Models/Category');

const createCategory = async (req, res, next) => {
    try {
        const category = new CategoryModel(req.body);
        await category.save();
        return res.state(400).json(state);
    }
    catch (err) {
        return res.status(200).json({ message: err });
    }
}
const getCategories = async (req, res, next) => {
    try {
        const allCategories = await CategoryModel.find({});
        return res.status(200).json(allCategories);
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}

module.exports = {
    createCategory,
    getCategories
}