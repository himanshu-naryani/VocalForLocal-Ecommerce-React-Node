const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true },
})

const CategoryModel = mongoose.model("CategoryModel", categorySchema);

module.exports = CategoryModel;