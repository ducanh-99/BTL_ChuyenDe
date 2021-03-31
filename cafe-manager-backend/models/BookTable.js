const mongoose = require('mongoose');
const booktableSchema = new mongoose.Schema({
    table: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Table'
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: Date
});
booktableSchema.set('timestamps', true);
module.exports = mongoose.model('BookTable', booktableSchema);
