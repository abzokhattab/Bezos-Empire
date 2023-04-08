"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        required: true,
    },
    merchant_name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    isBezosRelated: {
        type: Boolean,
        required: true,
        default: false,
    },
    category: {
        type: [String],
        required: true,
    },
});
// Creating indcies to speed up the process
transactionSchema.index({ id: 1 });
transactionSchema.index({ merchant_name: 1 });
function isBezosMerchant(merchant) {
    const bezosMerchants = [
        "Amazon",
        "Washington Post",
        "Whole Foods",
        "Blue Origin",
    ];
    return bezosMerchants.includes(merchant);
}
transactionSchema.pre("save", function (next) {
    this.isBezosRelated = isBezosMerchant(this.merchant_name) ? true : false;
    next();
});
// Define the transaction model
const Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
exports.default = Transaction;
//# sourceMappingURL=Transaction.js.map