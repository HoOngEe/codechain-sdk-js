import { AssetTransferAddress, H256 } from "codechain-primitives/lib";
import { AssetTransferOutput } from "./transaction/AssetTransferOutput";
import { U64 } from "./U64";
export declare type NetworkId = string;
export declare type AssetTransferOutputValue = AssetTransferOutput | {
    quantity: U64 | number | string;
    assetType: H256 | string;
    recipient: AssetTransferAddress | string;
};
