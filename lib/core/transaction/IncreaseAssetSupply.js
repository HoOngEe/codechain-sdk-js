"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var utils_1 = require("../../utils");
var Transaction_1 = require("../Transaction");
var AssetMintOutput_1 = require("./AssetMintOutput");
var RLP = require("rlp");
var IncreaseAssetSupply = /** @class */ (function (_super) {
    __extends(IncreaseAssetSupply, _super);
    function IncreaseAssetSupply(params) {
        var _this = _super.call(this, params.networkId) || this;
        _this.transaction = new IncreaseAssetSupplyTransaction(params);
        _this.approvals = params.approvals;
        return _this;
    }
    IncreaseAssetSupply.prototype.tracker = function () {
        return new codechain_primitives_1.H256(utils_1.blake256(this.transaction.rlpBytes()));
    };
    IncreaseAssetSupply.prototype.type = function () {
        return "increaseAssetSupply";
    };
    IncreaseAssetSupply.prototype.actionToEncodeObject = function () {
        var encoded = this.transaction.toEncodeObject();
        encoded.push(this.approvals);
        return encoded;
    };
    IncreaseAssetSupply.prototype.actionToJSON = function () {
        var json = this.transaction.toJSON();
        return __assign({}, json, { approvals: this.approvals });
    };
    return IncreaseAssetSupply;
}(Transaction_1.Transaction));
exports.IncreaseAssetSupply = IncreaseAssetSupply;
var IncreaseAssetSupplyTransaction = /** @class */ (function () {
    function IncreaseAssetSupplyTransaction(params) {
        this.networkId = params.networkId;
        this.shardId = params.shardId;
        this.assetType = params.assetType;
        this.output = new AssetMintOutput_1.AssetMintOutput(params.output);
    }
    IncreaseAssetSupplyTransaction.prototype.toJSON = function () {
        return {
            networkId: this.networkId,
            shardId: this.shardId,
            assetType: this.assetType.toEncodeObject(),
            output: this.output.toJSON()
        };
    };
    IncreaseAssetSupplyTransaction.prototype.toEncodeObject = function () {
        return [
            0x18,
            this.networkId,
            this.shardId,
            this.assetType.toEncodeObject(),
            this.output.lockScriptHash.toEncodeObject(),
            this.output.parameters.map(function (parameter) { return Buffer.from(parameter); }),
            this.output.supply.toEncodeObject()
        ];
    };
    IncreaseAssetSupplyTransaction.prototype.rlpBytes = function () {
        return RLP.encode(this.toEncodeObject());
    };
    return IncreaseAssetSupplyTransaction;
}());
