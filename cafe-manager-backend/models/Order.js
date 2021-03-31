const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ['paid', 'unpaid', 'deactive', 'shipping'],
            default: 'unpaid',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

        table: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Table',
        },
        totalPrice: {
            type: Number,
        },
        order: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                productID: String,
                amount: Number,
            },
        ],
    },
    {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: { currentTime: () => Date.now() },
    }
);
orderSchema.set('timestamps', true);
module.exports = mongoose.model('Order', orderSchema);
