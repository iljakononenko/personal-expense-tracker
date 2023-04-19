const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: Number,
        default: 2
    },
    date: {
        type: Date,
        required: false,
        trim: true,
        default: new Date()
    },
    checked: {
        type: Boolean,
        required: false,
        trim: true,
        default: false,
    }
}, {timestamps: true})

module.exports = mongoose.model('Transaction', TransactionSchema)
