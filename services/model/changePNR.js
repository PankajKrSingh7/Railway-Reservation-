const mongoose = require('mongoose')

const changePNRSchema = mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    oldUser: {
        type: Object,
        required: false,
    },
    newUser: {
        type: Object,
        required: false,
    }
})

const changePNR = module.exports = mongoose.model('ChangePNR', changePNRSchema)