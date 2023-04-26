const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    currentBalance: {
        type: Number,
        default: 0
    },
    moneyAmountPerMonth: {
        type: [Number],
        default: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
    },
    moneyAmountPerWeek: {
        type: Number,
        default: 0
    },
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)
