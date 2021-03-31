const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 0,
        max: 30,
    },
    description: {
        type: String,
        required: false,
        max: 255,
        min: 0,
    },
    status: {
        type: String,
        enum: ['free', 'booked', 'busy', 'deactive'],
        default: 'free',
    },
    book: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            time: Date
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
tableSchema.set('timestamps', true);
module.exports = mongoose.model('Table', tableSchema);
