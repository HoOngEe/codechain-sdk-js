/// <reference types="node" />
import { AssetTransferAddress } from "codechain-primitives";
import { H160 } from "../H160";
import { H256 } from "../H256";
import { U64 } from "../U64";
import { AssetOutPoint, AssetOutPointJSON } from "./AssetOutPoint";
export interface OrderJSON {
    assetTypeFrom: string;
    assetTypeTo: string;
    assetTypeFee: string;
    assetQuantityFrom: string;
    assetQuantityTo: string;
    assetQuantityFee: string;
    originOutputs: AssetOutPointJSON[];
    expiration: string;
    lockScriptHashFrom: string;
    parametersFrom: number[][];
    lockScriptHashFee: string;
    parametersFee: number[][];
}
export interface OrderDataBasic {
    assetTypeFrom: H256;
    assetTypeTo: H256;
    assetTypeFee?: H256;
    assetQuantityFrom: U64;
    assetQuantityTo: U64;
    assetQuantityFee?: U64;
    originOutputs: AssetOutPoint[];
    expiration: U64;
}
export interface OrderAddressData {
    assetTypeFrom: H256;
    assetTypeTo: H256;
    assetTypeFee?: H256;
    assetQuantityFrom: U64;
    assetQuantityTo: U64;
    assetQuantityFee?: U64;
    originOutputs: AssetOutPoint[];
    expiration: U64;
    recipientFrom: AssetTransferAddress;
    recipientFee: AssetTransferAddress;
}
export declare class Order {
    /**
     * Create an Order from an OrderJSON object.
     * @param data An OrderJSON object.
     * @returns An Order.
     */
    static fromJSON(data: OrderJSON): Order;
    readonly assetTypeFrom: H256;
    readonly assetTypeTo: H256;
    readonly assetTypeFee: H256;
    readonly assetQuantityFrom: U64;
    readonly assetQuantityTo: U64;
    readonly assetQuantityFee: U64;
    readonly originOutputs: AssetOutPoint[];
    readonly expiration: U64;
    readonly lockScriptHashFrom: H160;
    readonly parametersFrom: Buffer[];
    readonly lockScriptHashFee: H160;
    readonly parametersFee: Buffer[];
    /**
     * @param data.assetTypeFrom The asset type of the asset to give.
     * @param data.assetTypeTo The asset type of the asset to get.
     * @param data.assetTypeFee The asset type of the asset for fee.
     * @param data.assetQuantityFrom The quantity of the asset to give.
     * @param data.assetQuantityTo The quantity of the asset to get.
     * @param data.assetQuantityFee The quantity of the asset for fee.
     * @param data.originOutputs The previous outputs to be consumed by the order.
     * @param data.expiration The expiration time of the order, by seconds.
     * @param data.lockScriptHash The lock script hash of the asset.
     * @param data.parameters The parameters of the asset.
     */
    constructor(data: OrderDataBasic & ({
        lockScriptHashFrom: H160;
        parametersFrom: Buffer[];
    } | {
        recipientFrom: AssetTransferAddress;
    }) & ({
        lockScriptHashFee: H160;
        parametersFee: Buffer[];
    } | {
        recipientFee: AssetTransferAddress;
    }));
    /**
     * Convert to an object for RLP encoding.
     */
    toEncodeObject(): (string | number | Buffer[] | (string | number)[][])[];
    /**
     * Convert to RLP bytes.
     */
    rlpBytes(): Buffer;
    /**
     * Convert to an OrderJSON object.
     * @returns An OrderJSON object.
     */
    toJSON(): OrderJSON;
    /**
     * Get the hash of an order.
     * @returns An order hash.
     */
    hash(): H256;
    /**
     * Return the consumed order
     * @param params.quantity the consumed quantity of the asset to give
     */
    consume(quantity: U64 | number | string): Order;
}
