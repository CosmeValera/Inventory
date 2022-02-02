const mongoose = require("mongoose");

const InstrumentSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    type: { type: String, required: true },
    subtype: { type: String, required: false },
    name: { type: String, required: true },
    img: { type: String, required: true },
    sonority: { type: String, required: true },
    price: { type: Number, required: true },
    summary: { type: String, required: false },
});

const Instrument = mongoose.model("Instrument", InstrumentSchema);

//Exports
exports.Instrument = Instrument;

exports.connect = async function () {
    mongoose.connect("mongodb://localhost:27017/inventory");
};
exports.disconnect = mongoose.disconnect;

exports.saveInstrument = async function (instrumentParam) {
    await instrumentParam.save();
};
exports.deleteInstrument = async function (instrumentParam) {
    await Instrument.find({ id: instrumentParam.id }).deleteOne().exec();
};
exports.findInstruments = async function () {
    await Instrument.find({});
};
