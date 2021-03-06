import { H256, PlatformAddress } from "codechain-primitives";

import { Transaction } from "../core/Transaction";

import { Rpc } from ".";

export class AccountRpc {
    private rpc: Rpc;
    private readonly transactionFee?: number;

    /**
     * @hidden
     */
    constructor(rpc: Rpc, options: { transactionFee?: number }) {
        const { transactionFee } = options;
        this.rpc = rpc;
        this.transactionFee = transactionFee;
    }

    /**
     * Gets a list of accounts.
     * @returns A list of accounts
     */
    public getList(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("account_getList", [])
                .then((accounts: string[]) => {
                    try {
                        if (Array.isArray(accounts)) {
                            resolve(
                                accounts.map(account =>
                                    PlatformAddress.ensure(account).toString()
                                )
                            );
                        } else {
                            reject(
                                Error(
                                    `Expected account_getList to return an array but it returned ${accounts}`
                                )
                            );
                        }
                    } catch (e) {
                        reject(
                            Error(
                                `Expected account_getList to return an array of PlatformAddress string, but an error occurred: ${e.toString()}`
                            )
                        );
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Creates a new account.
     * @param passphrase A passphrase to be used by the account owner
     * @returns An account
     */
    public create(passphrase?: string): Promise<string> {
        if (passphrase && typeof passphrase !== "string") {
            throw Error(
                `Expected the first argument to be a string but given ${passphrase}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("account_create", [passphrase])
                .then(account => {
                    try {
                        resolve(PlatformAddress.ensure(account).toString());
                    } catch (e) {
                        reject(
                            Error(
                                `Expected account_create to return PlatformAddress string but an error occurred: ${e.toString()}`
                            )
                        );
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Imports a secret key and add the corresponding account.
     * @param secret H256 or hexstring for 256-bit private key
     * @param passphrase A passphrase to be used by the account owner
     * @returns The account
     */
    public importRaw(
        secret: H256 | string,
        passphrase?: string
    ): Promise<string> {
        if (!H256.check(secret)) {
            throw Error(
                `Expected the first argument to be an H256 value but found ${secret}`
            );
        }
        if (passphrase && typeof passphrase !== "string") {
            throw Error(
                `Expected the second argument to be a string but found ${passphrase}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("account_importRaw", [
                    `0x${H256.ensure(secret).value}`,
                    passphrase
                ])
                .then(account => {
                    try {
                        resolve(PlatformAddress.ensure(account).toString());
                    } catch (e) {
                        reject(
                            Error(
                                `Expected account_importRaw to return PlatformAddress string but an error occurred: ${e.toString()}`
                            )
                        );
                    }
                })
                .catch(reject);
        });
    }

    /**
     * Calculates the account's signature for a given message.
     * @param messageDigest A message to sign
     * @param address A platform address
     * @param passphrase The account's passphrase
     */
    public sign(
        messageDigest: H256 | string,
        address: PlatformAddress | string,
        passphrase?: string
    ): Promise<string> {
        if (!H256.check(messageDigest)) {
            throw Error(
                `Expected the first argument to be an H256 value but found ${messageDigest}`
            );
        }
        if (!PlatformAddress.check(address)) {
            throw Error(
                `Expected the second argument to be a PlatformAddress value but found ${address}`
            );
        }
        if (passphrase && typeof passphrase !== "string") {
            throw Error(
                `Expected the third argument to be a string but found ${passphrase}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("account_sign", [
                    `0x${H256.ensure(messageDigest).value}`,
                    PlatformAddress.ensure(address).toString(),
                    passphrase
                ])
                .then(result => {
                    if (
                        typeof result === "string" &&
                        result.match(/0x[0-9a-f]{130}/)
                    ) {
                        return resolve(result);
                    }
                    reject(
                        Error(
                            `Expected account_sign to return a 65 byte hexstring but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Sends a transaction with the account's signature.
     * @param params.tx A tx to send
     * @param params.account The platform account to sign the tx
     * @param params.passphrase The account's passphrase
     */
    public sendTransaction(params: {
        tx: Transaction;
        account: PlatformAddress | string;
        passphrase?: string;
    }): Promise<{ hash: H256; seq: number }> {
        const { tx, account, passphrase } = params;
        if (!PlatformAddress.check(account)) {
            throw Error(
                `Expected account is a PlatformAddress value but found ${account}`
            );
        }
        if (passphrase && typeof passphrase !== "string") {
            throw Error(
                `Expected the third argument to be a string but found ${passphrase}`
            );
        }
        if (tx.fee() == null && this.transactionFee != null) {
            tx.setFee(this.transactionFee);
        }

        return this.rpc
            .sendRpcRequest("account_sendTransaction", [
                tx.toJSON(),
                PlatformAddress.ensure(account).toString(),
                passphrase
            ])
            .then(result => {
                return {
                    hash: H256.ensure(result.hash),
                    seq: result.seq
                };
            });
    }
    /**
     * Unlocks the account.
     * @param address A platform address
     * @param passphrase The account's passphrase
     * @param duration Time to keep the account unlocked. The default value is 300(seconds). Passing 0 unlocks the account indefinitely.
     */
    public unlock(
        address: PlatformAddress | string,
        passphrase?: string,
        duration?: number
    ): Promise<null> {
        if (!PlatformAddress.check(address)) {
            throw Error(
                `Expected the first argument to be a PlatformAddress value but found ${address}`
            );
        }
        if (passphrase && typeof passphrase !== "string") {
            throw Error(
                `Expected the second argument to be a string but found ${passphrase}`
            );
        }
        if (
            duration !== undefined &&
            (typeof duration !== "number" ||
                !Number.isInteger(duration) ||
                duration < 0)
        ) {
            throw Error(
                `Expected the third argument to be non-negative integer but found ${duration}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("account_unlock", [
                    PlatformAddress.ensure(address).toString(),
                    passphrase || "",
                    duration
                ])
                .then(result => {
                    if (result === null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected account_unlock to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }

    /**
     * Changes the passpharse of the account
     * @param address A platform address
     * @param oldPassphrase The account's current passphrase
     * @param newPassphrase The new passphrase for the account
     */
    public changePassword(
        address: PlatformAddress | string,
        oldPassphrase: string,
        newPassphrase: string
    ): Promise<null> {
        if (oldPassphrase && typeof oldPassphrase !== "string") {
            throw Error(
                `Expected the second argument to be a string but given ${oldPassphrase}`
            );
        }
        if (newPassphrase && typeof newPassphrase !== "string") {
            throw Error(
                `Expected the second argument to be a string but given ${newPassphrase}`
            );
        }
        return new Promise((resolve, reject) => {
            this.rpc
                .sendRpcRequest("account_changePassword", [
                    address,
                    oldPassphrase,
                    newPassphrase
                ])
                .then(result => {
                    if (result == null) {
                        return resolve(null);
                    }
                    reject(
                        Error(
                            `Expected account_changePassword to return null but it returned ${result}`
                        )
                    );
                })
                .catch(reject);
        });
    }
}
