const TransactionSchema = require('../models/Transaction')

class TransactionsController {
    async create(req, res, next) {
        try {
            const transaction_data = req.body;

            const transaction = TransactionSchema(transaction_data)

            await transaction.save();
            res.status(200).json(transaction)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        }
    }

    async edit (req, res, next) {
        try {
            const transaction_data = req.body;

            console.log(transaction_data)

            const transaction = await TransactionSchema.findOneAndUpdate({'_id': transaction_data._id}, transaction_data )

            res.status(200).json(transaction)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        }
    }

    async getAll(req, res, next) {
        try {
            const transactions = await TransactionSchema.find({type: {$ne: 3}}).sort({date: -1})
            res.status(200).json(transactions);
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        }
        // res.json([
        //     {title: 'Test 123', amount: 200, date: new Date(), type: 1},
        //     {title: 'Test', amount: 200, date: new Date(), type: 1},
        //     {title: 'Test', amount: 200, date: new Date(), type: 1},
        //     {title: 'Test', amount: 200, date: new Date(), type: 1},
        //     {title: 'Test', amount: 200, date: new Date(), type: 2},
        // ])
    }

    async getFutureTransactions(req, res, next) {
        try {
            const transactions = await TransactionSchema.find().where('type').equals(3).sort({date: -1})
            res.status(200).json(transactions);
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        }
        // res.json([
        //     {title: 'Test', amount: 542, date: null, type: 3, checked: false},
        //     {title: 'Test', amount: 200, date: null, type: 3, checked: true},
        //     {title: 'Test', amount: 200, date: null, type: 3, checked: true},
        //     {title: 'Test', amount: 200, date: null, type: 3, checked: false},
        //     {title: 'Test', amount: 200, date: null, type: 3, checked: false},
        // ])
    }

    async remove(req, res, next) {

    }
}

module.exports = new TransactionsController();
