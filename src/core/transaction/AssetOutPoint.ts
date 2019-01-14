import { H160 } from "../H160";
import { H256 } from "../H256";
import { U64 } from "../U64";

export interface AssetOutPointJSON {
    tracker: string;
    index: number;
    assetType: string;
    quantity: string;
}

export interface AssetOutPointData {
    tracker: H256;
    index: number;
    assetType: H256;
    quantity: U64;
    lockScriptHash?: H160;
    parameters?: Buffer[];
}

/**
 * AssetOutPoint consists of tracker and index, asset type, and quantity.
 *
 * - The transaction that it points to must be either AssetMint or AssetTransfer.
 * - Index is what decides which Asset to point to amongst the Asset list that transaction creates.
 * - The asset type and quantity must be identical to the Asset that it points to.
 */
export class AssetOutPoint {
    /**
     * Create an AssetOutPoint from an AssetOutPoint JSON object.
     * @param data An AssetOutPoint JSON object.
     * @returns An AssetOutPoint.
     */
    public static fromJSON(data: AssetOutPointJSON) {
        const { tracker, index, assetType, quantity } = data;
        return new this({
            tracker: new H256(tracker),
            index,
            assetType: new H256(assetType),
            quantity: U64.ensure(quantity)
        });
    }
    public readonly tracker: H256;
    public readonly index: number;
    public readonly assetType: H256;
    public readonly quantity: U64;
    public readonly lockScriptHash?: H160;
    public readonly parameters?: Buffer[];

    /**
     * @param data.tracker A transaction tracker where the Asset is created.
     * @param data.index The index in the output of the transaction.
     * @param data.assetType The asset type of the asset that it points to.
     * @param data.quantity The asset quantity of the asset that it points to.
     * @param data.lockScriptHash The lock script hash of the asset.
     * @param data.parameters The parameters of the asset.
     */
    constructor(data: AssetOutPointData) {
        const {
            tracker,
            index,
            assetType,
            quantity,
            lockScriptHash,
            parameters
        } = data;
        this.tracker = tracker;
        this.index = index;
        this.assetType = assetType;
        this.quantity = quantity;
        this.lockScriptHash = lockScriptHash;
        this.parameters = parameters;
    }

    /**
     * Convert to an object for RLP encoding.
     */
    public toEncodeObject() {
        const { tracker, index, assetType, quantity } = this;
        return [
            tracker.toEncodeObject(),
            index,
            assetType.toEncodeObject(),
            quantity.toEncodeObject()
        ];
    }

    /**
     * Convert to an AssetOutPoint JSON object.
     * @returns An AssetOutPoint JSON object.
     */
    public toJSON(): AssetOutPointJSON {
        const { tracker, index, assetType, quantity } = this;
        return {
            tracker: tracker.toJSON(),
            index,
            assetType: assetType.toJSON(),
            quantity: quantity.toJSON()
        };
    }
}
