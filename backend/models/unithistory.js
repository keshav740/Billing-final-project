
const mongoose = require("mongoose");

const UnitHistorySchema = new mongoose.Schema({

    itemName: {
        type: String,
    },
    unitName: {
        type: String,
    },
    pieceInUnit: {
        type: Number,
    },
    ratePerUnit: {
        type: Number,
    },
    createdDate:{
        type:Date,
    }
    // image: {
    //     type:String
    //   },


});

module.exports = mongoose.model("UnitHistory", UnitHistorySchema);

