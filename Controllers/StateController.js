const StateModel = require('../Models/States');

const createState = async (req, res, next) => {
    try {
        const state = new StateModel(req.body);
        await state.save();
        return res.state(400).json(state);
    }
    catch (err) {
        return res.status(200).json({ message: err });
    }
}
const getStates = async (req, res, next) => {
    try {
        const allStates = await StateModel.find({});
        return res.status(200).json(allStates);
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}
module.exports = {
    createState,
    getStates
}