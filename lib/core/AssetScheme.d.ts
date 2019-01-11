import { AssetTransferAddress, H160, H256, PlatformAddress } from "codechain-primitives";
import { MintAsset } from "./transaction/MintAsset";
import { NetworkId } from "./types";
import { U64 } from "./U64";
export interface AssetSchemeJSON {
    metadata: string;
    amount: string;
    approver: string | null;
    administrator: string | null;
    allowedScriptHashes: string[] | null;
    pool: {
        assetType: string;
        amount: string;
    }[];
}
/**
 * Object that contains information about the Asset when performing AssetMintTransaction.
 */
export declare class AssetScheme {
    static fromJSON(data: AssetSchemeJSON): AssetScheme;
    readonly networkId?: NetworkId;
    readonly shardId?: number;
    readonly metadata: string;
    readonly amount: U64;
    readonly approver: PlatformAddress | null;
    readonly administrator: PlatformAddress | null;
    readonly allowedScriptHashes: H160[];
    readonly pool: {
        assetType: H256;
        amount: U64;
    }[];
    constructor(data: {
        networkId?: NetworkId;
        shardId?: number;
        metadata: string;
        amount: U64;
        approver: PlatformAddress | null;
        administrator: PlatformAddress | null;
        allowedScriptHashes: H160[];
        pool: {
            assetType: H256;
            amount: U64;
        }[];
    });
    toJSON(): AssetSchemeJSON;
    createMintTransaction(params: {
        recipient: AssetTransferAddress | string;
    }): MintAsset;
}
