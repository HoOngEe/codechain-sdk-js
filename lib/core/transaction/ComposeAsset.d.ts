import { SignatureTag } from "../../utils";
import { Asset } from "../Asset";
import { AssetScheme } from "../AssetScheme";
import { AssetTransferInput, H160, H256, PlatformAddress } from "../classes";
import { AssetTransaction, Transaction } from "../Transaction";
import { NetworkId } from "../types";
import { AssetMintOutput, AssetMintOutputJSON } from "./AssetMintOutput";
import { AssetTransferInputJSON } from "./AssetTransferInput";
export interface AssetComposeTransactionJSON {
    networkId: string;
    shardId: number;
    metadata: string;
    approver: string | null;
    registrar: string | null;
    allowedScriptHashes: string[];
    output: AssetMintOutputJSON;
    inputs: AssetTransferInputJSON[];
}
export interface ComposeAssetActionJSON extends AssetComposeTransactionJSON {
    approvals: string[];
}
export declare class ComposeAsset extends Transaction implements AssetTransaction {
    private readonly _transaction;
    private readonly approvals;
    constructor(input: {
        networkId: NetworkId;
        shardId: number;
        metadata: string;
        approver: PlatformAddress | null;
        registrar: PlatformAddress | null;
        allowedScriptHashes: H160[];
        inputs: AssetTransferInput[];
        output: AssetMintOutput;
        approvals: string[];
    });
    /**
     * Get the tracker of an AssetComposeTransaction.
     * @returns A transaction hash.
     */
    tracker(): H256;
    /**
     * Get a hash of the transaction that doesn't contain the scripts. The hash
     * is used as a message to create a signature for a transaction.
     * @returns A hash.
     */
    hashWithoutScript(params?: {
        tag: SignatureTag;
        index: number;
    }): H256;
    /**
     * Add an AssetTransferInput to spend.
     * @param inputs An array of either an AssetTransferInput or an Asset.
     * @returns The modified ComposeAsset.
     */
    addInputs(inputs: AssetTransferInput | Asset | Array<AssetTransferInput | Asset>, ...rest: Array<AssetTransferInput | Asset>): ComposeAsset;
    input(index: number): AssetTransferInput | null;
    /**
     * Get the output of this transaction.
     * @returns An Asset.
     */
    getComposedAsset(): Asset;
    /**
     * Get the asset scheme of this transaction.
     * @return An AssetScheme.
     */
    getAssetScheme(): AssetScheme;
    /**
     * Get the asset type of the output.
     * @returns An asset type which is H160.
     */
    getAssetType(): H160;
    /**
     * Get the asset address of the output.
     * @returns An asset address which is H256.
     */
    getAssetAddress(): H256;
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): ComposeAssetActionJSON;
}
