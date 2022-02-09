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
//Each time a instrument is added, deleted or updated a new record is created
const RecordSchema = new mongoose.Schema({
    type: { type: String, required: true }, //add, delete, update (an instrument)
    summary: { type: String, required: false }, //update on instrument with id 0oasdjfbahfjklsdf (it can be clicked and shows a modal with details)
});

const Instrument = mongoose.model("Instrument", InstrumentSchema);
const Record = mongoose.model("Record", RecordSchema);

/******** EXPORTS ********/
exports.Instrument = Instrument;
exports.Record = Record;

exports.connect = async function () {
    mongoose.connect(process.env.MYDB);
};
exports.disconnect = mongoose.disconnect;

/* Instruments */
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
/* END: Instruments */

/* Records */
exports.findRecords = async function () {
    return await Record.find({});
};

// const findRecordById = async function (idParam) {
//     return await Record.findOne({ _id: idParam });
// };
// exports.findRecordById = findRecordById;

exports.saveRecord = async function (recordParam) {
    await recordParam.save();
};
exports.deleteRecords = async function () {
    await Record.deleteMany({});
};
/* END: Records */
