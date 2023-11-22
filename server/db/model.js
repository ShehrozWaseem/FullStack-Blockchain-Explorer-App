const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({   
    hash: String,
    performed: String,
    time: String,
    from: String,
    to: String,
    amount: String,
    gasFees: String
    
})

const transactionModel = new mongoose.model('history', transactionSchema)

module.exports = {transactionModel}