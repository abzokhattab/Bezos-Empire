"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const router = express_1.default.Router();
router.get("/transactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield Transaction_1.default.find();
        res.json({
            transactions,
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}));
router.post("/transactions/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isBezosRelated } = req.body;
    try {
        // Find the transaction by ID
        const transaction = yield Transaction_1.default.findOne({ id });
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        yield Transaction_1.default.updateMany({ merchant_name: transaction.merchant_name }, { isBezosRelated });
        res.json({ message: "Transaction updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map