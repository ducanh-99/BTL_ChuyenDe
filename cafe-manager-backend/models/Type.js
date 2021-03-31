const mongoose = require('mongoose');
const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    photo: {
        type: String,
        required: false,
    }
});
typeSchema.set('timestamps', true);
module.exports = mongoose.model('Type', typeSchema);
