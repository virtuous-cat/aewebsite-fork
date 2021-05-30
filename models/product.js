const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    cost: {
        type: Number,
        min: 0
    },
    wholesalePrice: {
        type: Number,
        min: 0
    },
    retailPrice: {
        type: Number,
        min: 0
    },
    colour: String,
    isUnique: {
        type: Boolean,
        default: false
    },
    isBase: {
        type: Boolean,
        default: false
    },
    frameSet: String,
    qty: Number,
    isRetired: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Product', ProductSchema);