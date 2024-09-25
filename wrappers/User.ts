import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type UserConfig = {
    lastTimeDrop: bigint;
    mainDropAddress: Address;
    owner: Address; 
};

export function userConfigToCell(config: UserConfig): Cell {
    return beginCell()
        .storeUint(config.lastTimeDrop, 32)
        .storeAddress(config.mainDropAddress)
        .storeAddress(config.owner)
    .endCell();
}

export class User implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new User(address);
    }

    static createFromConfig(config: UserConfig, code: Cell, workchain = 0) {
        const data = userConfigToCell(config);
        const init = { code, data };
        return new User(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
