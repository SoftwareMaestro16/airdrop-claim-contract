import { toNano, Address, Cell, Sender } from '@ton/core';
import { Main } from '../wrappers/Main';
import { compile, NetworkProvider } from '@ton/blueprint';

const MAIN_ADDRESS: string = "EQDgxTyWqjqfn-_wEvdCgQZgO24034xVTY3H5MRwPA0r8VPL";

export async function run(provider: NetworkProvider) {
    const main = provider.open(Main.createFromAddress(Address.parse(MAIN_ADDRESS)));
    await main.sendGetTon(provider.sender(), toNano('0.05'));
}
