
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 0,
        max: 255,
    },
    description: {
        type: String,
        required: false,
        max: 1023,
        min: 0,
    },
    status: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    },
    book: [
        {
            
            time: {
                type: Date,
                required: true,
                default: Date.now,
            },
            amount: {
                type: Number,
                default: 0,
              },
        }
    ] 
});
productSchema.set('timestamps', true);
module.exports = mongoose.model('Product', productSchema);