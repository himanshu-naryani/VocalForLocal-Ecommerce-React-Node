const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    stateId: { type: String, required: true },
    stateName: { type: String, required: true },
    stateDescription: { type: String },
    stateImages: [String]
})

const StateModel = mongoose.model("StateModel", stateSchema);

module.exports = StateModel;