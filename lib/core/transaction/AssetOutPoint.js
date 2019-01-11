"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var H256_1 = require("../H256");
var U64_1 = require("../U64");
/**
 * AssetOutPoint consists of tracker and index, asset type, and amount.
 *
 * - The transaction that it points to must be either AssetMint or AssetTransfer.
 * - Index is what decides which Asset to point to amongst the Asset list that transaction creates.
 * - The asset type and amount must be identical to the Asset that it points to.
 */
var AssetOutPoint = /** @class */ (function () {
    /**
     * @param data.tracker A transaction tracker where the Asset is created.
     * @param data.index The index in the output of the transaction.
     * @param data.assetType The asset type of the asset that it points to.
     * @param data.amount The asset amount of the asset that it points to.
     * @param data.lockScriptHash The lock script hash of the asset.
     * @param data.parameters The parameters of the asset.
     */
    function AssetOutPoint(data) {
        var tracker = data.tracker, index = data.index, assetType = data.assetType, amount = data.amount, lockScriptHash = data.lockScriptHash, parameters = data.parameters;
        this.tracker = tracker;
        this.index = index;
        this.assetType = assetType;
        this.amount = amount;
        this.lockScriptHash = lockScriptHash;
        this.parameters = parameters;
    }
    /**
     * Create an AssetOutPoint from an AssetOutPoint JSON object.
     * @param data An AssetOutPoint JSON object.
     * @returns An AssetOutPoint.
     */
    AssetOutPoint.fromJSON = function (data) {
        var tracker = data.tracker, index = data.index, assetType = data.assetType, amount = data.amount;
        return new this({
            tracker: new H256_1.H256(tracker),
            index: index,
            assetType: new H256_1.H256(assetType),
            amount: U64_1.U64.ensure(amount)
        });
    };
    /**
     * Convert to an object for RLP encoding.
     */
    AssetOutPoint.prototype.toEncodeObject = function () {
        var _a = this, tracker = _a.tracker, index = _a.index, assetType = _a.assetType, amount = _a.amount;
        return [
            tracker.toEncodeObject(),
            index,
            assetType.toEncodeObject(),
            amount.toEncodeObject()
        ];
    };
    /**
     * Convert to an AssetOutPoint JSON object.
     * @returns An AssetOutPoint JSON object.
     */
    AssetOutPoint.prototype.toJSON = function () {
        var _a = this, tracker = _a.tracker, index = _a.index, assetType = _a.assetType, amount = _a.amount;
        return {
            tracker: tracker.toJSON(),
            index: index,
            assetType: assetType.toJSON(),
            amount: amount.toJSON()
        };
    };
    return AssetOutPoint;
}());
exports.AssetOutPoint = AssetOutPoint;
