import { H256, PlatformAddress, U256 } from "codechain-primitives";
import { SignedTransaction } from "./SignedTransaction";
import { TransactionJSON } from "./Transaction";
export interface BlockData {
    parentHash: H256;
    timestamp: number;
    number: number;
    author: PlatformAddress;
    extraData: number[];
    transactionsRoot: H256;
    stateRoot: H256;
    resultsRoot: H256;
    score: U256;
    seal: number[][];
    hash: H256;
    transactions: SignedTransaction[];
}
export interface BlockJSON {
    parentHash: string;
    timestamp: number;
    number: number;
    author: string;
    extraData: number[];
    transactionsRoot: string;
    stateRoot: string;
    resultsRoot: string;
    score: string;
    seal: number[][];
    hash: string;
    transactions: TransactionJSON[];
}
/**
 * Block is the unit of processes being handled by CodeChain. Contains information related to SignedTransaction's list and block creation.
 */
export declare class Block {
    static fromJSON(data: any): Block;
    parentHash: H256;
    timestamp: number;
    number: number;
    author: PlatformAddress;
    extraData: number[];
    transactionsRoot: H256;
    stateRoot: H256;
    resultsRoot: H256;
    score: U256;
    seal: number[][];
    hash: H256;
    transactions: SignedTransaction[];
    constructor(data: BlockData);
    toJSON(): BlockJSON;
}
