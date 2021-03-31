const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    phone: {
        type: String,
        required: false,
    },
    birthday: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'secret'],
        required: true,
        default: 'secret',
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'cashier', 'inventoryManager'],
        default: 'customer',
    },
    photo: String
});
userSchema.set('timestamps', true);
module.exports = mongoose.model('User', userSchema);
