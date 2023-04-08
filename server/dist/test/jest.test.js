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
const mongoose_1 = __importDefault(require("mongoose"));
const Transaction_1 = __importDefault(require("../src/models/Transaction"));
const DatabaseConnection_1 = __importDefault(require("../src/services/DatabaseConnection"));
describe("Transaction model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, DatabaseConnection_1.default)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Transaction_1.default.deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    it("should create and save a transaction successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const transactionData = {
            id: 1,
            date: new Date(),
            merchant_name: "Amazon",
            amount: 100,
            isBezosRelated: true,
            category: ["Online shopping", "Retail"],
        };
        const transaction = new Transaction_1.default(transactionData);
        const savedTransaction = yield transaction.save();
        expect(savedTransaction.id).toBeDefined();
        expect(savedTransaction.date).toBeInstanceOf(Date);
        expect(savedTransaction.merchant_name).toBe(transactionData.merchant_name);
        expect(savedTransaction.amount).toBe(transactionData.amount);
        expect(savedTransaction.isBezosRelated).toBe(true);
        expect(savedTransaction.category).toEqual(expect.arrayContaining(transactionData.category));
    }));
    it("should not save a transaction without required fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const transactionData = {
            id: 1,
            amount: 100,
            isBezosRelated: true,
            category: ["Online shopping", "Retail"],
        };
        const transaction = new Transaction_1.default(transactionData);
        yield expect(transaction.save()).rejects.toThrow(mongoose_1.default.Error.ValidationError);
    }));
    it("should update isBezosRelated field when merchant name is one of Bezos-related merchants", () => __awaiter(void 0, void 0, void 0, function* () {
        const transactionData = {
            id: 1,
            date: new Date(),
            merchant_name: "Amazon",
            amount: 100,
            isBezosRelated: false,
            category: ["Online shopping", "Retail"],
        };
        const transaction = new Transaction_1.default(transactionData);
        const savedTransaction = yield transaction.save();
        expect(savedTransaction.isBezosRelated).toBe(true);
    }));
    it("should not update isBezosRelated field when merchant name is not one of Bezos-related merchants", () => __awaiter(void 0, void 0, void 0, function* () {
        const transactionData = {
            id: 1,
            date: new Date(),
            merchant_name: "Best Buy",
            amount: 100,
            isBezosRelated: false,
            category: ["Electronics", "Retail"],
        };
        const transaction = new Transaction_1.default(transactionData);
        const savedTransaction = yield transaction.save();
        expect(savedTransaction.isBezosRelated).toBe(false);
    }));
});
//# sourceMappingURL=jest.test.js.map