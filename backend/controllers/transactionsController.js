const TransactionSchema = require('../models/Transaction')
const UserSchema = require("../models/User");

class TransactionsController {
    async create(req, res, next) {
        try {
            const transaction_data = req.body;

            const transaction = TransactionSchema(transaction_data)

            await transaction.save();

            if (transaction.type < 3) {
                const result = await UserSchema.find();
                const user = result[0];

                let amountToChange = Number(transaction_data.amount);

                if (transaction.type == 2) {
                    amountToChange *= -1;
                }

                user.moneyAmountPerMonth[transaction.date.getMonth()] += amountToChange;
                user.currentBalance += amountToChange;
                await user.save();
            }
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

            let transaction = await TransactionSchema.findOne({'_id': transaction_data._id} )

            console.log(transaction)
            console.log(transaction_data)

            if (transaction.type == 3 && transaction.checked != transaction_data.checked) {
                const result = await UserSchema.find();
                const user = result[0];

                let amountToChange = Number(transaction_data.amount);

                if (transaction_data.checked) {
                    amountToChange *= -1;
                }

                user.moneyAmountPerMonth[transaction.date.getMonth()] += amountToChange;
                user.currentBalance += amountToChange;
                await user.save();
            }

            transaction = await TransactionSchema.findOneAndUpdate({'_id': transaction_data._id}, transaction_data )

            res.status(200).json(transaction)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        }
    }

    async getAll(req, res, next) {
        try {

            console.log(req.query)
            console.log(req.query.week)
            console.log(req.query.month)

            let dateQuery;

            if (req.query.month) {
                let today = new Date();
                today.setMonth(req.query.month)

                let firstDay = new Date(today.getFullYear(), today.getMonth(), 1, 2, 0, 0);
                let lastDay = new Date(today.getFullYear(), today.getMonth()+1, 1, 2, 0, 0);

                if (req.query.week && req.query.week != 0) {
                    let firstDayInWeek = firstDay.getDate() + ( (req.query.week-1) * 7 );
                    let lastDayInWeek = lastDay.getDate() + ( (req.query.week) * 7 );
                    firstDay.setDate( firstDayInWeek )

                    console.log(lastDayInWeek)
                    console.log(lastDay.getDate())
                    if (lastDayInWeek > lastDay.getDate()) {
                        lastDay.setMonth(today.getMonth())
                    }

                    lastDay.setDate( lastDayInWeek )
                }

                console.log(firstDay)
                console.log(lastDay)

                dateQuery = {
                    date: {
                        $gt: firstDay.toString(),
                        $lt: lastDay.toString()
                    }
                }
            }

            let andQuery = [
                {
                    type: {$ne: 3}
                }
            ]

            if (dateQuery) {
                andQuery.push(dateQuery)
            }

            const transactions = await TransactionSchema.find({
                $and: andQuery
            }).sort({date: -1})

            res.status(200).json(transactions);
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        }
    }

    async getFutureTransactions(req, res, next) {
        try {
            let dateQuery;

            if (req.query.month) {
                let today = new Date();
                today.setMonth(req.query.month)

                let firstDay = new Date(today.getFullYear(), today.getMonth(), 1, 2, 0, 0);
                let lastDay = new Date(today.getFullYear(), today.getMonth()+1, 1, 2, 0, 0);

                console.log(firstDay)
                console.log(lastDay)

                dateQuery = {
                    date: {
                        $gt: firstDay.toString(),
                        $lt: lastDay.toString()
                    }
                }
            }

            let andQuery = [
                {
                    type: {$eq: 3}
                }
            ]

            if (dateQuery) {
                andQuery.push(dateQuery)
            }

            const transactions = await TransactionSchema.find({
                $and: andQuery
            }).sort({date: -1})
            res.status(200).json(transactions);
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        }
    }

    async remove(req, res, next) {
        try {
            if (req.params.id) {
                await TransactionSchema.deleteOne({'_id': req.params.id})
                res.status(200).send();
            } else {
                res.status(400).json({message: "No id given"});
            }
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        }
    }
}

module.exports = new TransactionsController();
