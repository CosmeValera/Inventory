const mongoose = require("mongoose");
require("dotenv").config();

const InstrumentSchema = new mongoose.Schema({
    type: { type: String, required: true },
    subtype: { type: String, required: false },
    name: { type: String, required: true },
    sonority: { type: String, required: true },
    price: { type: Number, required: true },
    summary: { type: String, required: false },
});

const Instrument = mongoose.model("Instrument", InstrumentSchema);

//Exports
exports.Instrument = Instrument;

exports.connect = async function () {
    mongoose.connect(process.env.MYDB);
};
exports.disconnect = mongoose.disconnect;

exports.findInstruments = async function () {
    return await Instrument.find({});
};

const findInstrumentById = async function (idParam) {
    return await Instrument.findOne({ _id: idParam });
};
exports.findInstrumentById = findInstrumentById;

exports.saveInstrument = async function (instrumentParam) {
    await instrumentParam.save();
};
exports.deleteInstrument = async function (idParam) {
    await Instrument.deleteOne({ _id: idParam });
};
exports.updateInstrument = async function (idParam, instrumentParam) {
    var instrumentToChange = await findInstrumentById(idParam);
    instrumentToChange.name = instrumentParam.name;
    instrumentToChange.type = instrumentParam.type;
    instrumentToChange.subtype = instrumentParam.subtype;
    instrumentToChange.sonority = instrumentParam.sonority;
    instrumentToChange.price = instrumentParam.price;
    instrumentToChange.summary = instrumentParam.summary;
    await instrumentToChange.save();
};
